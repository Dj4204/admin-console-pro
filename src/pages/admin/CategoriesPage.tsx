import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

interface Category {
  id: string;
  name: string;
  totalItems: number;
  active: boolean;
}

const mockCategories: Category[] = [
  { id: "1", name: "Momos", totalItems: 45, active: true },
  { id: "2", name: "Biryani", totalItems: 32, active: true },
  { id: "3", name: "South Indian", totalItems: 28, active: true },
  { id: "4", name: "Chinese", totalItems: 38, active: true },
  { id: "5", name: "Desserts", totalItems: 22, active: false },
  { id: "6", name: "Beverages", totalItems: 18, active: true },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", active: true });

  const openAdd = () => { setEditing(null); setForm({ name: "", active: true }); setOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, active: c.active }); setOpen(true); };

  const save = () => {
    if (!form.name) { toast.error("Name required"); return; }
    if (editing) {
      setCategories((p) => p.map((c) => c.id === editing.id ? { ...c, ...form } : c));
      toast.success("Category updated");
    } else {
      setCategories((p) => [...p, { id: Date.now().toString(), ...form, totalItems: 0 }]);
      toast.success("Category added");
    }
    setOpen(false);
  };

  const remove = (id: string) => { setCategories((p) => p.filter((c) => c.id !== id)); toast.success("Deleted"); };

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description="Manage food categories" actions={<Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add Category</Button>} />

      <DataTableShell title="All Categories">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Image", "Name", "Total Items", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3"><div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center"><Image className="h-4 w-4 text-muted-foreground" /></div></td>
                <td className="px-5 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.totalItems}</td>
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
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
              <p className="text-xs text-muted-foreground">Upload Category Image</p>
            </div>
            <Input placeholder="Category Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
