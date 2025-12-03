'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed display-font uppercase tracking-wide";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent shadow-[4px_4px_0px_0px_var(--shadow-primary)] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_var(--shadow-primary)] active:shadow-none active:translate-y-[4px] rounded-md",
    secondary: "bg-foreground text-background hover:bg-foreground/90 border border-transparent rounded-md",
    outline: "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground/5 rounded-md",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-8 py-3",
    icon: "h-10 w-10 p-2 flex items-center justify-center"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
