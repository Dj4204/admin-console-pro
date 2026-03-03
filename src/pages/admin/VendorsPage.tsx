import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Vendor {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  revenue: number;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  accountStatus: "Active" | "Suspended";
  shopName: string;
  address: string;
}

const mockVendors: Vendor[] = [
  { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", totalOrders: 234, revenue: 125000, approvalStatus: "Approved", accountStatus: "Active", shopName: "Spice Kitchen", address: "Mumbai, MH" },
  { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", totalOrders: 187, revenue: 98000, approvalStatus: "Approved", accountStatus: "Active", shopName: "Delhi Delights", address: "Delhi, DL" },
  { id: "3", name: "Amit Patel", phone: "+91 76543 21098", totalOrders: 0, revenue: 0, approvalStatus: "Pending", accountStatus: "Active", shopName: "Gujarat Treats", address: "Ahmedabad, GJ" },
  { id: "4", name: "Sunita Devi", phone: "+91 65432 10987", totalOrders: 56, revenue: 34000, approvalStatus: "Approved", accountStatus: "Suspended", shopName: "Home Kitchen", address: "Jaipur, RJ" },
  { id: "5", name: "Vikram Singh", phone: "+91 54321 09876", totalOrders: 0, revenue: 0, approvalStatus: "Rejected", accountStatus: "Active", shopName: "Royal Bites", address: "Lucknow, UP" },
];

export default function VendorsPage() {
  const [vendors, setVendors] = useState(mockVendors);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.shopName.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, field: "approvalStatus" | "accountStatus", value: string) => {
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
    toast.success(`Vendor ${field === "approvalStatus" ? "approval" : "account"} status updated`);
  };

  const deleteVendor = (id: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
    toast.success("Vendor deleted");
  };

  const statusVariant = (s: string) => {
    if (s === "Approved" || s === "Active") return "success" as const;
    if (s === "Pending") return "warning" as const;
    return "destructive" as const;
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Vendors" description="Manage all registered vendors" />

      <DataTableShell
        title="All Vendors"
        actions={
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vendors..."
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
              {["Vendor Name", "Phone", "Orders", "Revenue", "Approval", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{v.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.phone}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.totalOrders}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{v.revenue.toLocaleString()}</td>
                <td className="px-5 py-3"><StatusBadge status={v.approvalStatus} variant={statusVariant(v.approvalStatus)} /></td>
                <td className="px-5 py-3"><StatusBadge status={v.accountStatus} variant={statusVariant(v.accountStatus)} /></td>
                <td className="px-5 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedVendor(v)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(v.id, "approvalStatus", "Approved")}>Approve</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(v.id, "approvalStatus", "Rejected")}>Reject</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(v.id, "accountStatus", v.accountStatus === "Active" ? "Suspended" : "Active")}>
                        {v.accountStatus === "Active" ? "Suspend" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteVendor(v.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedVendor?.name}</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Shop:</span> <span className="font-medium">{selectedVendor.shopName}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedVendor.phone}</span></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="font-medium">{selectedVendor.address}</span></div>
                <div><span className="text-muted-foreground">Revenue:</span> <span className="font-medium">₹{selectedVendor.revenue.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Total Orders:</span> <span className="font-medium">{selectedVendor.totalOrders}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedVendor.approvalStatus} variant={statusVariant(selectedVendor.approvalStatus)} /></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
