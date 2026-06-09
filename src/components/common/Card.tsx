import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-lg shadow-card overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('p-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('p-4', className)}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('p-4 border-t border-gray-100 bg-gray-50', className)}>
      {children}
    </div>
  );
};
