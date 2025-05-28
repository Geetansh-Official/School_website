import { CalendarIcon, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface NoticeCardProps {
  title: string;
  date: Date;
  category: string;
  content: string;
  isPinned?: boolean;
  className?: string;
}

const NoticeCard = ({
  title,
  date,
  category,
  content,
  isPinned = false,
  className,
}: NoticeCardProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md",
        isPinned && "border-primary/50 bg-primary/5",
        className
      )}
    >
      {isPinned && (
        <Pin className="absolute right-2 top-2 h-4 w-4 text-primary" />
      )}
      
      <h3 className="mb-2 font-poppins text-lg font-medium">{title}</h3>
      
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{format(date, "MMM dd, yyyy")}</span>
        </div>
        
        <Badge variant="outline" className="font-normal">
          {category}
        </Badge>
      </div>
      
      <p className="line-clamp-3 text-sm text-muted-foreground">
        {content}
      </p>
    </div>
  );
};

export default NoticeCard;