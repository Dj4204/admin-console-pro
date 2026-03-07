import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

interface Banner {
  id: string;
  image: string;
  title: string;
  redirectUrl: string;
  active: boolean;
}

const mockBanners: Banner[] = [
  { id: "1", image: "/placeholder.svg", title: "Summer Sale - 50% Off", redirectUrl: "/offers/summer", active: true },
  { id: "2", image: "/placeholder.svg", title: "New Vendor Launch", redirectUrl: "/vendors/new", active: true },
  { id: "3", image: "/placeholder.svg", title: "Free Delivery Weekend", redirectUrl: "/offers/delivery", active: false },
];

export default function BannersPage() {
  const [banners, setBanners] = useState(mockBanners);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState({ title: "", redirectUrl: "", active: true });

  const openAdd = () => { setEditing(null); setForm({ title: "", redirectUrl: "", active: true }); setOpen(true); };
  const openEdit = (b: Banner) => { setEditing(b); setForm({ title: b.title, redirectUrl: b.redirectUrl, active: b.active }); setOpen(true); };

  const save = () => {
    if (!form.title) { toast.error("Title is required"); return; }
    if (editing) {
      setBanners((prev) => prev.map((b) => b.id === editing.id ? { ...b, ...form, image: b.image } : b));
      toast.success("Banner updated");
    } else {
      setBanners((prev) => [...prev, { id: Date.now().toString(), image: "/placeholder.svg", ...form }]);
      toast.success("Banner added");
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Banners" description="Manage promotional banners" actions={<Button onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add Banner</Button>} />

      <DataTableShell title="All Banners">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Image", "Title", "Redirect URL", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="h-12 w-24 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </div>
                </td>
                <td className="px-5 py-3 font-medium text-foreground">{b.title}</td>
                <td className="px-5 py-3 text-muted-foreground text-xs">{b.redirectUrl}</td>
                <td className="px-5 py-3"><StatusBadge status={b.active ? "Active" : "Inactive"} variant={b.active ? "success" : "muted"} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(b)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(b.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Banner" : "Add Banner"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <Image className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Upload Banner Image</p>
              </div>
            </div>
            <Input placeholder="Banner Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Redirect URL" value={form.redirectUrl} onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Active</span>
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
            </div>
          </div>
          <DialogFooter><Button onClick={save}>{editing ? "Update" : "Add"} Banner</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
