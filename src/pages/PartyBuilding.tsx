import { useState } from 'react';
import { BookOpen, Flag, Users, Award, Shield, Calendar } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';
import partyBuildingData from '../data/partyBuilding.json';

const categories = ['全部', '理论学习', '重要会议', '主题活动', '党建业务', '廉政建设', '组织建设'];

const categoryIcons: Record<string, React.ElementType> = {
  '理论学习': BookOpen,
  '重要会议': Calendar,
  '主题活动': Flag,
  '党建业务': Users,
  '廉政建设': Shield,
  '组织建设': Award,
};

export default function PartyBuilding() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles = selectedCategory === '全部'
    ? partyBuildingData
    : partyBuildingData.filter((item) => item.category === selectedCategory);

  const currentArticle = selectedArticle
    ? partyBuildingData.find((item) => item.id === selectedArticle)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Flag className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 text-sm">党的建设专栏</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">党的建设</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            坚持党的领导，加强党的建设，以高质量党建引领高质量发展
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <div className="text-white/70 text-sm">党员覆盖率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-white/70 text-sm">主题党日活动</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">12</div>
              <div className="text-white/70 text-sm">党建工作制度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">5</div>
              <div className="text-white/70 text-sm">党员示范岗</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedArticle(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
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
                      ? 'ring-2 ring-red-600 shadow-card-hover'
                      : 'hover:shadow-card-hover'
                  }`}
                >
                  <Card.Body className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {(() => {
                        const Icon = categoryIcons[article.category] || BookOpen;
                        return <Icon className="w-5 h-5 text-red-600" />;
                      })()}
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
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
                  <Card.Header className="bg-red-50 border-b-0">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = categoryIcons[currentArticle.category] || BookOpen;
                        return <Icon className="w-6 h-6 text-red-600" />;
                      })()}
                      <span className="text-sm font-medium text-red-600 bg-white px-3 py-1 rounded-full">
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
                    <Flag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
          <SectionTitle title="党建工作" subtitle="扎实推进新时代党的建设新的伟大工程" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-600/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">理论武装</h3>
              <p className="text-neutral">深入学习贯彻习近平新时代中国特色社会主义思想</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-600/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">组织建设</h3>
              <p className="text-neutral">加强党组织建设，提升组织力和战斗力</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-600/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">廉政建设</h3>
              <p className="text-neutral">加强党风廉政建设，营造风清气正的政治生态</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
