import { ButtonHTMLAttributes, ReactNode } from 'react';

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

export type LayoutProps = {
  children: ReactNode;
};

export type CardProps = {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export type PaginationNumberProps = {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
};

export type PaginationArrowProps = {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
};

export type PaginationProps = {
  totalPages: number;
};

export type SearchProps = {
  placeholder: string;
};

export type ErrorState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type NavLink = {
  name: string;
  href: string;
  icon: any;
};
