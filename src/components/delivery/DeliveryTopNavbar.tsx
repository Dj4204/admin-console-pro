import { Bell, Menu, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDelivery } from "@/contexts/DeliveryContext";

interface Props {
  onMenuClick: () => void;
}

const DeliveryTopNavbar = ({ onMenuClick }: Props) => {
  const { isOnline, toggleOnline } = useDelivery();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-muted-foreground">
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-base font-semibold text-foreground">Delivery Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold ${
              isOnline ? "text-[hsl(142,71%,45%)]" : "text-destructive"
            }`}
          >
            {isOnline ? "🟢 Online" : "🔴 Offline"}
          </span>
          <Switch checked={isOnline} onCheckedChange={toggleOnline} />
        </div>

        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(142,71%,45%)] text-white">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default DeliveryTopNavbar;
