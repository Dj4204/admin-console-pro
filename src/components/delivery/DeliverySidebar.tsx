import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Truck,
  IndianRupee,
  History,
  User,
  X,
  Bike,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/delivery/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/delivery/available", label: "Available Orders", icon: Package },
  { to: "/delivery/active", label: "My Delivery", icon: Truck },
  { to: "/delivery/earnings", label: "Earnings", icon: IndianRupee },
  { to: "/delivery/history", label: "History", icon: History },
  { to: "/delivery/profile", label: "Profile", icon: User },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const DeliverySidebar = ({ open, onClose }: Props) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(142,71%,45%)]">
            <Bike className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Shivam Rider
          </span>
        </div>
        <button onClick={onClose} className="lg:hidden text-muted-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const active = location.pathname.startsWith(link.to);
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="h-[18px] w-[18px]" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">Delivery Partner v1.0</p>
      </div>
    </aside>
  );
};

export default DeliverySidebar;
