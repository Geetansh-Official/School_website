import { Calendar,  Image,  UserRound } from "lucide-react";
import FeaturedCard from "@/components/molecules/FeaturedCard";
import { cn } from "@/lib/utils";

interface FeaturedGridProps {
  className?: string;
}

const FeaturedGrid = ({ className }: FeaturedGridProps) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-poppins text-3xl font-bold md:text-4xl">
            Discover Govt. Higher Secondary School, Portha
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore everything our school has to offer through these featured sections,
            designed to give you a comprehensive view of academic excellence and campus life.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          
          <FeaturedCard
            title="Notice Board"
            description="Don't miss out on our exciting events, workshops, seminars, and extracurricular activities happening on campus."
            icon={Calendar}
            link={{ text: "Notice Board", url: "/notice-board" }}
            className="border-l-4 border-l-[#FCD34D]"
          />
          
         
          
          <FeaturedCard
            title="Campus Gallery"
            description="Take a visual tour of our modern facilities, vibrant campus life, and the inspiring learning environment."
            icon={Image}
            link={{ text: "View Gallery", url: "/gallery" }}
            className="border-l-4 border-l-[#60A5FA]"
          />
          
         
          <FeaturedCard
            title="Faculty & Staff"
            description="Meet our dedicated educators and administrative team committed to student success and excellence."
            icon={UserRound}
            link={{ text: "Meet Our Team", url: "/faculty" }}
            className="border-l-4 border-l-[#FCD34D]"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;