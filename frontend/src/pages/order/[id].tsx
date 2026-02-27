import DefaultLayout from "../../layout/default";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderService } from "../../services/order/orderService";
import type { OrderResponse } from "../../services/order/order.model";
import { toast } from "sonner";


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
    return (
        <DefaultLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 border-b border-gray-100 pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Detalhes do Pedido
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl leading-relaxed">
              Confira o status do seu pedido
            </p>
          </div>
        </div>
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[40vh]">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {order && (
                            <div
                                key={order.id}
                                className="w-full"
                            >
                                <div className="font-bold text-lg bg-gray-100 text-gray-900 p-2 rounded-md">Nome: {order.name}</div>
                                <div className="font-bold text-lg bg-gray-100 text-gray-900 p-2 rounded-md">Status: {getStatusText(order.status)}</div>
                                <div className="font-bold text-lg bg-gray-100 text-gray-900 p-2 rounded-md">Método de pagamento: {getPaymentMethodText(order.payment_method)}</div>
                                <div className="font-bold text-lg bg-gray-100 text-gray-900 p-2 rounded-md">Total: {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(order.total))}</div>

                                <Link to="/order" className="bg-blue-100 px-6 py-2 rounded-md w-full text-center mt-4 text-blue-600">Voltar</Link>
                            </div>
                            
                        )}
                    </>
                )}
            </div>
        </DefaultLayout>
    );
}