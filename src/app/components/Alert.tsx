type AlertProps = {
    variant?: 'destructive';
    children: React.ReactNode;
  };
  
  export const Alert: React.FC<AlertProps> = ({ variant, children }) => {
    const baseClasses = 'p-4 rounded-lg';
    const variantClasses = variant === 'destructive' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-100';
  
    return (
      <div className={`${baseClasses} ${variantClasses}`}>
        {children}
      </div>
    );
  };
  