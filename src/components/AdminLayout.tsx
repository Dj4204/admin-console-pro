import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingCart,
  CreditCard,
  FolderTree,
  BarChart3,
  Disc3,
  Settings,
  ChevronLeft,
  Bell,
  Search,
  Menu,
  Image,
  Megaphone,
  Tag,
  ShieldCheck,
  Activity,
  ChevronDown,
  UtensilsCrossed,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSection {
  label: string;
  items: { label: string; icon: React.ElementType; path: string }[];
}

const navSections: NavSection[] = [
  {
    label: "",
    items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }],
  },
  {
    label: "User Management",
    items: [{ label: "Users", icon: Users, path: "/admin/users" }],
  },
  {
    label: "Vendor Management",
    items: [
      { label: "Vendors", icon: Store, path: "/admin/vendors" },
      { label: "Vendor Menu", icon: UtensilsCrossed, path: "/admin/vendor-menu" },
    ],
  },
  {
    label: "Order Management",
    items: [
      { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
      { label: "Payments", icon: CreditCard, path: "/admin/payments" },
    ],
  },
  {
    label: "Content Management",
    items: [
      { label: "Banners", icon: Image, path: "/admin/banners" },
      { label: "Announcements", icon: Megaphone, path: "/admin/announcements" },
    ],
  },
  {
    label: "Food Management",
    items: [
      { label: "Categories", icon: FolderTree, path: "/admin/categories" },
      { label: "Subcategories", icon: Layers, path: "/admin/subcategories" },
    ],
  },
  {
    label: "Platform Features",
    items: [
      { label: "Spin & Win", icon: Disc3, path: "/admin/spin" },
      { label: "Coupons", icon: Tag, path: "/admin/coupons" },
    ],
  },
  {
    label: "Analytics",
    items: [{ label: "Reports", icon: BarChart3, path: "/admin/reports" }],
  },
  {
    label: "Admin Control",
    items: [
      { label: "Admin Management", icon: ShieldCheck, path: "/admin/admins" },
      { label: "Activity Logs", icon: Activity, path: "/admin/activity" },
    ],
  },
  {
    label: "System",
    items: [{ label: "Platform Settings", icon: Settings, path: "/admin/settings" }],
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isSectionActive = (section: NavSection) =>
    section.items.some((item) => location.pathname === item.path);

  const isSectionOpen = (section: NavSection) => {
    if (!section.label) return true;
    if (openSections[section.label] !== undefined) return openSections[section.label];
    return isSectionActive(section);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-14 flex items-center px-4 border-b border-sidebar-border shrink-0">
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-primary-foreground tracking-tight truncate">
              Bhojwala
            </span>
          )}
          {collapsed && (
            <span className="text-lg font-bold text-sidebar-primary mx-auto">B</span>
          )}
        </div>

        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-thin">
          {navSections.map((section) => {
            const open = isSectionOpen(section);
            return (
              <div key={section.label || "top"}>
                {section.label && !collapsed && (
                  <button
                    onClick={() => toggleSection(section.label)}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors"
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        !open && "-rotate-90"
                      )}
                    />
                  </button>
                )}
                {(open || collapsed) &&
                  section.items.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
              </div>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors shrink-0"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </aside>

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          collapsed ? "lg:ml-16" : "lg:ml-60"
        )}
      >
        <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 sticky top-0 z-30">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <div className="relative max-w-sm hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-64 rounded-md border border-input bg-secondary pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <button className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
              3
            </span>
          </button>

          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            SA
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
