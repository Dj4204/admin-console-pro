import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OrderData {
  id: string;
  customer: string;
  items: string[];
  total: number;
  payment: string;
  status: "new" | "preparing" | "ready" | "completed" | "cancelled";
}

const statusColors: Record<string, string> = {
  new: "bg-[hsl(220,70%,50%)]/10 text-[hsl(220,70%,50%)]",
  preparing: "bg-[hsl(43,96%,56%)]/10 text-[hsl(43,96%,40%)]",
  ready: "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,35%)]",
  completed: "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,35%)]",
  cancelled: "bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)]",
};

interface Props {
  order: OrderData;
  onAccept?: () => void;
  onReject?: () => void;
  onMarkReady?: () => void;
}

const OrderCard = ({ order, onAccept, onReject, onMarkReady }: Props) => (
  <div className="rounded-xl border border-[hsl(220,13%,91%)] bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold text-[hsl(220,25%,10%)]">#{order.id}</p>
        <p className="text-sm text-[hsl(220,10%,46%)]">{order.customer}</p>
      </div>
      <Badge className={cn("border-0 text-xs font-medium", statusColors[order.status])}>
        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
      </Badge>
    </div>

    <div className="mt-3 space-y-1">
      {order.items.map((item, i) => (
        <p key={i} className="text-sm text-[hsl(220,10%,46%)]">• {item}</p>
      ))}
    </div>

    <div className="mt-3 flex items-center justify-between border-t border-[hsl(220,13%,91%)] pt-3">
      <div>
        <p className="text-base font-bold text-[hsl(220,25%,10%)]">₹{order.total}</p>
        <p className="text-xs text-[hsl(220,10%,46%)]">{order.payment}</p>
      </div>
      <div className="flex gap-2">
        {order.status === "new" && (
          <>
            <Button size="sm" variant="outline" className="text-[hsl(0,72%,51%)] border-[hsl(0,72%,51%)]" onClick={onReject}>Reject</Button>
            <Button size="sm" className="bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white" onClick={onAccept}>Accept</Button>
          </>
        )}
        {order.status === "preparing" && (
          <Button size="sm" className="bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white" onClick={onMarkReady}>Mark Ready</Button>
        )}
      </div>
    </div>
  </div>
);

export default OrderCard;
