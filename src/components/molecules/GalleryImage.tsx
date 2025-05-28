import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle 
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GalleryImageProps {
  src: string;
  alt: string;
  title?: string;
  category: string;
  className?: string;
}

const GalleryImage = ({
  src,
  alt,
  title,
  category,
  className,
}: GalleryImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={cn(
          "group cursor-pointer overflow-hidden rounded-lg transition-all duration-300",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <img 
            src={src} 
            alt={alt}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />
          {title && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <span className="text-sm text-white/80">{category}</span>
            </div>
          )}
        </AspectRatio>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-0 sm:p-6">
          {title && (
            <DialogTitle className="p-4 pb-0 sm:p-0">
              {title}
            </DialogTitle>
          )}
          <div className="mt-2 overflow-hidden rounded-lg">
            <img 
              src={src} 
              alt={alt} 
              className="h-auto w-full" 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryImage;