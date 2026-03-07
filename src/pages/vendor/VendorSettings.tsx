import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const VendorSettings = () => {
  const { toast } = useToast();
  const [online, setOnline] = useState(true);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-[hsl(220,25%,10%)]">Settings</h1>

      {/* Store Info */}
      <div className="space-y-4 rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Store Information</h3>
        <div className="space-y-2">
          <Label>Store Name</Label>
          <Input defaultValue="Sharma Kitchen" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input defaultValue="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input defaultValue="MG Road, Indore" />
          </div>
        </div>
      </div>

      {/* Timing */}
      <div className="space-y-4 rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Store Timing</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Open Time</Label>
            <Input type="time" defaultValue="09:00" />
          </div>
          <div className="space-y-2">
            <Label>Close Time</Label>
            <Input type="time" defaultValue="22:00" />
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="space-y-4 rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Delivery Settings</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Delivery Radius (km)</Label>
            <Input type="number" defaultValue="5" />
          </div>
          <div className="space-y-2">
            <Label>Minimum Order (₹)</Label>
            <Input type="number" defaultValue="99" />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between rounded-xl border border-[hsl(220,13%,91%)] bg-white p-6 shadow-sm">
        <div>
          <h3 className="text-base font-semibold text-[hsl(220,25%,10%)]">Store Status</h3>
          <p className="text-sm text-[hsl(220,10%,46%)]">{online ? "Your store is online" : "Your store is offline"}</p>
        </div>
        <Switch checked={online} onCheckedChange={setOnline} />
      </div>

      <Button
        className="w-full bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white"
        onClick={() => toast({ title: "Settings saved!" })}
      >
        Save Settings
      </Button>
    </div>
  );
};

export default VendorSettings;
