import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { LayoutProps } from './types/common';

export const metadata: Metadata = {
  title: {
    template: '%s | Finance Dashboard',
    default: 'Finance Dashboard',
  },
  description: 'Nextjs Finance Dashboard built by pmillerdev.',
  metadataBase: new URL('https://finance-dashboard-delta.vercel.app/'),
};

const RootLayout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
