import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ChevronRight } from "lucide-react";
import { categories, shops, shopCategoryMap } from "@/data/mockCustomerData";

import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
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
  grocery: groceryImg,
  medicine: medicalImg,
  food: restaurantImg,
  fruits: fruitsImg,
  jewellery: jewelleryImg,
  garage: garageImg,
  cosmetics: cosmeticsImg,
  electronics: electronicsImg,
  bakery: bakeryImg,
  clothes: clothesImg,
};

const banners = [
  { image: banner1, title: "Opening Offer ₹10 Discount per Delivery", sub: "Order now & save!" },
  { image: banner2, title: "Free Delivery above ₹199", sub: "No minimum hassle!" },
];

const HomePage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentBanner((p) => (p + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const trendingShops = shops.filter((s) => s.isOpen).slice(0, 4);

  const categoryEntries = Object.entries(shopCategoryMap);

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Banner */}
      <section className="relative rounded-2xl overflow-hidden aspect-[2.4/1] md:aspect-[3/1]">
        {banners.map((b, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentBanner ? 1 : 0 }}
          >
            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="px-6 md:px-12 text-white max-w-md">
                <h2 className="text-lg md:text-2xl font-bold leading-tight">{b.title}</h2>
                <p className="text-sm mt-1 opacity-90">{b.sub}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === currentBanner ? 24 : 8,
                backgroundColor: i === currentBanner ? "hsl(24, 100%, 50%)" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Category Chips */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">Explore Shops</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
              style={
                activeCategory === c.id
                  ? { backgroundColor: "hsl(24, 100%, 50%)", color: "white", borderColor: "hsl(24, 100%, 50%)" }
                  : { borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }
              }
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Shops */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">🔥 Trending in Benipatti</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {trendingShops.map((shop) => (
            <Link
              key={shop.id}
              to={`/shop/store/${shop.id}`}
              className="flex-shrink-0 w-48 rounded-xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={categoryImages[shop.category] || groceryImg}
                alt={shop.name}
                className="w-full h-28 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground truncate">{shop.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {shop.rating}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {shop.deliveryTime}
                  </span>
                </div>
                <span
                  className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "hsl(var(--success))" }}
                >
                  OPEN
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop Categories Grid */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">Explore Shop Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryEntries.map(([key, cat]) => (
            <Link
              key={key}
              to={`/shop/category/${key}`}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <img
                src={categoryImages[key] || groceryImg}
                alt={cat.title}
                className="w-full h-28 sm:h-36 object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{cat.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
