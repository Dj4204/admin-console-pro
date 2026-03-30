import { useParams, Link } from "react-router-dom";
import { Star, Clock, MapPin, ArrowLeft } from "lucide-react";
import { shops, shopCategoryMap } from "@/data/mockCustomerData";

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

const CategoryShopsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const catInfo = shopCategoryMap[categoryId || ""] || { title: "Shops", image: "" };
  const filteredShops = shops.filter((s) => s.category === categoryId);

  return (
    <div className="pb-20">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-xl font-bold text-foreground mb-4">{catInfo.title} in Benipatti</h1>

      {filteredShops.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No shops found in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredShops.map((shop) => (
            <Link
              key={shop.id}
              to={`/shop/store/${shop.id}`}
              className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={categoryImages[shop.category] || groceryImg}
                alt={shop.name}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{shop.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {shop.rating}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" /> {shop.deliveryTime}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" /> {shop.distance}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Delivery: {shop.deliveryCharge === 0 ? "Free" : `₹${shop.deliveryCharge}`}
                </p>
                <span
                  className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: shop.isOpen ? "hsl(var(--success))" : "hsl(var(--destructive))" }}
                >
                  {shop.isOpen ? "OPEN" : "CLOSED"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryShopsPage;
