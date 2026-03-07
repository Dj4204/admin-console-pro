import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
  active: boolean;
}

const mockData: Subcategory[] = [
  { id: "1", name: "Veg Momos", parentCategory: "Momos", active: true },
  { id: "2", name: "Paneer Momos", parentCategory: "Momos", active: true },
  { id: "3", name: "Chicken Momos", parentCategory: "Momos", active: true },
  { id: "4", name: "Masala Dosa", parentCategory: "South Indian", active: true },
  { id: "5", name: "Plain Dosa", parentCategory: "South Indian", active: false },
  { id: "6", name: "Veg Biryani", parentCategory: "Biryani", active: true },
];

export default function SubcategoriesPage() {
  const [items, setItems] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subcategory | null>(null);
  const [form, setForm] = useState({ name: "", parentCategory: "", active: true });
  const [search, setSearch] = useState("");

  const openAdd = () => { setEditing(null); setForm({ name: "", parentCategory: "", active: true }); setOpen(true); };
  const openEdit = (s: Subcategory) => { setEditing(s); setForm({ name: s.name, parentCategory: s.parentCategory, active: s.active }); setOpen(true); };

  const save = () => {
    if (!form.name || !form.parentCategory) { toast.error("Fill all fields"); return; }
    if (editing) {
      setItems((p) => p.map((s) => s.id === editing.id ? { ...s, ...form } : s));
      toast.success("Subcategory updated");
    } else {
      setItems((p) => [...p, { id: Date.now().toString(), ...form }]);
      toast.success("Subcategory added");
    }
    setOpen(false);
  };

  const remove = (id: string) => { setItems((p) => p.filter((s) => s.id !== id)); toast.success("Deleted"); };

  const filtered = items.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.parentCategory.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Subcategories" description="Manage nested food categories" actions={<Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add Subcategory</Button>} />

      <div className="flex gap-2">
        <Input placeholder="Search subcategories..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <DataTableShell title="All Subcategories">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Image", "Name", "Parent Category", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3"><div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center"><Image className="h-4 w-4 text-muted-foreground" /></div></td>
                <td className="px-5 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.parentCategory}</td>
                <td className="px-5 py-3"><StatusBadge status={s.active ? "Active" : "Inactive"} variant={s.active ? "success" : "muted"} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(s.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Subcategory</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
              <p className="text-xs text-muted-foreground">Upload Image</p>
            </div>
            <Input placeholder="Subcategory Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Parent Category" value={form.parentCategory} onChange={(e) => setForm({ ...form, parentCategory: e.target.value })} />
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
