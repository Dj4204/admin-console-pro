import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  customer: string;
  vendor: string;
  amount: number;
  paymentMethod: string;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  date: string;
}

const mockOrders: Order[] = [
  { id: "ORD-1284", customer: "Rahul S.", vendor: "Spice Kitchen", amount: 450, paymentMethod: "UPI", status: "Delivered", date: "2024-01-15" },
  { id: "ORD-1285", customer: "Anita V.", vendor: "Delhi Delights", amount: 780, paymentMethod: "Cash", status: "Preparing", date: "2024-01-15" },
  { id: "ORD-1286", customer: "Meera J.", vendor: "Spice Kitchen", amount: 320, paymentMethod: "Card", status: "Pending", date: "2024-01-15" },
  { id: "ORD-1287", customer: "Karan S.", vendor: "Home Kitchen", amount: 560, paymentMethod: "UPI", status: "Cancelled", date: "2024-01-14" },
  { id: "ORD-1288", customer: "Suresh G.", vendor: "Gujarat Treats", amount: 290, paymentMethod: "Wallet", status: "Delivered", date: "2024-01-14" },
];

const statusVariant = (s: string) => {
  if (s === "Delivered") return "success" as const;
  if (s === "Preparing") return "info" as const;
  if (s === "Pending") return "warning" as const;
  return "destructive" as const;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success(`Order ${id} status updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="View and manage all orders" />

      <DataTableShell
        title="All Orders"
        actions={
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-36 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-48 rounded-md border border-input bg-secondary pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
          </div>
        }
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Order ID", "Customer", "Vendor", "Amount", "Payment", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{o.id}</td>
                <td className="px-5 py-3 text-muted-foreground">{o.customer}</td>
                <td className="px-5 py-3 text-muted-foreground">{o.vendor}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{o.amount}</td>
                <td className="px-5 py-3 text-muted-foreground">{o.paymentMethod}</td>
                <td className="px-5 py-3"><StatusBadge status={o.status} variant={statusVariant(o.status)} /></td>
                <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                <td className="px-5 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedOrder(o)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(o.id, "Preparing")}>Mark Preparing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(o.id, "Delivered")}>Mark Delivered</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => updateOrderStatus(o.id, "Cancelled")}>Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Order {selectedOrder?.id}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{selectedOrder.customer}</span></div>
              <div><span className="text-muted-foreground">Vendor:</span> <span className="font-medium">{selectedOrder.vendor}</span></div>
              <div><span className="text-muted-foreground">Amount:</span> <span className="font-medium">₹{selectedOrder.amount}</span></div>
              <div><span className="text-muted-foreground">Payment:</span> <span className="font-medium">{selectedOrder.paymentMethod}</span></div>
              <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedOrder.status} variant={statusVariant(selectedOrder.status)} /></div>
              <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{selectedOrder.date}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
