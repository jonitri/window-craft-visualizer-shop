
import { ReactNode } from 'react';
import Layout from '@/components/layout/Layout';

interface ConfiguratorLayoutProps {
  children: ReactNode;
}

export const ConfiguratorLayout = ({ children }: ConfiguratorLayoutProps) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom py-6">
          <h1 className="heading-1 text-center mb-4">Product Configurator</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Design your perfect window or door. Customize every detail to match your home and preferences.
          </p>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="container-custom py-8">
        <div className="grid lg:grid-cols-10 gap-6">
          {children}
        </div>
      </section>
    </Layout>
  );
};
