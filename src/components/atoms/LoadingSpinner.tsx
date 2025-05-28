import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex h-[50vh] w-full items-center justify-center", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" size={size} />
    </div>
  );
};

export default LoadingSpinner;