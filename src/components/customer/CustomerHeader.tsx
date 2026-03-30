import { Search, ShoppingCart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const CustomerHeader = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link to="/shop" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-extrabold" style={{ color: "hsl(24, 100%, 50%)" }}>
            Shivam<span className="text-foreground"> Express</span>
          </h1>
        </Link>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
          <MapPin className="h-3.5 w-3.5" style={{ color: "hsl(24, 100%, 50%)" }} />
          <span>Benipatti & Nearby</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shops or products"
              className="w-full h-9 pl-9 pr-3 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Cart */}
        <Link to="/shop/cart" className="relative flex-shrink-0 p-2 rounded-full hover:bg-muted transition-colors">
          <ShoppingCart className="h-5 w-5 text-foreground" />
          {totalItems > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: "hsl(24, 100%, 50%)" }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile location */}
      <div className="sm:hidden px-4 pb-2 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" style={{ color: "hsl(24, 100%, 50%)" }} />
        <span>Delivering in Benipatti & Nearby Villages</span>
      </div>
    </header>
  );
};

export default CustomerHeader;
