import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLink {
  title: string;
  path: string;
  children?: NavLink[];
}

interface NavLinksProps {
  className?: string;
  onClose?: () => void;
}

const links: NavLink[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Gallery", path: "/gallery" },
  { title: "Notice Board", path: "/notice-board" },
  { title: "School Family", path: "/faculty" },
  { title: "Achievements/Activity", path: "/achievements" },
  { title: "Files/Uploads", path: "/files" },
];

const NavLinks = ({ className, onClose }: NavLinksProps) => {
  const location = useLocation();

  return (
    <ul className={cn("flex flex-col gap-6 md:flex-row md:items-center", className)}>
      {links.map((link) => (
        <li key={link.path} className="relative">
          <Link
            to={link.path}
            onClick={onClose}
            className={cn(
              "text-base transition-all duration-300 hover:text-primary",
              location.pathname === link.path
                ? "font-semibold text-primary"
                : "text-foreground/80"
            )}
          >
            {link.title}
            {location.pathname === link.path && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;