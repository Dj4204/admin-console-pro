import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge, KpiCard } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Gift, Users, Trophy } from "lucide-react";

interface Reward {
  id: string;
  name: string;
  probability: number;
  active: boolean;
}

const mockRewards: Reward[] = [
  { id: "1", name: "Free Lassi", probability: 10, active: true },
  { id: "2", name: "10% Discount", probability: 25, active: true },
  { id: "3", name: "Free Delivery", probability: 20, active: true },
  { id: "4", name: "₹50 Cashback", probability: 5, active: true },
  { id: "5", name: "Try Tomorrow", probability: 40, active: true },
];

const spinHistory = [
  { id: "1", user: "Rahul S.", reward: "10% Discount", date: "2026-03-07 14:30" },
  { id: "2", user: "Priya M.", reward: "Free Lassi", date: "2026-03-07 13:20" },
  { id: "3", user: "Amit K.", reward: "Try Tomorrow", date: "2026-03-07 12:10" },
  { id: "4", user: "Sneha R.", reward: "Free Delivery", date: "2026-03-07 11:05" },
  { id: "5", user: "Vikram P.", reward: "₹50 Cashback", date: "2026-03-06 16:45" },
];

const colors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function SpinControlPage() {
  const [rewards, setRewards] = useState(mockRewards);
  const [spinEnabled, setSpinEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Reward | null>(null);
  const [form, setForm] = useState({ name: "", probability: 0, active: true });

  const openAdd = () => { setEditing(null); setForm({ name: "", probability: 0, active: true }); setOpen(true); };
  const openEdit = (r: Reward) => { setEditing(r); setForm({ name: r.name, probability: r.probability, active: r.active }); setOpen(true); };

  const save = () => {
    if (!form.name) { toast.error("Name required"); return; }
    if (editing) {
      setRewards((p) => p.map((r) => r.id === editing.id ? { ...r, ...form } : r));
      toast.success("Reward updated");
    } else {
      setRewards((p) => [...p, { id: Date.now().toString(), ...form }]);
      toast.success("Reward added");
    }
    setOpen(false);
  };

  const remove = (id: string) => { setRewards((p) => p.filter((r) => r.id !== id)); toast.success("Deleted"); };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spin & Win"
        description="Manage spin wheel rewards and probabilities"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Spin Feature</span>
              <Switch checked={spinEnabled} onCheckedChange={setSpinEnabled} />
            </div>
            <Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add Reward</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Total Spins" value="4,521" change="This month" changeType="neutral" icon={Gift} />
        <KpiCard title="Unique Users" value="2,134" change="+18% from last month" changeType="positive" icon={Users} />
        <KpiCard title="Rewards Won" value="3,245" change="72% win rate" changeType="positive" icon={Trophy} />
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-card-foreground mb-4">Wheel Preview</h3>
        <div className="flex items-center justify-center">
          <div className="relative h-48 w-48">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {rewards.filter(r => r.active).map((r, i, arr) => {
                const total = arr.reduce((s, x) => s + x.probability, 0);
                const startAngle = arr.slice(0, i).reduce((s, x) => s + (x.probability / total) * 360, 0);
                const angle = (r.probability / total) * 360;
                const startRad = (startAngle - 90) * Math.PI / 180;
                const endRad = (startAngle + angle - 90) * Math.PI / 180;
                const x1 = 100 + 80 * Math.cos(startRad);
                const y1 = 100 + 80 * Math.sin(startRad);
                const x2 = 100 + 80 * Math.cos(endRad);
                const y2 = 100 + 80 * Math.sin(endRad);
                const large = angle > 180 ? 1 : 0;
                return (
                  <path key={r.id} d={`M100,100 L${x1},${y1} A80,80 0 ${large},1 ${x2},${y2} Z`} fill={colors[i % colors.length]} opacity={0.8} stroke="hsl(var(--card))" strokeWidth={2} />
                );
              })}
              <circle cx="100" cy="100" r="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={2} />
              <text x="100" y="104" textAnchor="middle" className="text-[10px] font-bold fill-foreground">SPIN</text>
            </svg>
          </div>
        </div>
      </div>

      <DataTableShell title="Rewards Configuration">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Reward", "Probability %", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rewards.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{r.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.probability}%</td>
                <td className="px-5 py-3"><StatusBadge status={r.active ? "Active" : "Inactive"} variant={r.active ? "success" : "muted"} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(r)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <DataTableShell title="Spin History" description="Recent user spins">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["User", "Reward", "Date"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spinHistory.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{s.user}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.reward}</td>
                <td className="px-5 py-3 text-muted-foreground text-xs">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Reward</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Reward Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="number" placeholder="Probability %" value={form.probability || ""} onChange={(e) => setForm({ ...form, probability: Number(e.target.value) })} />
            <div className="flex items-center justify-between">
              <span className="text-sm">Active</span>
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
            </div>
          </div>
          <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
