import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Shivam%20Express%2C%20I%20need%20help"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-white text-sm font-medium shadow-lg hover:scale-105 transition-transform"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Need help? Chat on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
