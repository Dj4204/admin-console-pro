import { useState } from "react";
import { PageHeader } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    deliveryCharge: "30",
    commissionPct: "15",
    gstPct: "5",
    maintenanceMode: false,
    bannerText: "Welcome to Bhojwala!",
    razorpayKey: "",
    razorpaySecret: "",
  });

  const update = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => toast.success("Settings saved successfully");

  return (
    <div className="space-y-6">
      <PageHeader title="Platform Settings" description="Configure global platform settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="font-semibold text-card-foreground">Pricing & Fees</h3>
          <div>
            <Label>Default Delivery Charge (₹)</Label>
            <Input value={settings.deliveryCharge} onChange={(e) => update("deliveryCharge", e.target.value)} />
          </div>
          <div>
            <Label>Platform Commission (%)</Label>
            <Input value={settings.commissionPct} onChange={(e) => update("commissionPct", e.target.value)} />
          </div>
          <div>
            <Label>GST (%)</Label>
            <Input value={settings.gstPct} onChange={(e) => update("gstPct", e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="font-semibold text-card-foreground">App Settings</h3>
          <div className="flex items-center justify-between">
            <Label>Maintenance Mode</Label>
            <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => update("maintenanceMode", v)} />
          </div>
          <div>
            <Label>App Banner Text</Label>
            <Input value={settings.bannerText} onChange={(e) => update("bannerText", e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 space-y-4 lg:col-span-2">
          <h3 className="font-semibold text-card-foreground">Payment Gateway</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Razorpay Key ID</Label>
              <Input type="password" value={settings.razorpayKey} onChange={(e) => update("razorpayKey", e.target.value)} placeholder="rzp_..." />
            </div>
            <div>
              <Label>Razorpay Secret</Label>
              <Input type="password" value={settings.razorpaySecret} onChange={(e) => update("razorpaySecret", e.target.value)} placeholder="Enter secret" />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={save}>Save Settings</Button>
    </div>
  );
}
