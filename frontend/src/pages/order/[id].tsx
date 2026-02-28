import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import DefaultLayout from "../../layout/default";
import type { OrderResponse } from "../../services/order/order.model";
import { OrderService } from "../../services/order/orderService";


export default function OrderById() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await OrderService.findOrderById(id!);
        setOrder(data);
      } catch (error) {
        toast.error("Erro ao buscar pedido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return "bg--warning";
      case "COMPLETED":
        return "bg--success";
      case "CANCELLED":
        return "bg--danger";
      default:
        return "bg--primary";
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
              Detalhes do Pedido
            </h1>
            <p className="fg--background-contrast/70 mt-4 text-lg max-w-2xl leading-relaxed">
              Visualize as informações completas desta compra.
            </p>
          </div>
          {order && (
            <span
              className={`self-start md:self-end text-sm font-semibold text-white px-3 py-1.5 rounded-lg ${getStatusColor(order.status)}`}
            >
              {getStatusText(order.status)}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {order && (
              <div key={order.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 bg--surface border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide fg--background-contrast/50 mb-2">
                      Pedido #{order.code}
                    </p>
                    <h2 className="text-2xl font-bold fg--background-contrast">
                      {order.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg--surface-secondary/40 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs uppercase tracking-wide fg--background-contrast/50 mb-1">
                        E-mail
                      </p>
                      <p className="font-medium fg--background-contrast break-all">
                        {order.email}
                      </p>
                    </div>
                    <div className="bg--surface-secondary/40 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs uppercase tracking-wide fg--background-contrast/50 mb-1">
                        Forma de pagamento
                      </p>
                      <p className="font-medium fg--background-contrast">
                        {getPaymentMethodText(order.payment_method)}
                      </p>
                    </div>
                    <div className="md:col-span-2 bg--surface-secondary/40 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs uppercase tracking-wide fg--background-contrast/50 mb-1">
                        Endereço
                      </p>
                      <p className="font-medium fg--background-contrast">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </section>

                <aside className="bg--surface border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5 h-fit">
                  <h3 className="text-lg font-bold fg--background-contrast">
                    Resumo
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="fg--background-contrast/60">Criado em</span>
                      <span className="font-medium fg--background-contrast text-right">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="fg--background-contrast/60">Atualizado em</span>
                      <span className="font-medium fg--background-contrast text-right">
                        {formatDate(order.updated_at)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm fg--background-contrast/60 mb-1">Total do pedido</p>
                    <p className="text-3xl font-black fg--background-contrast">
                      {formatCurrency(order.total)}
                    </p>
                  </div>

                  <Link
                    to="/order"
                    className="block w-full text-center bg--primary/10 fg--primary px-6 py-2.5 rounded-xl font-semibold hover:bg--primary/20 transition-colors"
                  >
                    Voltar para pedidos
                  </Link>
                </aside>
              </div>
            )}
          </>
        )}

        {!isLoading && !order && (
          <div className="text-center py-16 bg--surface rounded-2xl border border-dashed border-gray-200">
            <p className="fg--background-contrast/70 font-medium mb-4">
              Pedido não encontrado.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center justify-center bg--primary/10 fg--primary px-6 py-2.5 rounded-xl font-semibold hover:bg--primary/20 transition-colors"
            >
              Voltar para pedidos
            </Link>
          </div>
        )}
            </div>
    </DefaultLayout>
  );
}