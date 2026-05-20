import { Metadata } from 'next';

import { auth } from '@/app/auth';

import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();

  // Redirect if user is not logged in
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome to your Dashboard!
      </h1>

      <p className="mt-2 text-gray-600">
        Hello,{' '}
        {session.user.name ||
          session.user.email}{' '}
        👋
      </p>
    </main>
  );
}