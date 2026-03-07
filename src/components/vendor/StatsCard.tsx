import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, className }: Props) => (
  <div className={cn("rounded-xl border border-[hsl(220,13%,91%)] bg-white p-5 shadow-sm", className)}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-[hsl(220,10%,46%)]">{title}</p>
        <p className="mt-1 text-2xl font-bold text-[hsl(220,25%,10%)]">{value}</p>
        {trend && (
          <p className={cn("mt-1 text-xs font-medium", trendUp ? "text-[hsl(142,71%,45%)]" : "text-[hsl(0,72%,51%)]")}>
            {trend}
          </p>
        )}
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(24,100%,50%)]/10">
        <Icon className="h-5 w-5 text-[hsl(24,100%,50%)]" />
      </div>
    </div>
  </div>
);

export default StatsCard;
