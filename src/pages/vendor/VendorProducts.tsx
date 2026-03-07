import { useState } from "react";
import ProductCard, { ProductData } from "@/components/vendor/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockProducts: ProductData[] = [
  { id: "1", name: "Butter Chicken", price: 280, category: "Main Course", image: "/placeholder.svg", available: true },
  { id: "2", name: "Paneer Tikka", price: 220, category: "Starters", image: "/placeholder.svg", available: true },
  { id: "3", name: "Dal Makhani", price: 180, category: "Main Course", image: "/placeholder.svg", available: false },
  { id: "4", name: "Veg Biryani", price: 250, category: "Rice", image: "/placeholder.svg", available: true },
  { id: "5", name: "Chicken Momos", price: 150, category: "Starters", image: "/placeholder.svg", available: true },
  { id: "6", name: "Gulab Jamun", price: 80, category: "Desserts", image: "/placeholder.svg", available: true },
];

const categories = ["All", "Main Course", "Starters", "Rice", "Desserts"];

const VendorProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const toggleAvail = (id: string, v: boolean) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, available: v } : p)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Products</h1>
        <Button className="bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white" onClick={() => navigate("/vendor/products/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(220,10%,46%)]" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-[hsl(220,10%,46%)]">No products found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onToggle={(v) => toggleAvail(p.id, v)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
