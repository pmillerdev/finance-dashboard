import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Finance Dashboard',
    default: 'Finance Dashboard',
  },
  description: 'Nextjs Finance Dashboard built by pmillerdev.',
  metadataBase: new URL('https://finance-dashboard-delta.vercel.app/'),
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
