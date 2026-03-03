import { KpiCard, DataTableShell, PageHeader } from "@/components/AdminComponents";
import { Users, Store, ShoppingCart, DollarSign, Clock, TrendingUp } from "lucide-react";
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

const recentActivity = [
  { id: 1, event: "New vendor registered", detail: "Spice Kitchen - Mumbai", time: "2 min ago" },
  { id: 2, event: "Order completed", detail: "Order #1284 by Rahul S.", time: "8 min ago" },
  { id: 3, event: "New order placed", detail: "Order #1285 - ₹450", time: "12 min ago" },
  { id: 4, event: "Vendor approved", detail: "Delhi Delights verified", time: "25 min ago" },
  { id: 5, event: "Payment processed", detail: "₹12,500 to Fresh Bites", time: "1 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your platform performance" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Users" value="12,847" change="+12% from last month" changeType="positive" icon={Users} />
        <KpiCard title="Total Vendors" value="342" change="+8% from last month" changeType="positive" icon={Store} />
        <KpiCard title="Total Orders" value="8,523" change="+23% from last month" changeType="positive" icon={ShoppingCart} />
        <KpiCard title="Total Revenue" value="₹9,52,400" change="+18% from last month" changeType="positive" icon={DollarSign} />
        <KpiCard title="Pending Orders" value="127" change="23 urgent" changeType="negative" icon={Clock} />
        <KpiCard title="Commission" value="₹1,42,860" change="+15% from last month" changeType="positive" icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 animate-fade-in">
          <h3 className="font-semibold text-card-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 animate-fade-in">
          <h3 className="font-semibold text-card-foreground mb-4">Orders (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <DataTableShell title="Recent Activity" description="Latest platform events">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-muted-foreground font-medium">Event</th>
              <th className="text-left px-5 py-3 text-muted-foreground font-medium">Details</th>
              <th className="text-left px-5 py-3 text-muted-foreground font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{a.event}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.detail}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
