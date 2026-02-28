import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DefaultLayout from "../../layout/default";
import type { OrderResponse } from "../../services/order/order.model";
import { OrderService } from "../../services/order/orderService";

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

  function formatCurrency(value: string) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 border-b border-gray-100 pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold fg--background-contrast leading-tight">
              Meus Pedidos
            </h1>
            <p className="fg--background-contrast/70 mt-4 text-lg max-w-2xl leading-relaxed">
              Acompanhe o status e os detalhes de cada compra.
            </p>
          </div>
          {!isLoading && (
            <div className="bg--surface border border-gray-100 rounded-xl px-4 py-3 shadow-sm self-start md:self-end">
              <p className="text-xs uppercase tracking-wide fg--background-contrast/60">
                Total
              </p>
              <p className="text-xl font-bold fg--background-contrast">
                {orders.length} pedido{orders.length === 1 ? "" : "s"}
              </p>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg--surface rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide fg--background-contrast/50 mb-2">
                    Pedido #{order.code}
                  </p>
                  <h3 className="text-lg font-bold fg--background-contrast line-clamp-2">
                    {order.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-semibold text-white px-2.5 py-1 rounded-md ${getPaymentMethodColor(order.payment_method)}`}
                  >
                    {getPaymentMethodText(order.payment_method)}
                  </span>
                  <span
                    className={`text-xs font-semibold text-white px-2.5 py-1 rounded-md ${getColorByStatus(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="fg--background-contrast/60">Data</span>
                    <span className="font-medium fg--background-contrast">
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="fg--background-contrast/60">Total</span>
                    <span className="text-lg font-bold fg--background-contrast">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                <Link
                  className="mt-auto w-full text-center bg--primary/10 fg--primary font-semibold px-4 py-2.5 rounded-xl hover:bg--primary/20 transition-colors"
                  to={`/order/${order.id}`}
                >
                  Ver detalhes
                </Link>
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
