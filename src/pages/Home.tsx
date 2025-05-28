//import { Button } from "@/components/ui/button";
//import { ChevronRight } from "lucide-react";
import Hero from "@/components/organisms/Hero";
import FeaturedGrid from "@/components/organisms/FeaturedGrid";
import Stats from "@/components/organisms/Stats";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Govt. Higher Secondary School, Portha - Empowering minds, inspiring futures";
  }, []);

  return (
    <div>
      <Hero />
      
      <FeaturedGrid />
      
      <Stats />
      
      {/* Testimonials Section */}
      
    </div>
  );
};

export default Home;