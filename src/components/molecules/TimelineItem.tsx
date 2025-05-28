import { cn } from "@/lib/utils";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

const TimelineItem = ({
  date,
  title,
  description,
  isLast = false,
  className,
}: TimelineItemProps) => {
  return (
    <div className={cn("relative pl-10", className)}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-3 h-full w-0.5 bg-border" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-primary bg-background" />
      
      {/* Content */}
      <div className="pb-8">
        <span className="mb-1 block text-sm font-medium text-muted-foreground">
          {date}
        </span>
        <h3 className="mb-2 font-poppins text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;