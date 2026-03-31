import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
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
import VendorLayout from "@/components/vendor/VendorLayout";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorOrders from "@/pages/vendor/VendorOrders";
import VendorProducts from "@/pages/vendor/VendorProducts";
import AddProduct from "@/pages/vendor/AddProduct";
import VendorEarnings from "@/pages/vendor/VendorEarnings";
import VendorPayouts from "@/pages/vendor/VendorPayouts";
import VendorSettings from "@/pages/vendor/VendorSettings";
import CustomerLayout from "@/components/customer/CustomerLayout";
import HomePage from "@/pages/customer/HomePage";
import CategoryShopsPage from "@/pages/customer/CategoryShopsPage";
import ShopDetailsPage from "@/pages/customer/ShopDetailsPage";
import CartPage from "@/pages/customer/CartPage";
import CheckoutPage from "@/pages/customer/CheckoutPage";
import OrderSuccessPage from "@/pages/customer/OrderSuccessPage";
import NotFound from "./pages/NotFound";
import { DeliveryProvider } from "@/contexts/DeliveryContext";
import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import DeliveryDashboardPage from "@/pages/delivery/DeliveryDashboardPage";
import AvailableOrdersPage from "@/pages/delivery/AvailableOrdersPage";
import ActiveDeliveryPage from "@/pages/delivery/ActiveDeliveryPage";
import DeliveryEarningsPage from "@/pages/delivery/DeliveryEarningsPage";
import DeliveryHistoryPage from "@/pages/delivery/DeliveryHistoryPage";
import DeliveryProfilePage from "@/pages/delivery/DeliveryProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            {/* Customer routes */}
            <Route path="/shop" element={<CustomerLayout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryId" element={<CategoryShopsPage />} />
              <Route path="store/:shopId" element={<ShopDetailsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
            </Route>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
            {/* Vendor routes */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<Navigate to="/vendor/dashboard" replace />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="orders" element={<VendorOrders />} />
              <Route path="products" element={<VendorProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="earnings" element={<VendorEarnings />} />
              <Route path="payouts" element={<VendorPayouts />} />
              <Route path="settings" element={<VendorSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
