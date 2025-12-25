import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-muted text-white',
  danger: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
};


export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        relative flex items-center justify-center gap-2 px-4 py-2 shadow-md rounded-md font-medium transition disabled:opacity-50
        ${variantClasses[variant]}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `.trim()}
      {...rest}
    >
      {loading && (
        <Loader2 className="w-5 h-5 animate-spin absolute left-4" />
      )}

      {children}

      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};