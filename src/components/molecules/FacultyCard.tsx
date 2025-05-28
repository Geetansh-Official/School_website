import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

interface FacultyCardProps {
  name: string;
  position: string;
  department: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  className?: string;
}

const FacultyCard = ({
  name,
  position,
  department,
  image,
  email,
  phone,
  bio,
  className,
}: FacultyCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className={cn(
            "group cursor-pointer overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md",
            className
          )}
        >
          <div className="mb-4 flex justify-center">
            <Avatar className="h-24 w-24 transition-all duration-300 group-hover:scale-105">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="text-center">
            <h3 className="mb-1 font-poppins text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{position}</p>
            <p className="mb-3 text-xs text-muted-foreground">{department}</p>
            
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate max-w-36">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="mb-1">{name}</DialogTitle>
              <DialogDescription>
                {position} · {department}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">{bio}</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{phone}</span>
            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyCard;