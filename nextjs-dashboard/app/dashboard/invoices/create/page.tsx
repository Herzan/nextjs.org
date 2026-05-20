import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { createInvoice } from '@/app/lib/actions';
import { CustomerField } from '@/app/lib/definitions';

export default async function Page() {
  const customers: CustomerField[] =
    await fetchCustomers();

  async function createInvoiceAction(
    formData: FormData
  ) {
    'use server';

    await createInvoice(
      { message: null, errors: {} },
      formData
    );
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Invoices',
            href: '/dashboard/invoices',
          },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <form action={createInvoiceAction}>
        <div>
          <label htmlFor="customer">
            Customer
          </label>

          <select
            id="customer"
            name="customerId"
          >
            <option value="">
              Select a customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          Create Invoice
        </button>
      </form>
    </main>
  );
}