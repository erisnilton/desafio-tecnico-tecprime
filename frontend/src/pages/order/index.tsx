import DefaultLayout from "../../layout/default";
import { useEffect, useState } from "react";
import { OrderService } from "../../services/order/orderService";
import type { OrderResponse } from "../../services/order/order.model";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.findAllOrders();
        setOrders(data);
      } catch (error) {
        toast.error("Erro ao buscar pedidos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  function getColorByStatus(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-600";
      case "COMPLETED":
        return "bg-green-600";
      case "CANCELLED":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "COMPLETED":
        return "Concluído";
      case "CANCELLED":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  }

  function getPaymentMethodText(payment_method: string) {
    switch (payment_method) {
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "PIX":
        return "Pix";
      case "TICKET":
        return "Boleto";
      default:
        return "Desconhecido";
    }
  }

  function getPaymentMethodColor(payment_method: string) {
    switch (payment_method) {
      case "CREDIT_CARD":
        return "bg-blue-600";
      case "PIX":
        return "bg-green-600";
      case "TICKET":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 border-b border-gray-100 pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Meus Pedidos
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl leading-relaxed">
              Confira o status dos seus pedidos
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white grid grid-cols-2 gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                  <h3 className="text-lg font-bold text-gray-900">
                    {order.name}
                  </h3>
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className={`text-sm font-medium text-white px-2 py-1 rounded-md ${getPaymentMethodColor(order.payment_method)}`}>
                    {getPaymentMethodText(order.payment_method)}
                  </span>
                  <span className={`text-sm font-medium text-white px-2 py-1 rounded-md ${getColorByStatus(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-md font-bold text-gray-900">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(order.total))}
                  </span>
                </div>
                <Link className="bg-blue-100 px-2 py-1 rounded-md w-full text-center" to={`/order/${order.id}`}>Ver</Link>
              </div>
            ))}
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              Nenhum pedido encontrado.
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
