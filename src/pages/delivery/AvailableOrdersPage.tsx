import { MapPin, Navigation, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDelivery } from "@/contexts/DeliveryContext";
import { useToast } from "@/hooks/use-toast";

const AvailableOrdersPage = () => {
  const { isOnline, availableOrders, activeOrder, acceptOrder } = useDelivery();
  const { toast } = useToast();

  const handleAccept = (id: string) => {
    if (activeOrder) {
      toast({ title: "Complete current delivery first", variant: "destructive" });
      return;
    }
    acceptOrder(id);
    toast({ title: "Order Accepted! 🎉", description: "Head to the restaurant for pickup." });
  };

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">😴</div>
        <h2 className="text-xl font-bold text-foreground">You're Offline</h2>
        <p className="text-muted-foreground mt-2">Go online to see available orders.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Available Orders</h1>
        <p className="text-sm text-muted-foreground">{availableOrders.length} orders near you</p>
      </div>

      {availableOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-foreground">No Orders Available</h2>
          <p className="text-muted-foreground mt-2">New orders will appear here. Stay online!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableOrders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">#{order.id}</p>
                  <p className="text-base font-semibold text-foreground mt-1">{order.restaurant}</p>
                </div>
                <Badge className="bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)] border-0">
                  {order.distance} km
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[hsl(24,100%,50%)] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="text-foreground">{order.pickupAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Navigation className="h-4 w-4 text-[hsl(142,71%,45%)] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Drop-off</p>
                    <p className="text-foreground">{order.customerAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4 text-[hsl(142,71%,45%)]" />
                  <span className="text-lg font-bold text-foreground">₹{order.deliveryFee}</span>
                </div>
                <Button
                  onClick={() => handleAccept(order.id)}
                  className="bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white"
                  disabled={!!activeOrder}
                >
                  Accept Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrdersPage;
