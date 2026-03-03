import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge, KpiCard } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface Payout {
  id: string;
  vendorName: string;
  totalEarnings: number;
  commissionPct: number;
  commissionAmount: number;
  netPayout: number;
  status: "Pending" | "Paid";
}

const mockPayouts: Payout[] = [
  { id: "1", vendorName: "Spice Kitchen", totalEarnings: 125000, commissionPct: 15, commissionAmount: 18750, netPayout: 106250, status: "Pending" },
  { id: "2", vendorName: "Delhi Delights", totalEarnings: 98000, commissionPct: 15, commissionAmount: 14700, netPayout: 83300, status: "Paid" },
  { id: "3", vendorName: "Home Kitchen", totalEarnings: 34000, commissionPct: 12, commissionAmount: 4080, netPayout: 29920, status: "Pending" },
  { id: "4", vendorName: "Gujarat Treats", totalEarnings: 67000, commissionPct: 15, commissionAmount: 10050, netPayout: 56950, status: "Paid" },
];

export default function PaymentsPage() {
  const [payouts, setPayouts] = useState(mockPayouts);

  const markPaid = (id: string) => {
    setPayouts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Paid" } : p)));
    toast.success("Payout marked as paid");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Revenue and payout management" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value="₹9,52,400" icon={DollarSign} change="+18% this month" changeType="positive" />
        <KpiCard title="Commission Earned" value="₹1,42,860" icon={TrendingUp} change="+15% this month" changeType="positive" />
        <KpiCard title="Payout Pending" value="₹1,36,170" icon={Clock} />
        <KpiCard title="Payout Completed" value="₹1,40,250" icon={CheckCircle} change="4 vendors" changeType="neutral" />
      </div>

      <DataTableShell title="Vendor Payouts">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Vendor", "Earnings", "Commission %", "Commission", "Net Payout", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{p.vendorName}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{p.totalEarnings.toLocaleString()}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.commissionPct}%</td>
                <td className="px-5 py-3 text-muted-foreground">₹{p.commissionAmount.toLocaleString()}</td>
                <td className="px-5 py-3 font-medium text-foreground">₹{p.netPayout.toLocaleString()}</td>
                <td className="px-5 py-3"><StatusBadge status={p.status} variant={p.status === "Paid" ? "success" : "warning"} /></td>
                <td className="px-5 py-3">
                  {p.status === "Pending" && (
                    <Button size="sm" onClick={() => markPaid(p.id)}>Mark as Paid</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
