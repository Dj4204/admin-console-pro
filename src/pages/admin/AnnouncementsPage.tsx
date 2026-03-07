import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Announcement {
  id: string;
  text: string;
  active: boolean;
}

const mockAnnouncements: Announcement[] = [
  { id: "1", text: "🔥 Free Delivery Above ₹199! Order Now!", active: true },
  { id: "2", text: "🎉 New Vendors Added - Explore Fresh Menus", active: true },
  { id: "3", text: "⚡ Flash Sale: 30% off on first order", active: false },
];

export default function AnnouncementsPage() {
  const [items, setItems] = useState(mockAnnouncements);
  const [newText, setNewText] = useState("");

  const add = () => {
    if (!newText.trim()) { toast.error("Enter announcement text"); return; }
    setItems((p) => [...p, { id: Date.now().toString(), text: newText, active: true }]);
    setNewText("");
    toast.success("Announcement added");
  };

  const toggle = (id: string) => {
    setItems((p) => p.map((a) => a.id === id ? { ...a, active: !a.active } : a));
    toast.success("Status updated");
  };

  const remove = (id: string) => {
    setItems((p) => p.filter((a) => a.id !== id));
    toast.success("Announcement deleted");
  };

  const activeText = items.filter((a) => a.active).map((a) => a.text).join("   •   ");

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Manage scrolling announcements on the user app" />

      {activeText && (
        <div className="bg-card rounded-lg border border-border p-4 overflow-hidden">
          <p className="text-xs font-medium text-muted-foreground mb-2">Preview</p>
          <div className="bg-primary/10 rounded-md py-2 px-4 overflow-hidden">
            <p className="text-sm font-medium text-primary whitespace-nowrap animate-[marquee_15s_linear_infinite]">
              {activeText}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Input placeholder="New announcement text..." value={newText} onChange={(e) => setNewText(e.target.value)} className="max-w-lg" />
        <Button onClick={add}><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>

      <DataTableShell title="All Announcements">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Announcement", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground max-w-md truncate">{a.text}</td>
                <td className="px-5 py-3">
                  <Switch checked={a.active} onCheckedChange={() => toggle(a.id)} />
                </td>
                <td className="px-5 py-3">
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(a.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
