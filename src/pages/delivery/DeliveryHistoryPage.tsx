import { Badge } from "@/components/ui/badge";
import { useDelivery } from "@/contexts/DeliveryContext";

const DeliveryHistoryPage = () => {
  const { deliveryHistory } = useDelivery();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Delivery History</h1>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Restaurant</th>
                <th className="p-4 font-medium">Customer Address</th>
                <th className="p-4 font-medium">Distance</th>
                <th className="p-4 font-medium">Earnings</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveryHistory.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-foreground">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{order.restaurant}</td>
                  <td className="p-4 text-muted-foreground">{order.customerAddress}</td>
                  <td className="p-4 text-muted-foreground">{order.distance} km</td>
                  <td className="p-4 font-semibold text-[hsl(142,71%,45%)]">₹{order.deliveryFee}</td>
                  <td className="p-4 text-muted-foreground">{order.deliveredAt}</td>
                  <td className="p-4">
                    <Badge className="bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)] border-0">Delivered</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistoryPage;
