import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Blocked";
}

const mockUsers: User[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 00001", totalOrders: 45, totalSpent: 12500, status: "Active" },
  { id: "2", name: "Anita Verma", email: "anita@example.com", phone: "+91 98765 00002", totalOrders: 32, totalSpent: 8700, status: "Active" },
  { id: "3", name: "Suresh Gupta", email: "suresh@example.com", phone: "+91 98765 00003", totalOrders: 12, totalSpent: 3400, status: "Blocked" },
  { id: "4", name: "Meera Joshi", email: "meera@example.com", phone: "+91 98765 00004", totalOrders: 67, totalSpent: 18900, status: "Active" },
  { id: "5", name: "Karan Singh", email: "karan@example.com", phone: "+91 98765 00005", totalOrders: 8, totalSpent: 2100, status: "Active" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u))
    );
    toast.success("User status updated");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage platform users" />

      <DataTableShell
        title="All Users"
        actions={
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-56 rounded-md border border-input bg-secondary pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        }
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Email", "Phone", "Orders", "Spent", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{u.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.phone}</td>
                <td className="px-5 py-3 text-muted-foreground">{u.totalOrders}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{u.totalSpent.toLocaleString()}</td>
                <td className="px-5 py-3"><StatusBadge status={u.status} variant={u.status === "Active" ? "success" : "destructive"} /></td>
                <td className="px-5 py-3">
                  <Button variant="outline" size="sm" onClick={() => toggleBlock(u.id)}>
                    {u.status === "Active" ? "Block" : "Unblock"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
