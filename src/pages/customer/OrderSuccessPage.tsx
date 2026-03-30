import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderSuccessPage = () => {
  const orderId = `SE${Date.now().toString().slice(-6)}`;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "hsl(142, 71%, 45%, 0.15)" }}>
        <CheckCircle2 className="h-10 w-10" style={{ color: "hsl(142, 71%, 45%)" }} />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">🎉 Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-1">Your order has been received</p>
      <p className="text-sm font-semibold text-foreground mb-1">Order ID: #{orderId}</p>
      <p className="text-sm text-muted-foreground mb-8">Your order will be delivered within 30–45 minutes</p>
      <Link to="/shop">
        <Button className="h-11 px-8 font-bold" style={{ backgroundColor: "hsl(24, 100%, 50%)" }}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
