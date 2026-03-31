import { IndianRupee } from "lucide-react";
import StatsCard from "@/components/vendor/StatsCard";
import { useDelivery } from "@/contexts/DeliveryContext";
import { Badge } from "@/components/ui/badge";

const DeliveryEarningsPage = () => {
  const { earnings } = useDelivery();

  const today = earnings.filter((e) => e.date === "2026-03-31").reduce((s, e) => s + e.amount, 0);
  const weekly = earnings.filter((e) => e.date >= "2026-03-25").reduce((s, e) => s + e.amount, 0);
  const monthly = earnings.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Earnings</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Today" value={`₹${today || 60}`} icon={IndianRupee} trend="+8%" trendUp />
        <StatsCard title="This Week" value={`₹${weekly || 220}`} icon={IndianRupee} trend="+15%" trendUp />
        <StatsCard title="This Month" value={`₹${monthly || 220}`} icon={IndianRupee} />
        <StatsCard title="Lifetime" value="₹12,450" icon={IndianRupee} trend="Since Jan 2026" trendUp />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Earnings History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Distance</th>
                <th className="p-4 font-medium">Earnings</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((e, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-4 text-muted-foreground">{e.date}</td>
                  <td className="p-4 font-medium text-foreground">{e.orderId}</td>
                  <td className="p-4 text-muted-foreground">{e.distance} km</td>
                  <td className="p-4 font-semibold text-[hsl(142,71%,45%)]">₹{e.amount}</td>
                  <td className="p-4">
                    <Badge className={e.status === "paid" ? "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)] border-0" : "bg-[hsl(43,96%,56%)]/10 text-[hsl(43,96%,40%)] border-0"}>
                      {e.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarningsPage;
