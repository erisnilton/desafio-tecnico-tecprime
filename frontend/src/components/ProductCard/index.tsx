import { ShoppingCart } from "lucide-react";
import UiBtn from "../ui/UiBtn";
import { useCart } from "../../contexts/CartContext";
import type { Product } from "../../services/product/product.model";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              Preço
            </span>
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <UiBtn
            onClick={() => addToCart(product)}
            className="bg-blue-600 w-full py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Adicionar ao carrinho
          </UiBtn>
        </div>
      </div>
    </div>
  );
}
