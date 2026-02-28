import DefaultLayout from "../../layout/default";
import { useCart } from "../../contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import UiBtn from "../../components/ui/UiBtn";
import { useAuth } from "../../contexts/AuthContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } =
    useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  if (!isAuthenticated) return null;

  if (items.length === 0) {
    return (
      <DefaultLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="bg--primary/60 p-8 rounded-full mb-6">
            <ShoppingBag size={64} className="fg--primary-contrast" />
          </div>
          <h2 className="title-display-2 font-bold fg--background-contrast mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="fg--background-contrast mb-8 max-w-sm">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
            Que tal explorar nossas ofertas?
          </p>
          <Link to="/">
            <UiBtn className="bg--primary px-8 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2">
              <ArrowLeft size={18} />
              Voltar para a loja
            </UiBtn>
          </Link>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="title-display-2 font-extrabold fg--background-contrast mb-8">
          Meu Carrinho
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg--surface border border-gray-100 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-gray-50">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold fg--background-contrast text-lg mb-1">
                    {item.product.title}
                  </h3>
                  <p className="text-sm fg--background-contrast mb-2">
                    {item.product.category}
                  </p>
                  <p className="fg--primary font-bold">
                    {item.product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="flex items-center bg--surface-secondary p-1 rounded-xl border border-gray-100">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="p-2 fg--background-contrast hover:fg--primary hover:bg--surface-secondary rounded-lg transition-all active:scale-90"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold fg--background-contrast">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="p-2 fg--background-contrast hover:fg--primary hover:bg--surface-secondary rounded-lg transition-all active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="sm:ml-4 text-right hidden sm:block">
                  <p className="text-sm fg--background-contrast mb-1">Subtotal</p>
                  <p className="font-bold fg--background-contrast">
                    {(item.product.price * item.quantity).toLocaleString(
                      "pt-BR",
                      { style: "currency", currency: "BRL" },
                    )}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 fg--background-contrast hover:fg--primary hover:bg--surface-secondary rounded-full hover:bg-red-50 transition-all sm:ml-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg--surface border border-gray-100 p-6 rounded-3xl shadow-lg sticky top-24">
              <h2 className="text-xl font-bold fg--background-contrast mb-6 pb-4 border-b border-gray-50">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between fg--background-contrast">
                  <span>Itens ({totalItems})</span>
                  <span>
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-50">
                <span className="fg--background-contrast font-bold">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-black fg--primary">
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              <Link to="/checkout" className="block w-full">
                <UiBtn className="w-full bg--primary py-4 rounded-2xl font-bold text-lg hover:bg--primary/80 hover:fg--primary-contrast transition-colors">
                  Finalizar Compra
                </UiBtn>
              </Link>

              <Link
                to="/"
                className="block text-center mt-6 text-sm font-bold fg--background-contrast hover:fg--primary hover:bg--surface-secondary transition-colors"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
