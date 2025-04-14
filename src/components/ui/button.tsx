import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "default",
  size = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2 rounded-md",
    sm: "h-8 px-3 text-sm rounded-md",
    lg: "h-12 px-6 rounded-md",
    icon: "h-9 w-9 rounded-md"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 