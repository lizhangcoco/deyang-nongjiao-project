import { useEffect, useState } from 'react';
import { TrendingUp, Package, AreaChart, Users } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: TrendingUp, value: 128.5, suffix: '亿', label: '累计交易金额' },
  { icon: Package, value: 3256, suffix: '个', label: '累计交易项目' },
  { icon: AreaChart, value: 58.6, suffix: '万亩', label: '累计成交面积' },
  { icon: Users, value: 8500, suffix: '+', label: '服务农户' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const formatted = displayValue >= 1000 
    ? displayValue.toLocaleString('zh-CN', { maximumFractionDigits: 1 })
    : displayValue.toFixed(1);

  return (
    <span>
      {formatted}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-primary py-12 md:py-16 -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
