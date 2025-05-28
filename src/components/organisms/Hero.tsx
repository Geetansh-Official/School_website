//import { ArrowRight } from "lucide-react";
//import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <div 
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-[url('/School_hero/school_hero.jpeg')] bg-cover bg-center bg-no-repeat pt-16",
        className
      )}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container relative z-10 py-20 text-center">
        <div 
          className="mx-auto max-w-3xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="mb-4 font-poppins text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Welcome to <span className="text-[#FCD34D]">Govt. Higher Secondary School, Portha</span>
          </h1>
          
          <p className="mb-8 text-white/90 md:text-lg lg:text-xl">
            Empowering minds, inspiring futures. Join our community where excellence in education 
            meets a nurturing environment for growth and discovery.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            
          </div>
        </div>
      </div>
      
      {/* Wave overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,277.3C96,267,192,245,288,224C384,203,480,181,576,186.7C672,192,768,224,864,224C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;