import { Suspense } from 'react';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { 
  fetchRevenue, 
  fetchLatestInvoices, 
  fetchCardData 
} from '@/app/lib/data';

// Optional: Loading skeletons
function CardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-28 rounded-xl bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}

function RevenueChartSkeleton() {
  return <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />;
}

function LatestInvoicesSkeleton() {
  return <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />;
}

export default async function Dashboard() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Cards - render immediately */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Revenue Chart with its own Suspense boundary */}
        <div className="md:col-span-4 lg:col-span-5">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChartWrapper />
          </Suspense>
        </div>

        {/* Latest Invoices with its own Suspense boundary */}
        <div className="md:col-span-4 lg:col-span-3">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoicesWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

// Wrapper components to allow async data fetching inside Suspense
async function RevenueChartWrapper() {
  const revenue = await fetchRevenue();
  return <RevenueChart revenue={revenue} />;
}

async function LatestInvoicesWrapper() {
  const latestInvoices = await fetchLatestInvoices();
  return <LatestInvoices latestInvoices={latestInvoices} />;
}