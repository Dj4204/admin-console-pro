import { useState } from "react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Image, Star } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  rating: number;
  active: boolean;
}

const mockDishes: Dish[] = [
  { id: "1", name: "Butter Chicken", vendor: "Spice Kitchen", category: "Main Course", price: 280, rating: 4.5, active: true },
  { id: "2", name: "Paneer Tikka", vendor: "Spice Kitchen", category: "Starters", price: 220, rating: 4.3, active: true },
  { id: "3", name: "Veg Momos", vendor: "Delhi Delights", category: "Momos", price: 120, rating: 4.7, active: true },
  { id: "4", name: "Chicken Biryani", vendor: "Delhi Delights", category: "Biryani", price: 320, rating: 4.6, active: true },
  { id: "5", name: "Masala Dosa", vendor: "Home Kitchen", category: "South Indian", price: 150, rating: 4.2, active: false },
  { id: "6", name: "Chole Bhature", vendor: "Gujarat Treats", category: "Main Course", price: 180, rating: 4.4, active: true },
];

const vendors = ["All", "Spice Kitchen", "Delhi Delights", "Home Kitchen", "Gujarat Treats"];
const categories = ["All", "Main Course", "Starters", "Momos", "Biryani", "South Indian"];

export default function VendorMenuPage() {
  const [dishes, setDishes] = useState(mockDishes);
  const [vendorFilter, setVendorFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");

  const toggleDish = (id: string) => {
    setDishes((p) => p.map((d) => d.id === id ? { ...d, active: !d.active } : d));
    toast.success("Dish status updated");
  };

  const filtered = dishes.filter((d) =>
    (vendorFilter === "All" || d.vendor === vendorFilter) &&
    (catFilter === "All" || d.category === catFilter) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Vendor Menu Control" description="Manage vendor dishes across the platform" />

      <div className="flex flex-wrap gap-2">
        <Input placeholder="Search dishes..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <select value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {vendors.map((v) => <option key={v}>{v}</option>)}
        </select>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <DataTableShell title={`Dishes (${filtered.length})`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Image", "Dish Name", "Vendor", "Price", "Rating", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3"><div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center"><Image className="h-4 w-4 text-muted-foreground" /></div></td>
                <td className="px-5 py-3 font-medium text-foreground">{d.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{d.vendor}</td>
                <td className="px-5 py-3 text-muted-foreground">₹{d.price}</td>
                <td className="px-5 py-3"><span className="flex items-center gap-1 text-muted-foreground"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{d.rating}</span></td>
                <td className="px-5 py-3"><StatusBadge status={d.active ? "Active" : "Disabled"} variant={d.active ? "success" : "destructive"} /></td>
                <td className="px-5 py-3">
                  <Button size="sm" variant={d.active ? "outline" : "default"} onClick={() => toggleDish(d.id)}>
                    {d.active ? "Disable" : "Enable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </div>
  );
}
