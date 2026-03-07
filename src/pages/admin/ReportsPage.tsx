import { PageHeader } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const revenueGrowth = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 53000 }, { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 }, { month: "May", revenue: 55000 }, { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 68000 }, { month: "Aug", revenue: 79000 }, { month: "Sep", revenue: 85000 },
  { month: "Oct", revenue: 91000 }, { month: "Nov", revenue: 87000 }, { month: "Dec", revenue: 95000 },
];

const ordersPerDay = [
  { day: "Mon", orders: 45 }, { day: "Tue", orders: 52 }, { day: "Wed", orders: 38 },
  { day: "Thu", orders: 65 }, { day: "Fri", orders: 78 }, { day: "Sat", orders: 92 }, { day: "Sun", orders: 71 },
];

const topVendors = [
  { name: "Spice Kitchen", orders: 342 }, { name: "Delhi Delights", orders: 289 },
  { name: "Gujarat Treats", orders: 215 }, { name: "Fresh Bites", orders: 198 }, { name: "Home Kitchen", orders: 156 },
];

const categoryPerf = [
  { name: "Momos", value: 30 }, { name: "Biryani", value: 25 }, { name: "South Indian", value: 20 },
  { name: "Chinese", value: 15 }, { name: "Desserts", value: 10 },
];
const pieColors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const chartStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" };

export default function ReportsPage() {
  const exportCSV = () => toast.success("CSV exported (mock)");

  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Platform performance insights" actions={<Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4 mr-1" />Export CSV</Button>} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={chartStyle} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Orders Per Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Top Vendors</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topVendors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryPerf} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryPerf.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={chartStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-card-foreground mb-2">Average Order Value</h3>
        <p className="text-3xl font-bold text-primary">₹385</p>
        <p className="text-sm text-muted-foreground mt-1">+5% from last month</p>
      </div>
    </div>
  );
}
