import "@unocss/reset/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "virtual:uno.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <App />
          <Toaster position="top-right" richColors />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
