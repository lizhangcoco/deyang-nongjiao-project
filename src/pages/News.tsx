import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import NewsCard from '../components/modules/NewsCard';
import news from '../data/news.json';

const categories = ['全部', '交易所动态', '行业资讯', '通知公告'];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredNews = news.filter((item) => {
    if (selectedCategory !== '全部' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">新闻中心</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            了解最新的农村产权交易资讯和交易所动态
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral-dark hover:bg-gray-50 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-neutral">
              共找到 <span className="font-semibold text-primary">{filteredNews.length}</span> 条新闻
            </p>
          </div>

          {/* News Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">暂无符合条件的新闻</h3>
              <p className="text-neutral">请选择其他分类</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
