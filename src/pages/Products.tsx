
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { windowProfiles, doorProfiles } from '@/data/products';

const Products = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lovable-uploads/e08f9e3f-5137-4a16-ab92-62db6eb47709.png" 
            alt="Modern Home with Premium Salamander Windows" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-salamander-darkgray/60"></div>
        </div>
        <div className="container-custom section-padding relative z-10">
          <h1 className="heading-1 text-center mb-6 text-white">Our Salamander Product Range</h1>
          <p className="text-xl text-white/90 text-center max-w-3xl mx-auto">
            Discover our comprehensive range of premium Salamander PVC windows and doors, designed to enhance your home's comfort and appearance.
          </p>
        </div>
      </section>

      {/* Products Tabs Section */}
      <section className="container-custom section-padding">
        <Tabs defaultValue="windows" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="windows" className="text-lg">Salamander Windows</TabsTrigger>
            <TabsTrigger value="doors" className="text-lg">Salamander Doors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="windows">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {windowProfiles.map((profile) => (
                <div key={profile.id} className="salamander-card">
                  <div className="h-60 overflow-hidden">
                    <Image 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-salamander-darkgray">{profile.name}</h3>
                    <p className="text-muted-foreground mb-4">{profile.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {profile.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-salamander-green mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full bg-salamander-green hover:bg-salamander-green/90 text-white" asChild>
                      <Link to={`/configurator?type=window&profile=${profile.id}`}>
                        Configure This Window
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="doors">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {doorProfiles.map((profile) => (
                <div key={profile.id} className="salamander-card">
                  <div className="h-60 overflow-hidden">
                    <Image 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-salamander-darkgray">{profile.name}</h3>
                    <p className="text-muted-foreground mb-4">{profile.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {profile.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-salamander-green mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full bg-salamander-green hover:bg-salamander-green/90 text-white" asChild>
                      <Link to={`/configurator?type=door&profile=${profile.id}`}>
                        Configure This Door
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Products Showcase Section */}
      <section className="bg-salamander-lightgray section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-salamander-darkgray">Premium Window Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of elegance and functionality with our architectural window designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Interior Design Excellence */}
            <div className="salamander-card">
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src="/lovable-uploads/da45c646-4b9b-4b64-aa02-860cddb53a5f.png" 
                  alt="Elegant Interior with Salamander Windows" 
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Interior Excellence</h3>
                    <p className="text-white/90 mb-4">
                      Our windows perfectly complement sophisticated interior designs while providing exceptional natural light.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Architecture */}
            <div className="salamander-card">
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src="/lovable-uploads/0d0a9079-bcb9-40dc-ae53-88bb8f8f6aa1.png" 
                  alt="Contemporary Architecture with Salamander Solutions" 
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salamander-darkgray/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Modern Architecture</h3>
                    <p className="text-white/90 mb-4">
                      Seamlessly integrate with contemporary architectural designs featuring clean lines and expansive glass surfaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Window Detail Showcase */}
          <div className="salamander-card">
            <div className="relative h-96 overflow-hidden">
              <Image 
                src="/lovable-uploads/b00500f1-23ab-437c-af29-786d4d6b95d6.png" 
                alt="Detailed View of Salamander Window Design" 
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-salamander-darkgray/80 to-transparent flex items-center">
                <div className="p-8 w-full max-w-2xl">
                  <h3 className="text-3xl font-bold text-white mb-4">Precision Engineering</h3>
                  <p className="text-white/90 text-lg mb-6">
                    Every detail matters. From the precision of our frames to the clarity of our glazing, 
                    Salamander windows represent the pinnacle of German engineering excellence.
                  </p>
                  <Button className="bg-salamander-green hover:bg-salamander-green/90 text-white" asChild size="lg">
                    <Link to="/configurator">
                      Design Your Perfect Window
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container-custom section-padding">
        <div className="bg-gradient-to-r from-salamander-green to-salamander-lightgreen rounded-xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/lovable-uploads/0fc00546-386e-4b4c-b21e-503ae7967257.png" 
              alt="Salamander Mobile Configurator" 
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10">
            <h2 className="heading-2 mb-4">Want a Customized Solution?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-white/90">
              Use our online configurator to design Salamander windows and doors perfectly suited to your needs. 
              Available on desktop and mobile for your convenience.
            </p>
            <Button className="bg-white text-salamander-green hover:bg-white/90" asChild size="lg">
              <Link to="/configurator">Start Configuring</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
