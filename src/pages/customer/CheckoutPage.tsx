import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPage = () => {
  const { subtotal, clearCart, items } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const deliveryFee = 30;
  const discount = subtotal >= 199 ? 10 : 0;
  const grandTotal = subtotal + deliveryFee - discount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/shop/order-success");
  };

  if (items.length === 0) {
    navigate("/shop/cart");
    return null;
  }

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <Link to="/shop/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Link>
      <h1 className="text-xl font-bold text-foreground mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">Delivery Details</h3>
          <div><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Your full name" required /></div>
          <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" placeholder="10-digit mobile number" required /></div>
          <div><Label htmlFor="address">Full Address</Label><Input id="address" placeholder="House no, Street, Village" required /></div>
          <div><Label htmlFor="landmark">Landmark</Label><Input id="landmark" placeholder="Near temple, school, etc." /></div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-foreground">Payment Method</h3>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50">
            <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} className="accent-orange-500" />
            <div><p className="text-sm font-medium text-foreground">Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay when you receive</p></div>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50">
            <input type="radio" name="payment" checked={payment === "online"} onChange={() => setPayment("online")} className="accent-orange-500" />
            <div><p className="text-sm font-medium text-foreground">Online Payment</p><p className="text-xs text-muted-foreground">UPI, Cards, Wallets</p></div>
          </label>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Item Total</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-muted-foreground mt-1"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
          {discount > 0 && <div className="flex justify-between mt-1" style={{ color: "hsl(var(--success))" }}><span>Discount</span><span>-₹{discount}</span></div>}
          <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-foreground text-base"><span>Grand Total</span><span>₹{grandTotal}</span></div>
        </div>

        <Button type="submit" className="w-full h-12 text-base font-bold" style={{ backgroundColor: "hsl(24, 100%, 50%)" }}>
          PLACE ORDER
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
