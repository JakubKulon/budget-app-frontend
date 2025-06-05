import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, type = "button", ...props }: ButtonProps) {
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
}
