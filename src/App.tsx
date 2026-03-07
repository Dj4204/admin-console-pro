import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import VendorsPage from "@/pages/admin/VendorsPage";
import UsersPage from "@/pages/admin/UsersPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import PaymentsPage from "@/pages/admin/PaymentsPage";
import CategoriesPage from "@/pages/admin/CategoriesPage";
import ReportsPage from "@/pages/admin/ReportsPage";
import SpinControlPage from "@/pages/admin/SpinControlPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import BannersPage from "@/pages/admin/BannersPage";
import AnnouncementsPage from "@/pages/admin/AnnouncementsPage";
import SubcategoriesPage from "@/pages/admin/SubcategoriesPage";
import CouponsPage from "@/pages/admin/CouponsPage";
import VendorMenuPage from "@/pages/admin/VendorMenuPage";
import AdminsPage from "@/pages/admin/AdminsPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="vendor-menu" element={<VendorMenuPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="banners" element={<BannersPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="subcategories" element={<SubcategoriesPage />} />
            <Route path="spin" element={<SpinControlPage />} />
            <Route path="coupons" element={<CouponsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="activity" element={<ActivityLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
