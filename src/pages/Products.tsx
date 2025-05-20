
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { windowProfiles, doorProfiles } from '@/data/products';

const Products = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-evolutionDrive-MD-terrace-door.jpg" 
            alt="Salamander Products" 
            className="w-full h-full object-cover"
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
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
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
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
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
      
      {/* CTA Section */}
      <section className="container-custom section-padding">
        <div className="bg-gradient-to-r from-salamander-green to-salamander-lightgreen rounded-xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-evolutionDrive-HST-Villa-M.jpg" 
              alt="Salamander Windows" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="heading-2 mb-4">Want a Customized Solution?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-white/90">
              Use our online configurator to design Salamander windows and doors perfectly suited to your needs.
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
