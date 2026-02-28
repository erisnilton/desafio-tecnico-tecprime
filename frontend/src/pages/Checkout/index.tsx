import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import UiBtn from "../../components/ui/UiBtn";
import UiInput from "../../components/ui/UIInput";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import DefaultLayout from "../../layout/default";
import {
  PaymentMethod as PaymentMethodEnum,
  type CreateOrderInput,
} from "../../services/order/order.model";
import { OrderService } from "../../services/order/orderService";

const checkoutSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  email: z.email("Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  useAuth();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.TICKET,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<CheckoutFormData | null>(
    null,
  );

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      const orderInput: CreateOrderInput = {
        name: data.name,
        email: data.email,
        address: data.address,
        payment_method: paymentMethod,
        products: items.map((item) => ({
          product_id: String(item.product.id),
          quantity: item.quantity,
        })),
        total: totalPrice,
      };

      const response = await OrderService.createOrder(orderInput);

      toast.success(`Pedido realizado com sucesso! Cód: ${response.code}`);
      setSubmittedData(data);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      toast.error("Ocorreu um erro ao processar seu pedido. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess && submittedData) {
    return (
      <DefaultLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="bg--background p-8 rounded-full mb-6">
            <CheckCircle2
              size={64}
              className="fg--success animate-bounce-in"
            />
          </div>
          <h2 className="text-3xl font-bold fg--background-contrast mb-2">
            Pedido Realizado com Sucesso!
          </h2>
          <p className="fg--background-contrast/50 mb-8 max-w-sm">
            Obrigado pela sua compra, <strong>{submittedData.name}</strong>. Um
            e-mail de confirmação foi enviado para {submittedData.email}.
          </p>
          <Link to="/">
            <UiBtn className="bg--primary/80 fg--primary-contrast px-8 py-3 rounded-xl font-bold shadow-lg hover:bg--primary transition-all">
              Voltar para a página inicial
            </UiBtn>
          </Link>
        </div>
      </DefaultLayout>
    );
  }

  if (items.length === 0) {
    return (
      <DefaultLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h2>
          <Link to="/">
            <UiBtn className="bg--primary fg--primary-contrast px-8 py-3 rounded-xl font-bold hover:bg--primary/90 transition-colors">
              Explorar Produtos
            </UiBtn>
          </Link>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg--primary/10 rounded-full transition-colors fg--primary/80 hover:fg--primary"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-display-2 font-extrabold fg--background-contrast">Checkout</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Personal Info */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg--primary p-2 rounded-lg fg--primary-contrast">
                  <CheckCircle2 size={20} />
                </div>
                <h2 className="text-xl font-bold fg--background-contrast">
                  Informações de Entrega
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg--surface p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold fg--surface-constrast mb-2">
                    Nome Completo
                  </label>
                  <UiInput
                    {...register("name")}
                    placeholder="Seu nome completo"
                    error={errors.name?.message}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold fg--surface-contrast mb-2">
                    E-mail
                  </label>
                  <UiInput
                    {...register("email")}
                    type="email"
                    placeholder="seu@email.com"
                    error={errors.email?.message}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold fg--surface-contrast mb-2">
                    Endereço
                  </label>
                  <UiInput
                    {...register("address")}
                    placeholder="Rua, número, complemento"
                    error={errors.address?.message}
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg--primary p-2 rounded-lg fg--background-contrast">
                  <CreditCard size={20} className="fg--primary-contrast" />
                </div>
                <h2 className="text-xl font-bold fg--background-contrast">
                  Forma de Pagamento
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethodEnum.PIX)}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === PaymentMethodEnum.PIX
                      ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                  }`}
                >
                  <QrCode size={32} />
                  <span className="font-bold">Pix</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethodEnum.TICKET)}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === PaymentMethodEnum.TICKET
                      ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                  }`}
                >
                  <FileText size={32} />
                  <span className="font-bold">Boleto</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(PaymentMethodEnum.CREDIT_CARD)
                  }
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    paymentMethod === PaymentMethodEnum.CREDIT_CARD
                      ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                  }`}
                >
                  <CreditCard size={32} />
                  <span className="font-bold">Cartão</span>
                </button>
              </div>

              {paymentMethod === PaymentMethodEnum.CREDIT_CARD && (
                <div className="mt-6 bg--surface p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-2 gap-6 animate-fade-in">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold fg--surface-constrat mb-2">
                      Número do Cartão
                    </label>
                    <UiInput
                      {...register("cardNumber")}
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold fg--surface-constrat mb-2">
                      Validade
                    </label>
                    <UiInput {...register("expiry")} placeholder="MM/AA" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold fg--surface-constrat mb-2">
                      CVV
                    </label>
                    <UiInput {...register("cvv")} placeholder="000" />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg--surface border border-gray-100 p-8 rounded-3xl shadow-xl sticky top-24 space-y-8">
              <h2 className="text-xl font-bold fg--surface-constrat pb-4 border-b border-gray-50">
                Resumo da Compra
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-center"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold fg--surface-constrat truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-400">{item.quantity}x</p>
                    </div>
                    <p className="text-sm font-bold fg--surface-constrat">
                      {(item.product.price * item.quantity).toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" },
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex justify-between fg--surface-constrat text-sm">
                  <span>Subtotal ({totalItems} itens)</span>
                  <span>
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between fg--surface-constrat text-xl font-black pt-2">
                  <span>Total</span>
                  <span>
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>

              <UiBtn
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 bg--primary fg--primary-contrast hover:bg--primary/90 shadow-lg"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={22} />
                    Confirmar Pagamento
                  </>
                )}
              </UiBtn>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
                Ambiente 100% seguro e criptografado
              </p>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
