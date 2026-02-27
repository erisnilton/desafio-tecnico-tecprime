import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon: Icon, ...props }, ref) => {
    return (
      <div className={className}>
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-4 text-gray-400 z-10">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            className={`flex w-full items-center gap-2 py-2.5 bg-gray-50 border rounded-xl outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 ${
              Icon ? "pl-12 pr-4" : "px-4"
            } ${
              error
                ? "border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
            }`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-bold text-red-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
