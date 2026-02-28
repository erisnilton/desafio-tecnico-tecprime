import "@unocss/reset/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "virtual:uno.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const savedTheme = (() => {
  const theme = localStorage.getItem("theme");
  return theme === "\"dark\"" || theme === "dark" ? "dark" : "light";
})();

document.body.classList.remove("theme-light", "theme-dark");
document.body.classList.add(savedTheme === "dark" ? "theme-dark" : "theme-light");

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
