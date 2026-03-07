import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload } from "lucide-react";

const categories = ["Main Course", "Starters", "Rice", "Desserts", "Beverages"];

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [available, setAvailable] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Product saved successfully!" });
    navigate("/vendor/products");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/vendor/products")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Add Product</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5 rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input placeholder="e.g. Butter Chicken" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Price (₹)</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea placeholder="Describe your product..." />
        </div>

        <div className="space-y-2">
          <Label>Product Image</Label>
          <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[hsl(220,13%,91%)] hover:border-[hsl(24,100%,50%)] transition-colors">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-[hsl(220,10%,46%)]" />
              <p className="mt-1 text-sm text-[hsl(220,10%,46%)]">Click to upload</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={available} onCheckedChange={setAvailable} />
          <Label>Available for ordering</Label>
        </div>

        <Button type="submit" className="w-full bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white">
          Save Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
