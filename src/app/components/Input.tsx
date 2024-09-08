import { InputHTMLAttributes } from "react"

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`block w-full border border-gray-300 rounded-lg p-2 ${className}`}
      {...props}
    />
  );
};
