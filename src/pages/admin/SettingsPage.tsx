import { useState } from "react";
import { PageHeader } from "@/components/AdminComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "Bhojwala",
    deliveryCharge: "30",
    commissionPct: "15",
    gstPct: "5",
    maintenanceMode: false,
    bannerText: "Welcome to Bhojwala!",
    razorpayKey: "",
    razorpaySecret: "",
  });

  const update = (key: string, value: string | boolean) => setSettings((p) => ({ ...p, [key]: value }));
  const save = () => toast.success("Settings saved successfully");

  return (
    <div className="space-y-6">
      <PageHeader title="Platform Settings" description="Configure platform-wide settings" />

      <div className="grid gap-6 max-w-2xl">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-semibold text-card-foreground">General Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Platform Name</label>
              <Input value={settings.platformName} onChange={(e) => update("platformName", e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Default Delivery Charge (₹)</label>
              <Input type="number" value={settings.deliveryCharge} onChange={(e) => update("deliveryCharge", e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Platform Commission (%)</label>
              <Input type="number" value={settings.commissionPct} onChange={(e) => update("commissionPct", e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">GST (%)</label>
              <Input type="number" value={settings.gstPct} onChange={(e) => update("gstPct", e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">App Banner Text</label>
              <Input value={settings.bannerText} onChange={(e) => update("bannerText", e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-semibold text-card-foreground">System Settings</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Temporarily disable the platform</p>
            </div>
            <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => update("maintenanceMode", v)} />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-semibold text-card-foreground">Payment Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Razorpay Key ID</label>
              <Input type="password" value={settings.razorpayKey} onChange={(e) => update("razorpayKey", e.target.value)} placeholder="rzp_live_..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Razorpay Key Secret</label>
              <Input type="password" value={settings.razorpaySecret} onChange={(e) => update("razorpaySecret", e.target.value)} placeholder="••••••••" className="mt-1" />
            </div>
          </div>
        </div>

        <Button onClick={save} className="w-fit">Save Settings</Button>
      </div>
    </div>
  );
}
