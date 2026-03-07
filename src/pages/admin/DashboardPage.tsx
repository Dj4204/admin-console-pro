import { KpiCard, DataTableShell, PageHeader } from "@/components/AdminComponents";
import { Users, Store, ShoppingCart, DollarSign, Clock, TrendingUp, BarChart3, CheckCircle, FolderTree } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 53000 },
  { month: "Mar", revenue: 48000 }, { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 }, { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 68000 }, { month: "Aug", revenue: 79000 },
  { month: "Sep", revenue: 85000 }, { month: "Oct", revenue: 91000 },
  { month: "Nov", revenue: 87000 }, { month: "Dec", revenue: 95000 },
];

const ordersData = [
  { day: "Mon", orders: 45 }, { day: "Tue", orders: 52 },
  { day: "Wed", orders: 38 }, { day: "Thu", orders: 65 },
  { day: "Fri", orders: 78 }, { day: "Sat", orders: 92 },
  { day: "Sun", orders: 71 },
];

const topVendors = [
  { name: "Spice Kitchen", orders: 342, revenue: "₹1,25,000" },
  { name: "Delhi Delights", orders: 289, revenue: "₹98,000" },
  { name: "Gujarat Treats", orders: 215, revenue: "₹67,000" },
  { name: "Fresh Bites", orders: 198, revenue: "₹54,000" },
  { name: "Home Kitchen", orders: 156, revenue: "₹34,000" },
];

const recentActivity = [
  { id: 1, event: "User Registered", detail: "Priya M. joined the platform", time: "2 min ago", color: "bg-info" },
  { id: 2, event: "Vendor Approved", detail: "Spice Kitchen - Mumbai", time: "8 min ago", color: "bg-success" },
  { id: 3, event: "New Order Placed", detail: "Order #1285 - ₹450", time: "12 min ago", color: "bg-primary" },
  { id: 4, event: "Order Completed", detail: "Order #1284 by Rahul S.", time: "25 min ago", color: "bg-success" },
  { id: 5, event: "New Vendor Registered", detail: "Delhi Delights applied", time: "1 hr ago", color: "bg-warning" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your platform performance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <KpiCard title="Total Users" value="12,847" change="+12% from last month" changeType="positive" icon={Users} />
        <KpiCard title="Total Vendors" value="342" change="+8% from last month" changeType="positive" icon={Store} />
        <KpiCard title="Total Orders" value="8,523" change="+23% from last month" changeType="positive" icon={ShoppingCart} />
        <KpiCard title="Total Revenue" value="₹9,52,400" change="+18% from last month" changeType="positive" icon={DollarSign} />
        <KpiCard title="Pending Orders" value="127" change="23 urgent" changeType="negative" icon={Clock} />
        <KpiCard title="Platform Commission" value="₹1,42,860" change="+15% from last month" changeType="positive" icon={TrendingUp} />
        <KpiCard title="Avg Order Value" value="₹385" change="+5% from last month" changeType="positive" icon={BarChart3} />
        <KpiCard title="Active Vendors" value="298" change="87% active" changeType="positive" icon={CheckCircle} />
        <KpiCard title="Top Category" value="Momos" change="1,245 orders" changeType="neutral" icon={FolderTree} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Orders (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataTableShell title="Top Vendors" description="Best performing vendors this month">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Vendor Name</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Orders</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topVendors.map((v) => (
                <tr key={v.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{v.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.orders}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTableShell>

        <div className="bg-card rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-card-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Latest platform events</p>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${a.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.event}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
