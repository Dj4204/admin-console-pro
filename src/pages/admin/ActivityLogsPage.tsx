import { useState } from "react";
import { PageHeader, DataTableShell } from "@/components/AdminComponents";
import { Input } from "@/components/ui/input";

interface LogEntry {
  id: string;
  admin: string;
  action: string;
  module: string;
  date: string;
}

const mockLogs: LogEntry[] = [
  { id: "1", admin: "Super Admin", action: "Approved vendor", module: "Vendors", date: "2026-03-07 14:30" },
  { id: "2", admin: "Rahul Sharma", action: "Updated banner", module: "Banners", date: "2026-03-07 13:15" },
  { id: "3", admin: "Super Admin", action: "Blocked user", module: "Users", date: "2026-03-07 12:45" },
  { id: "4", admin: "Priya Patel", action: "Added category", module: "Categories", date: "2026-03-07 11:20" },
  { id: "5", admin: "Rahul Sharma", action: "Updated order status", module: "Orders", date: "2026-03-07 10:00" },
  { id: "6", admin: "Super Admin", action: "Changed commission rate", module: "Settings", date: "2026-03-06 16:30" },
  { id: "7", admin: "Super Admin", action: "Added coupon SAVE20", module: "Coupons", date: "2026-03-06 15:00" },
  { id: "8", admin: "Priya Patel", action: "Deleted announcement", module: "Announcements", date: "2026-03-06 14:00" },
];

export default function ActivityLogsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockLogs.filter((l) =>
    l.admin.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Activity Logs" description="Track all admin actions" />
      <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />

      <DataTableShell title={`Logs (${filtered.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Admin", "Action", "Module", "Date"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{l.admin}</td>
                <td className="px-5 py-3 text-muted-foreground">{l.action}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">{l.module}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground text-xs">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
