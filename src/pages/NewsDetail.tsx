import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, User } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import news from '../data/news.json';

export default function NewsDetail() {
  const { id } = useParams();
  const item = news.find((n) => n.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">新闻不存在</h2>
          <Link to="/news">
            <Button>返回新闻列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    '交易所动态': 'bg-primary-100 text-primary',
    '通知公告': 'bg-accent-100 text-accent-600',
    '行业资讯': 'bg-secondary-100 text-secondary',
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/news"
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回新闻列表
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                categoryColors[item.category] || 'bg-gray-100 text-gray-600'
              }`}
            >
              {item.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{item.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="p-8">
            {/* Meta */}
            <div className="flex items-center gap-6 pb-6 mb-6 border-b border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {item.publishDate}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {item.author}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {item.views} 次阅读
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-neutral leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">分享到：</span>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    微信
                  </button>
                  <button className="w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                    微博
                  </button>
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    QQ
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
