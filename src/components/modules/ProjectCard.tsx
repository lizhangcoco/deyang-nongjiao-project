import { Link } from 'react-router-dom';
import { MapPin, Scale, Coins } from 'lucide-react';
import Card from '../common/Card';
import { clsx } from 'clsx';

interface Project {
  id: string;
  title: string;
  type: string;
  area: number;
  price: number;
  location: string;
  district: string;
  status: string;
  images: string[];
  publishDate: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000) {
      return `${(price / 10000).toFixed(0)}万`;
    }
    return price.toLocaleString();
  };

  const statusColor = {
    '招拍中': 'bg-green-100 text-green-700',
    '已成交': 'bg-gray-100 text-gray-600',
    '已下架': 'bg-red-100 text-red-600',
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <span
            className={clsx(
              'absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium',
              statusColor[project.status as keyof typeof statusColor] || 'bg-gray-100 text-gray-600'
            )}
          >
            {project.status}
          </span>
          <span className="absolute bottom-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs">
            {project.type}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-neutral-dark mb-3 line-clamp-2 hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="space-y-2 text-sm text-neutral mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="truncate">{project.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Scale className="w-4 h-4 text-primary-400" />
                <span>{project.area}亩</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">{formatPrice(project.price)}元</span>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400">
            发布时间：{project.publishDate}
          </div>
        </div>
      </Card>
    </Link>
  );
}
