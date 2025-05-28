import { BookOpen, School, Users } from "lucide-react";
import AnimatedCounter from "@/components/atoms/AnimatedCounter";
import { cn } from "@/lib/utils";

interface StatsProps {
  className?: string;
}

const Stats = ({ className }: StatsProps) => {
  return (
    <section 
      className={cn(
        "bg-primary py-16 text-primary-foreground",
        className
      )}
    >
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-poppins text-3xl font-bold">
            Our School in Numbers
          </h2>
          <p className="mx-auto max-w-2xl opacity-90">
            Govt. Higher Secondary School, Portha has a proven track record of excellence in education,
            with impressive achievements across various areas.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-white/10 p-3">
              <Users className="h-8 w-8" />
            </div>
            <AnimatedCounter 
              end={175} 
              suffix="+" 
              className="mb-2 text-4xl font-bold md:text-5xl" 
            />
            <p className="opacity-90">Students Enrolled</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-white/10 p-3">
              <BookOpen className="h-8 w-8" />
            </div>
            <AnimatedCounter 
              end={8} 
              suffix="+" 
              className="mb-2 text-4xl font-bold md:text-5xl" 
            />
            <p className="opacity-90">Expert Faculty</p>
          </div>
          
          
          
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full bg-white/10 p-3">
              <School className="h-8 w-8" />
            </div>
            <AnimatedCounter 
              end={63} 
              className="mb-2 text-4xl font-bold md:text-5xl" 
            />
            <p className="opacity-90">Years of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;