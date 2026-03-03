import { PageHeader } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 53000 },
  { month: "Mar", revenue: 48000 }, { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 }, { month: "Jun", revenue: 72000 },
];

const topVendors = [
  { name: "Spice Kitchen", revenue: 125000 },
  { name: "Delhi Delights", revenue: 98000 },
  { name: "Gujarat Treats", revenue: 67000 },
  { name: "Home Kitchen", revenue: 34000 },
];

const categoryPerf = [
  { name: "North Indian", value: 35 },
  { name: "South Indian", value: 25 },
  { name: "Chinese", value: 20 },
  { name: "Desserts", value: 12 },
  { name: "Beverages", value: 8 },
];

const COLORS = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))",
];

export default function ReportsPage() {
  const exportCSV = () => toast.success("Report exported as CSV");

  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Platform performance insights" actions={
        <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      } />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Top Vendors</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topVendors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="revenue" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryPerf} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryPerf.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-card-foreground mb-2">Average Order Value</h3>
          <div className="text-5xl font-bold text-primary">₹385</div>
          <p className="text-sm text-muted-foreground mt-2">Based on last 30 days</p>
        </div>
      </div>
    </div>
  );
}
