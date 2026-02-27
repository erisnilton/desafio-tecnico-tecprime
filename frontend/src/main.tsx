import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
