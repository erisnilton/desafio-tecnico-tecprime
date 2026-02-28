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
    <div className=" group bg--background border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg--surface backdrop-blur-sm fg--primary text-xs font-bold px-2 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="fg--primary font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="fg--background-contrast/50 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
              Preço
            </span>
            <span className="text-xl font-bold fg--primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <UiBtn
            onClick={() => addToCart(product)}
            className="w-full py-3 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <ShoppingCart size={18} />
            Adicionar ao carrinho
          </UiBtn>
        </div>
      </div>
    </div>
  );
}
