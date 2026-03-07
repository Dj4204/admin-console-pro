import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";

export interface ProductData {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

interface Props {
  product: ProductData;
  onToggle?: (v: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard = ({ product, onToggle, onEdit, onDelete }: Props) => (
  <div className="overflow-hidden rounded-xl border border-[hsl(220,13%,91%)] bg-white shadow-sm">
    <div className="aspect-[4/3] bg-[hsl(220,14%,96%)]">
      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-[hsl(220,25%,10%)]">{product.name}</p>
          <p className="text-xs text-[hsl(220,10%,46%)]">{product.category}</p>
        </div>
        <p className="text-lg font-bold text-[hsl(24,100%,50%)]">₹{product.price}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch checked={product.available} onCheckedChange={onToggle} />
          <span className="text-xs text-[hsl(220,10%,46%)]">{product.available ? "Available" : "Unavailable"}</span>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-[hsl(0,72%,51%)]" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
