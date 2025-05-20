
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="heading-1 mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! The page you are looking for doesn't exist.</p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
