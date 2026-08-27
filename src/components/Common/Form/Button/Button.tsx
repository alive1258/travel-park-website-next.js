import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'outline',
  className = '',
  type = 'button'
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 inline-flex items-center justify-center";
  
  const variants = {
    primary: "text-white bg-[#6366F1] hover:bg-[#4F46E5]",
    secondary: "text-white bg-[#1A1B1F] hover:bg-[#252528]",
    outline: "text-white bg-transparent border border-[#252528] hover:bg-[#252528]"
  };
  
  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;