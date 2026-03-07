import { Wallet, Clock } from "lucide-react";
import StatsCard from "@/components/vendor/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const payoutHistory = [
  { date: "2026-03-01", amount: 15000, status: "Completed" },
  { date: "2026-02-15", amount: 12500, status: "Completed" },
  { date: "2026-02-01", amount: 18000, status: "Completed" },
  { date: "2026-01-15", amount: 9800, status: "Completed" },
];

const VendorPayouts = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Payouts</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard title="Available Balance" value="₹24,500" icon={Wallet} />
        <StatsCard title="Pending Payout" value="₹8,200" icon={Clock} />
      </div>

      {/* Withdraw */}
      <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-[hsl(220,25%,10%)]">Withdraw Funds</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Bank Account</Label>
            <Input placeholder="Account number" />
          </div>
          <div className="space-y-2">
            <Label>UPI ID</Label>
            <Input placeholder="name@upi" />
          </div>
        </div>
        <Button className="mt-4 bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white" onClick={() => toast({ title: "Withdrawal request submitted!" })}>
          Request Withdrawal
        </Button>
      </div>

      {/* History */}
      <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white shadow-sm">
        <div className="border-b border-[hsl(220,13%,91%)] px-5 py-4">
          <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Payout History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payoutHistory.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.date}</TableCell>
                <TableCell className="font-medium">₹{p.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className="border-0 bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,35%)]">{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VendorPayouts;
