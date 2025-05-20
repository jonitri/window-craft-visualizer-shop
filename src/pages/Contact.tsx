
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Form data:', data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom section-padding">
          <h1 className="heading-1 text-center mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Have questions about our products or services? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📍</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Window Street</p>
              <p>Doorville, WD 12345</p>
            </address>
          </div>

          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📞</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-muted-foreground">Sales: (123) 456-7890</p>
            <p className="text-muted-foreground">Support: (123) 456-7891</p>
          </div>

          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">✉️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-muted-foreground">info@windowcraftpro.com</p>
            <p className="text-muted-foreground">support@windowcraftpro.com</p>
          </div>
        </div>
                
        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-3 mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide details about your inquiry..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h2 className="heading-3 mb-6">Visit Our Showroom</h2>
            <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
              <span className="text-4xl">🏢</span>
              {/* This would be a map in a real implementation */}
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Experience our products firsthand at our showroom. Our expert staff will guide you through our range of windows and doors.
              </p>
              
              <div className="border-t border-border pt-4">
                <h4 className="font-bold mb-2">Opening Hours:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
