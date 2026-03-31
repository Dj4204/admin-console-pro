import { createContext, useContext, useState, ReactNode } from "react";

export interface DeliveryOrder {
  id: string;
  restaurant: string;
  pickupAddress: string;
  customerAddress: string;
  customerName: string;
  distance: number;
  deliveryFee: number;
  items: string[];
  status: "available" | "accepted" | "picked" | "out_for_delivery" | "delivered";
  acceptedAt?: string;
  deliveredAt?: string;
}

interface EarningsEntry {
  date: string;
  orderId: string;
  distance: number;
  amount: number;
  status: "paid" | "pending";
}

interface DeliveryContextType {
  isOnline: boolean;
  toggleOnline: () => void;
  availableOrders: DeliveryOrder[];
  activeOrder: DeliveryOrder | null;
  deliveryHistory: DeliveryOrder[];
  earnings: EarningsEntry[];
  acceptOrder: (id: string) => void;
  markPicked: () => void;
  startDelivery: () => void;
  markDelivered: () => void;
}

const mockAvailable: DeliveryOrder[] = [
  { id: "DLV-1001", restaurant: "Sharma Kitchen", pickupAddress: "Main Bazaar, Benipatti", customerAddress: "Ward 5, Near Shiv Mandir", customerName: "Rahul Kumar", distance: 2.3, deliveryFee: 35, items: ["Paneer Butter Masala", "2x Roti"], status: "available" },
  { id: "DLV-1002", restaurant: "Gupta Sweets", pickupAddress: "Station Road, Benipatti", customerAddress: "Naya Tola, Benipatti", customerName: "Priya Devi", distance: 1.8, deliveryFee: 25, items: ["1kg Rasgulla", "500g Gulab Jamun"], status: "available" },
  { id: "DLV-1003", restaurant: "Royal Dhaba", pickupAddress: "NH-57, Benipatti", customerAddress: "Rampur Village", customerName: "Amit Singh", distance: 4.5, deliveryFee: 50, items: ["Chicken Biryani", "Raita"], status: "available" },
  { id: "DLV-1004", restaurant: "Maa Ki Rasoi", pickupAddress: "College Road, Benipatti", customerAddress: "Bazar Chowk, Benipatti", customerName: "Sunita Kumari", distance: 1.2, deliveryFee: 20, items: ["Dal Makhani", "3x Tandoori Roti", "Salad"], status: "available" },
];

const mockHistory: DeliveryOrder[] = [
  { id: "DLV-0991", restaurant: "Sharma Kitchen", pickupAddress: "Main Bazaar", customerAddress: "Ward 3", customerName: "Ravi", distance: 2.1, deliveryFee: 30, items: ["Thali"], status: "delivered", deliveredAt: "2026-03-30" },
  { id: "DLV-0988", restaurant: "Gupta Sweets", pickupAddress: "Station Road", customerAddress: "Naya Tola", customerName: "Meena", distance: 1.5, deliveryFee: 25, items: ["Sweets"], status: "delivered", deliveredAt: "2026-03-30" },
  { id: "DLV-0985", restaurant: "Royal Dhaba", pickupAddress: "NH-57", customerAddress: "Rampur", customerName: "Suresh", distance: 4.0, deliveryFee: 45, items: ["Biryani"], status: "delivered", deliveredAt: "2026-03-29" },
  { id: "DLV-0980", restaurant: "Maa Ki Rasoi", pickupAddress: "College Road", customerAddress: "Bazar Chowk", customerName: "Pooja", distance: 1.0, deliveryFee: 20, items: ["Roti Sabzi"], status: "delivered", deliveredAt: "2026-03-29" },
  { id: "DLV-0975", restaurant: "Sharma Kitchen", pickupAddress: "Main Bazaar", customerAddress: "Ward 7", customerName: "Anil", distance: 3.2, deliveryFee: 40, items: ["Chole Bhature"], status: "delivered", deliveredAt: "2026-03-28" },
];

const mockEarnings: EarningsEntry[] = [
  { date: "2026-03-31", orderId: "DLV-0995", distance: 2.3, amount: 35, status: "paid" },
  { date: "2026-03-31", orderId: "DLV-0994", distance: 1.8, amount: 25, status: "paid" },
  { date: "2026-03-30", orderId: "DLV-0991", distance: 2.1, amount: 30, status: "paid" },
  { date: "2026-03-30", orderId: "DLV-0988", distance: 1.5, amount: 25, status: "paid" },
  { date: "2026-03-29", orderId: "DLV-0985", distance: 4.0, amount: 45, status: "paid" },
  { date: "2026-03-29", orderId: "DLV-0980", distance: 1.0, amount: 20, status: "pending" },
  { date: "2026-03-28", orderId: "DLV-0975", distance: 3.2, amount: 40, status: "paid" },
];

const DeliveryContext = createContext<DeliveryContextType | null>(null);

export const useDelivery = () => {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
};

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [available, setAvailable] = useState<DeliveryOrder[]>(mockAvailable);
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);
  const [history, setHistory] = useState<DeliveryOrder[]>(mockHistory);
  const [earnings, setEarnings] = useState<EarningsEntry[]>(mockEarnings);

  const toggleOnline = () => setIsOnline((prev) => !prev);

  const acceptOrder = (id: string) => {
    const order = available.find((o) => o.id === id);
    if (!order || activeOrder) return;
    setAvailable((prev) => prev.filter((o) => o.id !== id));
    setActiveOrder({ ...order, status: "accepted", acceptedAt: new Date().toISOString() });
  };

  const markPicked = () => {
    if (!activeOrder) return;
    setActiveOrder({ ...activeOrder, status: "picked" });
  };

  const startDelivery = () => {
    if (!activeOrder) return;
    setActiveOrder({ ...activeOrder, status: "out_for_delivery" });
  };

  const markDelivered = () => {
    if (!activeOrder) return;
    const delivered = { ...activeOrder, status: "delivered" as const, deliveredAt: new Date().toISOString().slice(0, 10) };
    setHistory((prev) => [delivered, ...prev]);
    setEarnings((prev) => [
      { date: delivered.deliveredAt!, orderId: delivered.id, distance: delivered.distance, amount: delivered.deliveryFee, status: "pending" },
      ...prev,
    ]);
    setActiveOrder(null);
  };

  return (
    <DeliveryContext.Provider
      value={{ isOnline, toggleOnline, availableOrders: available, activeOrder, deliveryHistory: history, earnings, acceptOrder, markPicked, startDelivery, markDelivered }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
