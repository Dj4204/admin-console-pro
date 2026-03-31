import { CheckCircle2, Circle, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDelivery } from "@/contexts/DeliveryContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const steps = [
  { key: "accepted", label: "Order Accepted" },
  { key: "picked", label: "Picked from Restaurant" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
] as const;

const statusIndex: Record<string, number> = {
  accepted: 0,
  picked: 1,
  out_for_delivery: 2,
  delivered: 3,
};

const ActiveDeliveryPage = () => {
  const { activeOrder, markPicked, startDelivery, markDelivered } = useDelivery();
  const { toast } = useToast();

  if (!activeOrder) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🚲</div>
        <h2 className="text-xl font-bold text-foreground">No Active Delivery</h2>
        <p className="text-muted-foreground mt-2">Accept an order to start delivering.</p>
      </div>
    );
  }

  const currentIdx = statusIndex[activeOrder.status] ?? 0;

  const handlePicked = () => { markPicked(); toast({ title: "Picked up! 📦", description: "Head to the customer." }); };
  const handleStart = () => { startDelivery(); toast({ title: "On the way! 🚀" }); };
  const handleDeliver = () => { markDelivered(); toast({ title: "Delivered! 🎉", description: `₹${activeOrder.deliveryFee} added to earnings.` }); };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">My Active Delivery</h1>

      {/* Order info */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Order</p>
            <p className="text-lg font-bold text-foreground">#{activeOrder.id}</p>
          </div>
          <span className="text-lg font-bold text-[hsl(142,71%,45%)]">₹{activeOrder.deliveryFee}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-[hsl(24,100%,50%)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Pickup — {activeOrder.restaurant}</p>
              <p className="text-sm text-foreground">{activeOrder.pickupAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="h-4 w-4 text-[hsl(142,71%,45%)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Drop-off — {activeOrder.customerName}</p>
              <p className="text-sm text-foreground">{activeOrder.customerAddress}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Items</p>
          <p className="text-sm text-foreground">{activeOrder.items.join(", ")}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-foreground mb-4">Delivery Progress</h2>
        <div className="space-y-0">
          {steps.map((step, idx) => {
            const done = idx <= currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <div key={step.key} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  {done ? (
                    <CheckCircle2 className={cn("h-6 w-6", isCurrent ? "text-[hsl(142,71%,45%)]" : "text-[hsl(142,71%,45%)]/60")} />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground/40" />
                  )}
                  {idx < steps.length - 1 && (
                    <div className={cn("w-0.5 h-8", done ? "bg-[hsl(142,71%,45%)]/40" : "bg-muted")} />
                  )}
                </div>
                <p className={cn("text-sm pt-0.5", done ? "font-semibold text-foreground" : "text-muted-foreground")}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {activeOrder.status === "accepted" && (
          <Button onClick={handlePicked} className="bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white flex-1" size="lg">
            📦 Mark as Picked
          </Button>
        )}
        {activeOrder.status === "picked" && (
          <Button onClick={handleStart} className="bg-[hsl(220,70%,50%)] hover:bg-[hsl(220,70%,45%)] text-white flex-1" size="lg">
            🚀 Start Delivery
          </Button>
        )}
        {activeOrder.status === "out_for_delivery" && (
          <Button onClick={handleDeliver} className="bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white flex-1" size="lg">
            ✅ Mark as Delivered
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveryPage;
