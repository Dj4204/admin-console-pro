import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Bike, Calendar, Camera } from "lucide-react";

const DeliveryProfilePage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Raju Kumar",
    phone: "+91 98765 43210",
    vehicleType: "Bike",
    vehicleNumber: "BR-01-AB-1234",
    joinDate: "January 15, 2026",
  });

  const handleSave = () => {
    toast({ title: "Profile updated! ✅" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(142,71%,45%)] text-white text-2xl font-bold">
            RK
          </div>
          <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{profile.name}</p>
          <p className="text-sm text-muted-foreground">Delivery Partner</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name</Label>
            <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone Number</Label>
            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Bike className="h-4 w-4" /> Vehicle Type</Label>
            <Input value={profile.vehicleType} onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Vehicle Number</Label>
            <Input value={profile.vehicleNumber} onChange={(e) => setProfile({ ...profile, vehicleNumber: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Join Date</Label>
            <Input value={profile.joinDate} disabled className="bg-muted" />
          </div>
        </div>

        <Button onClick={handleSave} className="bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default DeliveryProfilePage;
