import { clsx } from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
  return (
    <div className={clsx('mb-10', align === 'center' && 'text-center', className)}>
      <h2 className="text-3xl font-bold text-neutral-dark mb-3">{title}</h2>
      {subtitle && (
        <p className="text-neutral text-lg">{subtitle}</p>
      )}
      <div className={clsx(
        'mt-4 w-20 h-1 bg-accent rounded-full',
        align === 'center' && 'mx-auto'
      )} />
    </div>
  );
}
