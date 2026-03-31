import { IndianRupee, Package, Clock, Zap } from "lucide-react";
import { useDelivery } from "@/contexts/DeliveryContext";
import { Switch } from "@/components/ui/switch";
import StatsCard from "@/components/vendor/StatsCard";

const DeliveryDashboardPage = () => {
  const { isOnline, toggleOnline, activeOrder, earnings, deliveryHistory } = useDelivery();

  const todayEarnings = earnings
    .filter((e) => e.date === "2026-03-31")
    .reduce((s, e) => s + e.amount, 0);

  const todayDeliveries = deliveryHistory.filter((o) => o.deliveredAt === "2026-03-31").length + (activeOrder ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Raju! 👋</h1>
          <p className="text-sm text-muted-foreground">Here's your delivery summary for today.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-[hsl(142,71%,45%)] animate-pulse" : "bg-destructive"}`} />
          <span className="text-sm font-semibold text-foreground">{isOnline ? "You're Online" : "You're Offline"}</span>
          <Switch checked={isOnline} onCheckedChange={toggleOnline} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Today's Earnings" value={`₹${todayEarnings || 450}`} icon={IndianRupee} trend="+12% vs yesterday" trendUp />
        <StatsCard title="Total Deliveries Today" value={String(todayDeliveries || 6)} icon={Package} trend="2 more than avg" trendUp />
        <StatsCard title="Pending Deliveries" value={activeOrder ? "1" : "0"} icon={Clock} />
        <StatsCard title="Rating" value="4.8 ⭐" icon={Zap} trend="Top 10% rider" trendUp />
      </div>

      {/* Recent deliveries */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Deliveries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Restaurant</th>
                <th className="p-4 font-medium">Distance</th>
                <th className="p-4 font-medium">Earnings</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {deliveryHistory.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-foreground">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{order.restaurant}</td>
                  <td className="p-4 text-muted-foreground">{order.distance} km</td>
                  <td className="p-4 font-semibold text-[hsl(142,71%,45%)]">₹{order.deliveryFee}</td>
                  <td className="p-4 text-muted-foreground">{order.deliveredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardPage;
