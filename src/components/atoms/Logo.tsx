import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

const Logo = ({ className, isScrolled }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 transition-all duration-300", 
        className,
        isScrolled ? "scale-90" : "scale-100"
      )}
    >
      <GraduationCap className="h-8 w-8 text-primary" />
      <span className="font-poppins text-xl font-bold">
        <span className="text-[#FCD34D]">Govt. Higher Secondary SchoolPortha</span>
      </span>
    </Link>
  );
};

export default Logo;