import { cn } from "@/lib/utils";
// import { DivideIcon as LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FeaturedCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  link?: {
    text: string;
    url: string;
  };
  className?: string;
  children?: ReactNode;
}

const FeaturedCard = ({
  title,
  description,
  icon: Icon,
  link,
  className,
  children,
}: FeaturedCardProps) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-all duration-500 group-hover:bg-primary/20" />
      
      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        
        <h3 className="mb-2 font-poppins text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        {children}
        
        {link && (
          <Link
            to={link.url}
            className="inline-block text-sm font-medium text-primary transition-all duration-300 hover:underline"
          >
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;