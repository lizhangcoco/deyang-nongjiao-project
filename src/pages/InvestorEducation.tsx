import { useState } from 'react';
import { BookOpen, FileText, GraduationCap, AlertTriangle, TrendingUp, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';
import educationData from '../data/investorEducation.json';

const categories = ['全部', '基础知识', '政策解读', '实务指南', '风险防范', '融资服务', '投资分析'];

const categoryIcons: Record<string, React.ElementType> = {
  '基础知识': BookOpen,
  '政策解读': FileText,
  '实务指南': GraduationCap,
  '风险防范': AlertTriangle,
  '融资服务': TrendingUp,
  '投资分析': HelpCircle,
};

export default function InvestorEducation() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles = selectedCategory === '全部'
    ? educationData
    : educationData.filter((item) => item.category === selectedCategory);

  const currentArticle = selectedArticle
    ? educationData.find((item) => item.id === selectedArticle)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <GraduationCap className="w-5 h-5 text-accent" />
            <span className="text-white/90 text-sm">投资者教育专栏</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">投资者教育</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            普及农村产权交易知识，帮助投资者了解市场规则，把握投资机遇
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || FileText;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedArticle(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white text-neutral-dark hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article List */}
            <div className="lg:col-span-1 space-y-4">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  hover
                  onClick={() => setSelectedArticle(article.id)}
                  className={`cursor-pointer transition-all ${
                    selectedArticle === article.id
                      ? 'ring-2 ring-primary shadow-card-hover'
                      : 'hover:shadow-card-hover'
                  }`}
                >
                  <Card.Body className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {(() => {
                        const Icon = categoryIcons[article.category] || FileText;
                        return <Icon className="w-5 h-5 text-primary" />;
                      })()}
                      <span className="text-xs font-medium text-primary bg-primary-50 px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-neutral-dark mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-neutral line-clamp-2">{article.summary}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* Article Detail */}
            <div className="lg:col-span-2">
              {currentArticle ? (
                <Card className="h-full">
                  <Card.Header className="bg-primary-50 border-b-0">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = categoryIcons[currentArticle.category] || FileText;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                      <span className="text-sm font-medium text-primary bg-white px-3 py-1 rounded-full">
                        {currentArticle.category}
                      </span>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-8">
                    <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                      {currentArticle.title}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      {currentArticle.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-neutral leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-dark mb-2">选择一篇文章</h3>
                    <p className="text-neutral">点击左侧文章列表查看详细内容</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="教育服务" subtitle="全方位的投资者教育服务" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">知识普及</h3>
              <p className="text-neutral">提供农村产权交易基础知识，帮助投资者了解市场规则</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent/20">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">培训课程</h3>
              <p className="text-neutral">定期举办专题培训，提升投资者专业能力</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-secondary/20">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">咨询服务</h3>
              <p className="text-neutral">专业团队提供一对一咨询，解答投资疑问</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
