import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const allPermissions = [
  "Manage Users", "Manage Vendors", "Manage Orders", "Manage Banners",
  "Manage Categories", "Manage Spin", "Manage Coupons", "Manage Reports", "Manage Settings",
];

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

const mockAdmins: Admin[] = [
  { id: "1", name: "Super Admin", email: "admin@bhojwala.com", role: "Super Admin", permissions: [...allPermissions] },
  { id: "2", name: "Rahul Sharma", email: "rahul@bhojwala.com", role: "Moderator", permissions: ["Manage Users", "Manage Vendors", "Manage Orders"] },
  { id: "3", name: "Priya Patel", email: "priya@bhojwala.com", role: "Content Manager", permissions: ["Manage Banners", "Manage Categories"] },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", permissions: [] as string[] });

  const togglePerm = (p: string) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(p) ? f.permissions.filter((x) => x !== p) : [...f.permissions, p],
    }));
  };

  const save = () => {
    if (!form.name || !form.email) { toast.error("Fill all fields"); return; }
    setAdmins((p) => [...p, { id: Date.now().toString(), ...form }]);
    setOpen(false);
    toast.success("Admin added");
  };

  const remove = (id: string) => { setAdmins((p) => p.filter((a) => a.id !== id)); toast.success("Admin removed"); };

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Management" description="Manage admin roles and permissions" actions={<Button onClick={() => { setForm({ name: "", email: "", role: "", permissions: [] }); setOpen(true); }}><Plus className="h-4 w-4 mr-1" />Add Admin</Button>} />

      <DataTableShell title="All Admins">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Email", "Role", "Permissions", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{a.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.email}</td>
                <td className="px-5 py-3"><StatusBadge status={a.role} variant={a.role === "Super Admin" ? "info" : "muted"} /></td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {a.permissions.slice(0, 3).map((p) => (
                      <span key={p} className="inline-flex px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">{p}</span>
                    ))}
                    {a.permissions.length > 3 && <span className="text-[10px] text-muted-foreground">+{a.permissions.length - 3}</span>}
                  </div>
                </td>
                <td className="px-5 py-3">
                  {a.role !== "Super Admin" && (
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(a.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Admin</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Role (e.g. Moderator)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <div>
              <p className="text-sm font-medium mb-2">Permissions</p>
              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={form.permissions.includes(p)} onCheckedChange={() => togglePerm(p)} />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter><Button onClick={save}>Add Admin</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
