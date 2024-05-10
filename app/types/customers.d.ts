export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: string;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type CustomersPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export type CustomerTableProps = {
  query: string;
  currentPage: number;
};
