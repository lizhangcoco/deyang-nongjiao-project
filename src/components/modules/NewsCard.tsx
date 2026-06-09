import { Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import Card from '../common/Card';

interface News {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  views: number;
}

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const categoryColors: Record<string, string> = {
    '交易所动态': 'bg-primary-100 text-primary',
    '通知公告': 'bg-accent-100 text-accent-600',
    '行业资讯': 'bg-secondary-100 text-secondary',
  };

  return (
    <Link to={`/news/${news.id}`}>
      <Card hover className="h-full flex flex-col p-5">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[news.category] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {news.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {news.publishDate}
          </div>
        </div>
        <h3 className="font-semibold text-neutral-dark mb-3 line-clamp-2 hover:text-primary transition-colors flex-1">
          {news.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>{news.author}</span>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {news.views}
          </div>
        </div>
      </Card>
    </Link>
  );
}
