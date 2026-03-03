import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  active: boolean;
  dishCount: number;
}

const mockCategories: Category[] = [
  { id: "1", name: "North Indian", active: true, dishCount: 45 },
  { id: "2", name: "South Indian", active: true, dishCount: 32 },
  { id: "3", name: "Chinese", active: true, dishCount: 28 },
  { id: "4", name: "Desserts", active: false, dishCount: 15 },
  { id: "5", name: "Beverages", active: true, dishCount: 20 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const openAdd = () => { setEditingCategory(null); setCategoryName(""); setDialogOpen(true); };
  const openEdit = (c: Category) => { setEditingCategory(c); setCategoryName(c.name); setDialogOpen(true); };

  const save = () => {
    if (!categoryName.trim()) return;
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => (c.id === editingCategory.id ? { ...c, name: categoryName } : c)));
      toast.success("Category updated");
    } else {
      setCategories((prev) => [...prev, { id: Date.now().toString(), name: categoryName, active: true, dishCount: 0 }]);
      toast.success("Category added");
    }
    setDialogOpen(false);
  };

  const toggleActive = (id: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
    toast.success("Category status updated");
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description="Manage food categories" actions={
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" /> Add Category</Button>
      } />

      <DataTableShell title="All Categories">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Dishes", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.dishCount}</td>
                <td className="px-5 py-3"><StatusBadge status={c.active ? "Active" : "Inactive"} variant={c.active ? "success" : "muted"} /></td>
                <td className="px-5 py-3 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleActive(c.id)}>
                    <StatusBadge status={c.active ? "Off" : "On"} variant={c.active ? "muted" : "success"} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteCategory(c.id)}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Category Name</Label>
              <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="e.g., Biryani" />
            </div>
            <Button onClick={save} className="w-full">{editingCategory ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
