
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { windowProfiles, doorProfiles } from '@/data/products';

const Products = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom section-padding">
          <h1 className="heading-1 text-center mb-6">Our Product Range</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Discover our comprehensive range of premium PVC windows and doors, designed to enhance your home's comfort and appearance.
          </p>
        </div>
      </section>

      {/* Products Tabs Section */}
      <section className="container-custom section-padding">
        <Tabs defaultValue="windows" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="windows">Windows</TabsTrigger>
            <TabsTrigger value="doors">Doors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="windows">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {windowProfiles.map((profile) => (
                <div key={profile.id} className="bg-secondary rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                    <p className="text-muted-foreground mb-4">{profile.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {profile.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full" asChild>
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
                <div key={profile.id} className="bg-secondary rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                    <p className="text-muted-foreground mb-4">{profile.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {profile.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full" asChild>
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
        <div className="bg-primary rounded-xl p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="heading-2 mb-4">Want a Customized Solution?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Use our online configurator to design windows and doors perfectly suited to your needs.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90" asChild size="lg">
            <Link to="/configurator">Start Configuring</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
