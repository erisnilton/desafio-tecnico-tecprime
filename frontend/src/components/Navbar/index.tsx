import { LogOut, Menu, Search, ShoppingCart, Store, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import UiInput from "../ui/UIInput";
import UiAvatar from "../ui/UiAvatar";
import UiBtn from "../ui/UiBtn";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log(user);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <div className="bg-blue-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors shadow-sm">
              <Store size={22} />
            </div>
            <span className="text-gray-900 font-bold text-xl tracking-tight hidden md:block">
              Sua Loja
            </span>
          </Link>

          {/* Search Bar - Desktop and Tablet (>= md) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <UiInput placeholder="Buscar na loja..." type="text" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>
          </div>

          {/* Actions: Cart, Profile (Desktop), Menu (Mobile) */}
          <div className="flex items-center gap-1 md:gap-3">
        
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all cursor-pointer group active:scale-90"
            >
              <ShoppingCart
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </Link>
                  <Link
              to="/order"
              className="font-medium text-gray-600 hover:text-primary transition-colors py-2"
            >
              Minhas Compras
            </Link>

            {/* Avatar / Login - Visible on tablet and desktop (>= sm or md) */}
            {user ? (
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UiAvatar
                    className="w-10 h-10 rounded-full border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                    src={
                      user.picture_url || "https://github.com/placeholder.png"
                    }
                  />
                  <span className="text-base font-semibold text-gray-700 tracking-wider">
                    {user.full_name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
                  title="Sair"
                >
                  <LogOut
                    size={20}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <UiBtn className="hidden sm:flex bg-blue-600 hover:text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                  Entrar
                </UiBtn>
              </Link>
            )}

            {/* Menu Toggle - Mobile Only (< md) */}
            <UiBtn
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </UiBtn>
          </div>
        </div>

        {/* Mobile Search Row - Visible only on small/medium screens (< md) */}
        <div className="pb-4 md:hidden">
          <div className="relative w-full">
            <UiInput placeholder="Buscar na loja..." type="text" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-down p-4">
          <div className="flex flex-col gap-3">
            <Link
              to="/order"
              className="font-medium text-gray-600 hover:text-primary transition-colors py-2"
            >
              Minhas Compras
            </Link>
            {user ? (
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UiAvatar
                    className="w-8 h-8 rounded-full"
                    src={
                      user.picture_url || "https://github.com/placeholder.png"
                    }
                  />
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    {user.full_name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-50">
                <UiBtn className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold shadow-md">
                  Entrar
                </UiBtn>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
