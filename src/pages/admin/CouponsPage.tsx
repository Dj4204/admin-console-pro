import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: "Percentage" | "Flat";
  discountAmount: number;
  minOrder: number;
  expiryDate: string;
  active: boolean;
}

const mockCoupons: Coupon[] = [
  { id: "1", code: "FIRST50", discountType: "Percentage", discountAmount: 50, minOrder: 199, expiryDate: "2026-04-30", active: true },
  { id: "2", code: "SAVE20", discountType: "Flat", discountAmount: 20, minOrder: 299, expiryDate: "2026-03-31", active: true },
  { id: "3", code: "WEEKEND10", discountType: "Percentage", discountAmount: 10, minOrder: 149, expiryDate: "2026-05-15", active: false },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState({ code: "", discountType: "Percentage" as "Percentage" | "Flat", discountAmount: 0, minOrder: 0, expiryDate: "", active: true });

  const openAdd = () => { setEditing(null); setForm({ code: "", discountType: "Percentage", discountAmount: 0, minOrder: 0, expiryDate: "", active: true }); setOpen(true); };
  const openEdit = (c: Coupon) => { setEditing(c); setForm({ code: c.code, discountType: c.discountType, discountAmount: c.discountAmount, minOrder: c.minOrder, expiryDate: c.expiryDate, active: c.active }); setOpen(true); };

  const save = () => {
    if (!form.code) { toast.error("Coupon code required"); return; }
    if (editing) {
      setCoupons((p) => p.map((c) => c.id === editing.id ? { ...c, ...form } : c));
      toast.success("Coupon updated");
    } else {
      setCoupons((p) => [...p, { id: Date.now().toString(), ...form }]);
      toast.success("Coupon created");
    }
    setOpen(false);
  };

  const remove = (id: string) => { setCoupons((p) => p.filter((c) => c.id !== id)); toast.success("Coupon deleted"); };

  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description="Manage discount coupons" actions={<Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add Coupon</Button>} />

      <DataTableShell title="All Coupons">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Code", "Type", "Discount", "Min Order", "Expiry", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-mono font-bold text-foreground">{c.code}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.discountType}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.discountType === "Percentage" ? `${c.discountAmount}%` : `₹${c.discountAmount}`}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{c.minOrder}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.expiryDate}</td>
                <td className="px-5 py-3"><StatusBadge status={c.active ? "Active" : "Inactive"} variant={c.active ? "success" : "muted"} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Coupon</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Coupon Code (e.g. SAVE20)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
            <div className="flex gap-2">
              <Button size="sm" variant={form.discountType === "Percentage" ? "default" : "outline"} onClick={() => setForm({ ...form, discountType: "Percentage" })}>Percentage</Button>
              <Button size="sm" variant={form.discountType === "Flat" ? "default" : "outline"} onClick={() => setForm({ ...form, discountType: "Flat" })}>Flat</Button>
            </div>
            <Input type="number" placeholder="Discount Amount" value={form.discountAmount || ""} onChange={(e) => setForm({ ...form, discountAmount: Number(e.target.value) })} />
            <Input type="number" placeholder="Minimum Order ₹" value={form.minOrder || ""} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} />
            <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
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
