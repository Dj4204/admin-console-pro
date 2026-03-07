import { ShoppingBag, IndianRupee, Clock, Package } from "lucide-react";
import StatsCard from "@/components/vendor/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 28 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 30 },
];

const recentOrders = [
  { id: "ORD-1042", customer: "Rahul Sharma", amount: 450, status: "Preparing" },
  { id: "ORD-1041", customer: "Priya Singh", amount: 320, status: "New" },
  { id: "ORD-1040", customer: "Amit Verma", amount: 780, status: "Completed" },
  { id: "ORD-1039", customer: "Sneha Gupta", amount: 250, status: "Ready" },
  { id: "ORD-1038", customer: "Vikram Patel", amount: 560, status: "Cancelled" },
];

const statusColor: Record<string, string> = {
  New: "bg-[hsl(220,70%,50%)]/10 text-[hsl(220,70%,50%)]",
  Preparing: "bg-[hsl(43,96%,56%)]/10 text-[hsl(43,96%,40%)]",
  Ready: "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,35%)]",
  Completed: "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,35%)]",
  Cancelled: "bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)]",
};

const VendorDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Dashboard</h1>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Orders Today" value="24" icon={ShoppingBag} trend="+12% vs yesterday" trendUp />
      <StatsCard title="Revenue Today" value="₹8,450" icon={IndianRupee} trend="+8% vs yesterday" trendUp />
      <StatsCard title="Pending Orders" value="5" icon={Clock} />
      <StatsCard title="Total Products" value="42" icon={Package} />
    </div>

    {/* Chart */}
    <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-[hsl(220,25%,10%)]">Orders This Week</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220,10%,46%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220,10%,46%)" }} />
            <Tooltip />
            <Bar dataKey="orders" fill="hsl(24,100%,50%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Recent Orders */}
    <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[hsl(220,13%,91%)] px-5 py-4">
        <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Recent Orders</h3>
        <Button variant="link" className="text-[hsl(24,100%,50%)] p-0 h-auto">View All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">{o.id}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell>₹{o.amount}</TableCell>
              <TableCell>
                <Badge className={`border-0 text-xs ${statusColor[o.status]}`}>{o.status}</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost" className="text-[hsl(24,100%,50%)]">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default VendorDashboard;
