import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard, { OrderData } from "@/components/vendor/OrderCard";
import { useToast } from "@/hooks/use-toast";

const initialOrders: OrderData[] = [
  { id: "1042", customer: "Rahul Sharma", items: ["Butter Chicken x2", "Naan x4"], total: 650, payment: "Online", status: "new" },
  { id: "1041", customer: "Priya Singh", items: ["Paneer Tikka x1", "Dal Makhani x1"], total: 420, payment: "COD", status: "new" },
  { id: "1040", customer: "Amit Verma", items: ["Biryani x1"], total: 320, payment: "Online", status: "preparing" },
  { id: "1039", customer: "Sneha Gupta", items: ["Momos x2", "Manchurian x1"], total: 280, payment: "UPI", status: "preparing" },
  { id: "1038", customer: "Vikram Patel", items: ["Thali x1"], total: 250, payment: "Online", status: "ready" },
  { id: "1037", customer: "Anjali Rao", items: ["Chole Bhature x2"], total: 180, payment: "COD", status: "completed" },
  { id: "1036", customer: "Karan Mehta", items: ["Pizza x1"], total: 350, payment: "Online", status: "cancelled" },
];

const VendorOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const { toast } = useToast();

  const updateStatus = (id: string, status: OrderData["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: `Order #${id} ${status}` });
  };

  const byStatus = (s: OrderData["status"]) => orders.filter((o) => o.status === s);

  const renderGrid = (list: OrderData[]) =>
    list.length === 0 ? (
      <p className="py-12 text-center text-sm text-[hsl(220,10%,46%)]">No orders</p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            onAccept={() => updateStatus(o.id, "preparing")}
            onReject={() => updateStatus(o.id, "cancelled")}
            onMarkReady={() => updateStatus(o.id, "ready")}
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Orders</h1>
      <Tabs defaultValue="new">
        <TabsList className="bg-white border border-[hsl(220,13%,91%)]">
          <TabsTrigger value="new">New ({byStatus("new").length})</TabsTrigger>
          <TabsTrigger value="preparing">Preparing ({byStatus("preparing").length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({byStatus("ready").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({byStatus("completed").length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({byStatus("cancelled").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="new">{renderGrid(byStatus("new"))}</TabsContent>
        <TabsContent value="preparing">{renderGrid(byStatus("preparing"))}</TabsContent>
        <TabsContent value="ready">{renderGrid(byStatus("ready"))}</TabsContent>
        <TabsContent value="completed">{renderGrid(byStatus("completed"))}</TabsContent>
        <TabsContent value="cancelled">{renderGrid(byStatus("cancelled"))}</TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorOrders;
