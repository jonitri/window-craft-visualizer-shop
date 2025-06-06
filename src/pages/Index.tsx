
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import Layout from '@/components/layout/Layout';
import { ArrowRight, Shield, Zap, Settings, Award, Users, Clock } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop" 
            alt="Modern Home Interior" 
            className="w-full h-full"
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

      {/* Why Choose Salamander - Redesigned Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="heading-2 mb-6 text-salamander-darkgray">Why Choose Salamander Windows?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of German engineering excellence and modern design. 
              Our premium PVC window systems deliver unmatched performance, durability, and energy efficiency.
            </p>
          </div>

          {/* Main Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            {/* Left Column - Large Feature */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1560448204-444dcb0fa3ec?w=1200&h=800&fit=crop"
                  alt="Modern Contemporary Building with Premium Windows"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Architectural Excellence</h3>
                  <p className="text-white/90 leading-relaxed">
                    Our windows seamlessly integrate with modern architectural designs, 
                    providing clean lines and maximum natural light while maintaining superior performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Benefits List */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-salamander-green/10 p-3 rounded-lg flex-shrink-0">
                  <Zap className="h-6 w-6 text-salamander-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-salamander-darkgray mb-2">Energy Efficiency</h4>
                  <p className="text-muted-foreground">
                    Advanced thermal insulation technology reduces energy costs by up to 40%, 
                    keeping your home comfortable year-round.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-salamander-green/10 p-3 rounded-lg flex-shrink-0">
                  <Shield className="h-6 w-6 text-salamander-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-salamander-darkgray mb-2">Ultimate Security</h4>
                  <p className="text-muted-foreground">
                    Multi-point locking systems and reinforced frames provide maximum security 
                    without compromising on style or functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-salamander-green/10 p-3 rounded-lg flex-shrink-0">
                  <Settings className="h-6 w-6 text-salamander-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-salamander-darkgray mb-2">Custom Solutions</h4>
                  <p className="text-muted-foreground">
                    Tailored to your exact specifications with our advanced configurator, 
                    ensuring perfect fit and personalized design.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-salamander-green/10 p-3 rounded-lg flex-shrink-0">
                  <Award className="h-6 w-6 text-salamander-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-salamander-darkgray mb-2">Premium Quality</h4>
                  <p className="text-muted-foreground">
                    German-engineered PVC profiles designed to last decades with minimal maintenance 
                    and exceptional weather resistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Professional Installation */}
            <div className="relative group overflow-hidden rounded-xl">
              <Image 
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop"
                alt="Professional Window Installation Team"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 text-salamander-green mr-2" />
                  <h4 className="text-lg font-semibold text-white">Expert Installation</h4>
                </div>
                <p className="text-white/90 text-sm">
                  Our certified professionals ensure perfect installation with precision and care.
                </p>
              </div>
            </div>

            {/* Long-term Warranty */}
            <div className="relative group overflow-hidden rounded-xl">
              <Image 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop"
                alt="Modern Home with Large Premium Windows"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-salamander-green mr-2" />
                  <h4 className="text-lg font-semibold text-white">25-Year Warranty</h4>
                </div>
                <p className="text-white/90 text-sm">
                  Industry-leading warranty coverage for complete peace of mind and protection.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button className="bg-salamander-green hover:bg-salamander-green/90 text-white" asChild size="lg">
              <Link to="/configurator" className="inline-flex items-center">
                Discover Your Perfect Window <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
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
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" 
                  alt="Premium Windows" 
                  className="h-full w-full"
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
                <Image 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop" 
                  alt="Elegant Doors" 
                  className="h-full w-full"
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
        <div className="bg-gradient-to-r from-salamander-green to-salamander-lightgreen rounded-xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="https://images.unsplash.com/photo-1560448204-444dcb0fa3ec?w=1200&h=800&fit=crop" 
              alt="Modern Home with Large Windows" 
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10">
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
        </div>
      </section>
    </Layout>
  );
};

export default Index;
