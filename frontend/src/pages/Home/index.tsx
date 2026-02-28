import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useSearch } from "../../contexts/SearchContext";
import DefaultLayout from "../../layout/default";
import type { Product } from "../../services/product/product.model";
import { ProductService } from "../../services/product/productService";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm) ||
        product.category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [products, searchTerm]);

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 border-b border-gray-100 pb-8">
          <div className="flex-1">
            <h2 className="fg--primary font-bold text-sm uppercase tracking-widest mb-2">
              Novidades
            </h2>
            <h1 className="text-3xl md:text-5xl font-extrabold fg--background-contrast leading-tight">
              Produtos em Destaque
            </h1>
            <p className="fg--background-contrast mt-4 text-lg max-w-2xl leading-relaxed">
              Confira nossa seleção exclusiva.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">
              Filtrar por:
            </span>
            <select className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
              <option>Mais recentes</option>
              <option>Preço (Menor-Maior)</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 ">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              Nenhum produto encontrado.
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
