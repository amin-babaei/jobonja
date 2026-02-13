import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  register?: UseFormRegisterReturn;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon: customRightIcon,
    clearable = false,
    onClear,
    type = 'text',
    className = '',
    containerClassName = '',
    disabled,
    value: propValue,
    defaultValue,
    onChange,
    placeholder,
    register,
    ...rest
  }, ref) => {
    const isControlled = propValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const value = isControlled ? propValue : internalValue;

    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value != null && value !== '';

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      onClear?.();
      if (!isControlled) {
        setInternalValue('');
      }

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      const event = new Event('input', { bubbles: true });

      if (ref && 'current' in ref && ref.current) {
        nativeInputValueSetter?.call(ref.current, '');
        ref.current.dispatchEvent(event);
      }
    };

    const rightIcon = customRightIcon || (isPassword && (
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShowPassword(prev => !prev)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    ));

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            {...register}
            {...(isControlled
              ? { value: value ?? '' }
              : { defaultValue: defaultValue as string }
            )}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full bg-card border
              ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-100'}
              rounded-md px-3 py-2
              ${leftIcon ? 'pl-10' : 'pl-3'}
              ${rightIcon || (clearable && hasValue && !disabled) ? 'pr-10' : 'pr-3'}
              focus:outline-none focus:ring-2
              ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all
              ${className}
            `.trim()}
            {...rest}
          />

          {(clearable && hasValue && !disabled) || rightIcon ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex">
              {clearable && hasValue && !disabled ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                rightIcon
              )}
            </div>
          ) : null}
        </div>

        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error?.message || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';