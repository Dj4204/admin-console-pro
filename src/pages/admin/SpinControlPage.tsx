import { useState } from "react";
import { PageHeader, DataTableShell, KpiCard } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Gift, Users, TrendingUp, BarChart3 } from "lucide-react";

interface SpinReward {
  id: string;
  label: string;
  probability: number;
  active: boolean;
}

const mockRewards: SpinReward[] = [
  { id: "1", label: "₹50 Off", probability: 30, active: true },
  { id: "2", label: "₹100 Off", probability: 15, active: true },
  { id: "3", label: "Free Delivery", probability: 25, active: true },
  { id: "4", label: "₹200 Off", probability: 5, active: true },
  { id: "5", label: "Better Luck Next Time", probability: 25, active: true },
];

const spinHistory = [
  { user: "Rahul S.", reward: "₹50 Off", date: "2024-01-15" },
  { user: "Anita V.", reward: "Free Delivery", date: "2024-01-15" },
  { user: "Meera J.", reward: "Better Luck Next Time", date: "2024-01-14" },
  { user: "Karan S.", reward: "₹100 Off", date: "2024-01-14" },
];

export default function SpinControlPage() {
  const [rewards, setRewards] = useState(mockRewards);
  const [spinEnabled, setSpinEnabled] = useState(true);

  const updateProbability = (id: string, value: number) => {
    setRewards((prev) => prev.map((r) => (r.id === id ? { ...r, probability: value } : r)));
  };

  const toggleReward = (id: string) => {
    setRewards((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const saveRewards = () => toast.success("Spin rewards updated");

  return (
    <div className="space-y-6">
      <PageHeader title="Spin & Win Control" description="Manage spin rewards and probabilities" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Spins" value="3,847" icon={BarChart3} change="+22% this week" changeType="positive" />
        <KpiCard title="Rewards Given" value="2,891" icon={Gift} />
        <KpiCard title="Unique Users" value="1,245" icon={Users} />
        <KpiCard title="Conversion Rate" value="68%" icon={TrendingUp} change="+5% this month" changeType="positive" />
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-card-foreground">Spin Configuration</h3>
          <div className="flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">Spin Feature</Label>
            <Switch checked={spinEnabled} onCheckedChange={setSpinEnabled} />
          </div>
        </div>

        <div className="space-y-3">
          {rewards.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-md bg-secondary">
              <Switch checked={r.active} onCheckedChange={() => toggleReward(r.id)} />
              <span className="font-medium text-sm w-40">{r.label}</span>
              <Label className="text-xs text-muted-foreground">Probability %</Label>
              <Input
                type="number"
                value={r.probability}
                onChange={(e) => updateProbability(r.id, Number(e.target.value))}
                className="w-20 h-8"
              />
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={saveRewards}>Save Changes</Button>
      </div>

      <DataTableShell title="Recent Spins">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["User", "Reward", "Date"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spinHistory.map((s, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{s.user}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.reward}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
