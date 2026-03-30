import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import FloatingWhatsApp from "./FloatingWhatsApp";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      <main className="max-w-7xl mx-auto px-4 py-4">
        <Outlet />
      </main>
      <FloatingWhatsApp />
    </div>
  );
};

export default CustomerLayout;
