import { Bell, Menu, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Props {
  isOnline: boolean;
  onToggleOnline: () => void;
  onMenuClick: () => void;
}

const VendorTopNavbar = ({ isOnline, onToggleOnline, onMenuClick }: Props) => (
  <header className="flex h-16 items-center justify-between border-b border-[hsl(220,13%,91%)] bg-white px-4 md:px-6">
    <div className="flex items-center gap-3">
      <button onClick={onMenuClick} className="lg:hidden text-[hsl(220,10%,46%)]">
        <Menu className="h-5 w-5" />
      </button>
      <h2 className="text-base font-semibold text-[hsl(220,25%,10%)]">Sharma Kitchen</h2>
    </div>

    <div className="flex items-center gap-4">
      {/* Online toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[hsl(220,10%,46%)]">
          {isOnline ? "Online" : "Offline"}
        </span>
        <Switch checked={isOnline} onCheckedChange={onToggleOnline} />
      </div>

      {/* Notification */}
      <button className="relative rounded-lg p-2 text-[hsl(220,10%,46%)] hover:bg-[hsl(220,14%,96%)]">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[hsl(0,72%,51%)]" />
      </button>

      {/* Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(24,100%,50%)] text-white">
        <User className="h-4 w-4" />
      </div>
    </div>
  </header>
);

export default VendorTopNavbar;
