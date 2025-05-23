
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-salamander-lightgray/20">
      <Header />
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
