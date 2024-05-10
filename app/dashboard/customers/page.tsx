import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense, memo } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchCustomersPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { CustomersPageProps } from '@/app/types/customers';

export const metadata: Metadata = {
  title: 'Customers',
};

const CustomersPage = async ({ searchParams }: CustomersPageProps) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default memo(CustomersPage);
