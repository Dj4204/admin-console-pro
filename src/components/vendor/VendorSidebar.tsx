import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  IndianRupee,
  Wallet,
  Settings,
  X,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { to: "/vendor/products", label: "Products", icon: Package },
  { to: "/vendor/earnings", label: "Earnings", icon: IndianRupee },
  { to: "/vendor/payouts", label: "Payouts", icon: Wallet },
  { to: "/vendor/settings", label: "Settings", icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const VendorSidebar = ({ open, onClose }: Props) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[hsl(220,13%,91%)] bg-white transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between border-b border-[hsl(220,13%,91%)] px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(24,100%,50%)]">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[hsl(220,25%,10%)]">
            Bhojwala
          </span>
        </div>
        <button onClick={onClose} className="lg:hidden text-[hsl(220,10%,46%)]">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
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
                  ? "bg-[hsl(24,100%,50%)]/10 text-[hsl(24,100%,50%)]"
                  : "text-[hsl(220,10%,46%)] hover:bg-[hsl(220,14%,96%)] hover:text-[hsl(220,25%,10%)]"
              )}
            >
              <link.icon className="h-[18px] w-[18px]" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[hsl(220,13%,91%)] p-4">
        <p className="text-xs text-[hsl(220,10%,46%)]">Vendor Panel v1.0</p>
      </div>
    </aside>
  );
};

export default VendorSidebar;
