
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-elegante-D.jpg" 
            alt="Salamander Windows Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-salamander-darkgray/60"></div>
        </div>
        <div className="container-custom section-padding flex flex-col items-center text-center relative z-10 text-white">
          <h1 className="heading-1 max-w-4xl mb-6">
            Premium Salamander PVC Windows & Doors for Modern Living
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Enhance your home with our premium, energy-efficient Salamander PVC solutions, designed for style and exceptional performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-salamander-green hover:bg-salamander-green/90 text-white" asChild size="lg">
              <Link to="/configurator">Configure Your Product</Link>
            </Button>
            <Button className="bg-white text-salamander-darkgray hover:bg-white/90" asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4 text-salamander-darkgray">Why Choose Salamander Windows?</h2>
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
              image: 'https://salamander-windows.com/wp-content/uploads/2022/06/greenline-SL76-Front-United-Windows.jpg'
            },
            {
              title: 'Durable & Long-lasting',
              description:
                'Made with premium-grade PVC materials designed to withstand harsh weather conditions for decades.',
              icon: '🔒',
              image: 'https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-bluEvolution-82-D-InnenRGB.jpg'
            },
            {
              title: 'Custom Solutions',
              description:
                'Create unique designs tailored to your specific requirements using our interactive configurator.',
              icon: '✨',
              image: 'https://salamander-windows.com/wp-content/uploads/2022/12/Salamander-Windows-Design.jpg'
            },
            {
              title: 'Advanced Security',
              description:
                'Multi-point locking systems and reinforced frames provide peace of mind for your home.',
              icon: '🛡️',
              image: 'https://salamander-windows.com/wp-content/uploads/2022/06/3D-Detail-bluEvolution-82-MD-United-Windows.jpg'
            },
            {
              title: 'Professional Installation',
              description:
                'Our expert team ensures perfect fit and optimal performance through professional installation.',
              icon: '🔧',
              image: 'https://salamander-windows.com/wp-content/uploads/2022/06/bluEvolution-82-United-Windows.jpg'
            },
            {
              title: 'Comprehensive Warranty',
              description:
                'Enjoy the confidence of our industry-leading warranty on all products and installations.',
              icon: '📝',
              image: 'https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-greenline-exterior-view-Detail.jpg'
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="salamander-card relative group"
            >
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="salamander-image"
              />
              <div className="salamander-overlay">
                <div className="p-6 w-full bg-salamander-darkgray/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-2 text-white flex items-center">
                    <span className="mr-2">{feature.icon}</span>
                    {feature.title}
                  </h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2 text-salamander-darkgray">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-salamander-lightgray section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-salamander-darkgray">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of premium Salamander PVC windows and doors, designed to enhance your home's comfort, security, and energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="salamander-card">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-greenline-Facade.jpg" 
                  alt="Salamander Windows" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Premium Windows</h3>
                    <p className="text-white/90 mb-4">
                      From classic casement windows to tilt-and-turn designs, our Salamander window range offers superior insulation and security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button className="w-full bg-salamander-green hover:bg-salamander-green/90 text-white" asChild>
                  <Link to="/products" className="inline-flex items-center">
                    View Windows <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="salamander-card">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-evolutionDrive-HST.jpg" 
                  alt="Salamander Doors" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Elegant Doors</h3>
                    <p className="text-white/90 mb-4">
                      Front doors, patio doors, and sliding systems that combine beauty with advanced performance features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button className="w-full bg-salamander-green hover:bg-salamander-green/90 text-white" asChild>
                  <Link to="/products" className="inline-flex items-center">
                    View Doors <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-salamander-green hover:bg-salamander-green/90 text-white" asChild size="lg">
              <Link to="/configurator" className="inline-flex items-center">
                Design Your Custom Solution <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-padding">
        <div className="bg-gradient-to-r from-salamander-green to-salamander-lightgreen rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="heading-2 mb-4">Ready to Transform Your Home?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-white/90">
            Start designing your perfect Salamander windows and doors today with our easy-to-use online configurator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-salamander-green hover:bg-white/90" asChild size="lg">
              <Link to="/configurator">Start Configuring</Link>
            </Button>
            <Button className="bg-white/10 backdrop-blur hover:bg-white/20 border border-white/20" asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
