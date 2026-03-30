import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const deliveryFee = items.length > 0 ? 30 : 0;
  const discount = subtotal >= 199 ? 10 : 0;
  const grandTotal = subtotal + deliveryFee - discount;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add items from a shop to get started</p>
        <Link to="/shop">
          <Button style={{ backgroundColor: "hsl(24, 100%, 50%)" }}>Browse Shops</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 max-w-2xl mx-auto">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="text-xl font-bold text-foreground mb-4">Your Cart</h1>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📦</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.shopName}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: "hsl(24, 100%, 50%)" }}>₹{item.price * item.quantity}</p>
            </div>
            <div className="flex items-center gap-1 border border-border rounded-lg">
              <button className="p-1.5 hover:bg-muted rounded-l-lg" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
              <button className="p-1.5 hover:bg-muted rounded-r-lg" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg" onClick={() => removeItem(item.id)}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Bill Summary */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-3">Bill Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Item Total</span><span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Delivery Fee</span><span>₹{deliveryFee}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between" style={{ color: "hsl(var(--success))" }}>
              <span>Discount</span><span>-₹{discount}</span>
            </div>
          )}
          <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground text-base">
            <span>Grand Total</span><span>₹{grandTotal}</span>
          </div>
        </div>
      </div>

      <Link to="/shop/checkout">
        <Button className="w-full mt-4 h-12 text-base font-bold" style={{ backgroundColor: "hsl(24, 100%, 50%)" }}>
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartPage;
