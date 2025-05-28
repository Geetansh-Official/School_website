import { MailIcon, MapPinIcon } from "lucide-react";
import Logo from "@/components/atoms/Logo";
import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card pt-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Govt. Higher Secondary School, Portha is dedicated to providing excellence in education, 
              fostering a nurturing environment where students can thrive academically 
              and personally.
            </p>
            
          </div>

          

          <div>
            <h3 className="mb-4 font-poppins text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Govt. Higher Secondary School, Portha. Pin-Code: 495689
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  portha2012@rediffmail.com
                </span>
              </li>
            </ul>
          </div>

          
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 pb-8 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Govt. Higher Secondary School, Portha. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;