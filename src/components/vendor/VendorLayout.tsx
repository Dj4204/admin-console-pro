import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";
import VendorTopNavbar from "./VendorTopNavbar";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex h-screen bg-[hsl(210,20%,98%)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <VendorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <VendorTopNavbar
          isOnline={isOnline}
          onToggleOnline={() => setIsOnline(!isOnline)}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
