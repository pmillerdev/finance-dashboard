import { CustomersPageProps } from './customers';

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type EditInvoicePageProps = {
  params: {
    id: string;
  };
};

export type InvoicesPageProps = CustomersPageProps;

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CreateInvoiceFormProps = {
  customers: CustomerField[];
};

export type EditInvoiceFormProps = {
  invoice: InvoiceForm;
  customers: CustomerField[];
};

export type InvoiceButtonProps = {
  id: string;
};

export type InvoiceStatusProps = {
  status: string;
};

export type InvoicesTableProps = {
  query: string;
  currentPage: number;
};
