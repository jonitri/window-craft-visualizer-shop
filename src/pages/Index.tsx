
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-secondary">
        <div className="container-custom section-padding flex flex-col items-center text-center">
          <h1 className="heading-1 max-w-4xl mb-6">
            Premium PVC Windows & Doors for Modern Living
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Enhance your home with our premium, energy-efficient PVC solutions, designed for style and exceptional performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary" asChild>
              <Link to="/configurator">Configure Your Product</Link>
            </Button>
            <Button className="btn-secondary" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Why Choose WindowCraft Pro?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We deliver superior quality PVC products that stand the test of time, while providing outstanding value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Energy Efficient',
              description:
                'Our windows and doors exceed industry standards for thermal insulation, helping reduce energy costs.',
              icon: '🌱',
            },
            {
              title: 'Durable & Long-lasting',
              description:
                'Made with premium-grade PVC materials designed to withstand harsh weather conditions for decades.',
              icon: '🔒',
            },
            {
              title: 'Custom Solutions',
              description:
                'Create unique designs tailored to your specific requirements using our interactive configurator.',
              icon: '✨',
            },
            {
              title: 'Advanced Security',
              description:
                'Multi-point locking systems and reinforced frames provide peace of mind for your home.',
              icon: '🛡️',
            },
            {
              title: 'Professional Installation',
              description:
                'Our expert team ensures perfect fit and optimal performance through professional installation.',
              icon: '🔧',
            },
            {
              title: 'Comprehensive Warranty',
              description:
                'Enjoy the confidence of our industry-leading warranty on all products and installations.',
              icon: '📝',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg p-6 flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-4">{feature.icon}</span>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-secondary section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of premium PVC windows and doors, designed to enhance your home's comfort, security, and energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg overflow-hidden shadow-sm">
              <div className="h-64 bg-muted flex items-center justify-center">
                <span className="text-6xl">🪟</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium Windows</h3>
                <p className="text-muted-foreground mb-4">
                  From classic casement windows to tilt-and-turn designs, our window range offers superior insulation and security.
                </p>
                <Button asChild>
                  <Link to="/products" className="inline-flex items-center">
                    View Windows <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-lg overflow-hidden shadow-sm">
              <div className="h-64 bg-muted flex items-center justify-center">
                <span className="text-6xl">🚪</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Elegant Doors</h3>
                <p className="text-muted-foreground mb-4">
                  Front doors, patio doors, and sliding systems that combine beauty with advanced performance features.
                </p>
                <Button asChild>
                  <Link to="/products" className="inline-flex items-center">
                    View Doors <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="btn-primary" asChild>
              <Link to="/configurator" className="inline-flex items-center">
                Design Your Custom Solution <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-padding">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="heading-2 mb-4">Ready to Transform Your Home?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Start designing your perfect windows and doors today with our easy-to-use online configurator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90" asChild size="lg">
              <Link to="/configurator">Start Configuring</Link>
            </Button>
            <Button className="bg-primary-foreground/10 backdrop-blur hover:bg-primary-foreground/20 border border-primary-foreground/20" asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
