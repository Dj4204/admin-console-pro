import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { shops, shopProducts, defaultProducts } from "@/data/mockCustomerData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import groceryImg from "@/assets/shops/grocery.jpg";
import medicalImg from "@/assets/shops/medical.jpg";
import restaurantImg from "@/assets/shops/restaurant.jpg";
import fruitsImg from "@/assets/shops/fruits.jpg";
import jewelleryImg from "@/assets/shops/jewellery.jpg";
import garageImg from "@/assets/shops/garage.jpg";
import cosmeticsImg from "@/assets/shops/cosmetics.jpg";
import electronicsImg from "@/assets/shops/electronics.jpg";
import bakeryImg from "@/assets/shops/bakery.jpg";
import clothesImg from "@/assets/shops/clothes.jpg";

const categoryImages: Record<string, string> = {
  grocery: groceryImg, medicine: medicalImg, food: restaurantImg, fruits: fruitsImg,
  jewellery: jewelleryImg, garage: garageImg, cosmetics: cosmeticsImg,
  electronics: electronicsImg, bakery: bakeryImg, clothes: clothesImg,
};

const ShopDetailsPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const shop = shops.find((s) => s.id === shopId);
  const products = shopProducts[shopId || ""] || defaultProducts;
  const { addItem, items, updateQuantity } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!shop) return <p className="text-center py-12 text-muted-foreground">Shop not found.</p>;

  const getCartQty = (productId: string) => {
    const cartItem = items.find((i) => i.id === productId);
    return cartItem?.quantity || 0;
  };

  const handleAdd = (product: typeof products[0]) => {
    addItem(product, shop.id, shop.name);
    toast({ title: "Added to cart", description: `${product.name} added` });
  };

  return (
    <div className="pb-20">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Shop Banner */}
      <div className="rounded-2xl overflow-hidden relative h-40 md:h-56">
        <img
          src={categoryImages[shop.category] || groceryImg}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-xl md:text-2xl font-bold">{shop.name}</h1>
          <p className="text-xs opacity-90">Benipatti, Bihar</p>
          <div className="flex items-center gap-3 mt-1 text-xs">
            <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {shop.rating}</span>
            <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {shop.deliveryTime}</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: shop.isOpen ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)" }}
            >
              {shop.isOpen ? "OPEN" : "CLOSED"}
            </span>
          </div>
        </div>
      </div>

      {/* Products */}
      <h2 className="text-lg font-bold text-foreground mt-6 mb-4">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const qty = getCartQty(product.id);
          return (
            <div key={product.id} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="h-28 bg-muted flex items-center justify-center">
                <span className="text-3xl">📦</span>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground truncate">{product.name}</h4>
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <p className="font-bold mt-1" style={{ color: "hsl(24, 100%, 50%)" }}>₹{product.price}</p>
                {qty === 0 ? (
                  <Button
                    size="sm"
                    className="w-full mt-2 text-xs h-8"
                    style={{ backgroundColor: "hsl(24, 100%, 50%)" }}
                    onClick={() => handleAdd(product)}
                    disabled={!shop.isOpen}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                ) : (
                  <div className="flex items-center justify-between mt-2 border border-border rounded-lg">
                    <button
                      className="p-1.5 hover:bg-muted rounded-l-lg"
                      onClick={() => updateQuantity(product.id, qty - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-semibold">{qty}</span>
                    <button
                      className="p-1.5 hover:bg-muted rounded-r-lg"
                      onClick={() => updateQuantity(product.id, qty + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopDetailsPage;
