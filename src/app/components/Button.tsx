
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'lg' | 'md' | 'sm';
}

export const Button: React.FC<ButtonProps> = ({ children, className, size = 'md', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg transition duration-150";
  const sizeClasses = size === 'lg' ? "px-6 py-3 text-lg" : size === 'sm' ? "px-2 py-1 text-sm" : "px-4 py-2 text-base";

  return (
    <button className={`${baseClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
