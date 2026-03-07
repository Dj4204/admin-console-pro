import { IndianRupee, TrendingUp, Calendar, Wallet } from "lucide-react";
import StatsCard from "@/components/vendor/StatsCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { date: "Jan", earnings: 12000 },
  { date: "Feb", earnings: 18500 },
  { date: "Mar", earnings: 15200 },
  { date: "Apr", earnings: 22000 },
  { date: "May", earnings: 19800 },
  { date: "Jun", earnings: 28500 },
  { date: "Jul", earnings: 32000 },
];

const VendorEarnings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Earnings</h1>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Today's Earnings" value="₹8,450" icon={IndianRupee} trend="+12%" trendUp />
      <StatsCard title="Weekly Earnings" value="₹42,300" icon={TrendingUp} trend="+8%" trendUp />
      <StatsCard title="Monthly Earnings" value="₹1,85,000" icon={Calendar} trend="+15%" trendUp />
      <StatsCard title="Total Earnings" value="₹12,45,000" icon={Wallet} />
    </div>

    <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-[hsl(220,25%,10%)]">Earnings Trend</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(220,10%,46%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220,10%,46%)" }} />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="hsl(24,100%,50%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(24,100%,50%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default VendorEarnings;
