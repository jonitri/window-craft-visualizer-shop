
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">WindowCraft Pro</h3>
            <p className="text-muted-foreground mb-4">
              Premium PVC windows and doors for modern homes. Quality, efficiency, and style.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Windows</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Doors</Link></li>
              <li><Link to="/configurator" className="text-muted-foreground hover:text-primary transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Process</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="not-italic text-muted-foreground">
              <p>123 Window Street</p>
              <p>Doorville, WD 12345</p>
              <p className="mt-2">Email: info@windowcraftpro.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {currentYear} WindowCraft Pro. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <nav className="flex space-x-4">
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
