import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, ArrowLeft, Store } from "lucide-react";
import BlankLayout from "../../layout/blank";
import UiBtn from "../../components/ui/UiBtn";
import UiInput from "../../components/ui/UIInput";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const loginSchema = z.object({
  username: z.string().min(1, "O usuário é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlankLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Voltar para a loja
            </Link>
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 mx-auto mb-6">
              <Store size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-500 mt-2">
              Entre com suas credenciais para continuar.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Usuário
                </label>
                <UiInput
                  {...register("username")}
                  icon={User}
                  placeholder="Seu nome de usuário"
                  error={errors.username?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Senha
                </label>
                <UiInput
                  {...register("password")}
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>

              <UiBtn
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Entrar na conta"
                )}
              </UiBtn>
            </form>
          </div>
        </div>
      </div>
    </BlankLayout>
  );
}
