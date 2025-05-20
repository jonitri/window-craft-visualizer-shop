
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom section-padding">
          <h1 className="heading-1 text-center mb-6">About WindowCraft Pro</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Leading the industry with innovative PVC window and door solutions since 1995.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container-custom section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-3 mb-4">Our Story</h2>
            <p className="mb-4 text-muted-foreground">
              WindowCraft Pro began with a simple vision: to create superior PVC windows and doors that combine 
              cutting-edge technology with aesthetic appeal. Founded in 1995, we have grown from a small local 
              workshop to a nationally recognized brand.
            </p>
            <p className="mb-4 text-muted-foreground">
              Our journey has been defined by continuous innovation and an unwavering commitment to quality. 
              We've pioneered advanced manufacturing techniques and developed proprietary PVC formulations that 
              set new standards in the industry.
            </p>
            <p className="text-muted-foreground">
              Today, WindowCraft Pro products can be found in thousands of homes across the country, delivering 
              comfort, security, and energy efficiency to our valued customers.
            </p>
          </div>
          <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
            <span className="text-6xl">🏭</span>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-secondary section-padding">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for perfection in every product and service, never compromising on quality or performance.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Continuous research and development keeps us at the forefront of window and door technology.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">
                We listen to our customers and tailor our solutions to meet their unique needs and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="container-custom section-padding">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Manufacturing Process</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            From raw materials to finished products, we maintain strict quality control at every stage.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Materials Selection',
                description: 'We source only the highest grade PVC and components from trusted suppliers.'
              },
              {
                step: '02',
                title: 'Precision Engineering',
                description: 'Advanced CAD design and CNC manufacturing ensures perfect components every time.'
              },
              {
                step: '03',
                title: 'Assembly',
                description: 'Skilled technicians assemble each unit with meticulous attention to detail.'
              },
              {
                step: '04',
                title: 'Quality Testing',
                description: 'Every product undergoes rigorous testing for air and water tightness, strength, and durability.'
              }
            ].map((phase, index) => (
              <div key={index} className="relative text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
