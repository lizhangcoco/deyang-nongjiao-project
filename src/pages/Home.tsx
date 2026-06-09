import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Building2, Sparkles } from 'lucide-react';
import HeroCarousel from '../components/modules/HeroCarousel';
import StatsCounter from '../components/modules/StatsCounter';
import ProjectCard from '../components/modules/ProjectCard';
import NewsCard from '../components/modules/NewsCard';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import projects from '../data/projects.json';
import news from '../data/news.json';

export default function Home() {
  const featuredProjects = projects.filter(p => p.status === '招拍中').slice(0, 4);
  const latestNews = news.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Featured Projects */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="推荐项目"
            subtitle="精选优质产权项目，助您把握乡村发展机遇"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                查看更多项目
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="我们的服务"
            subtitle="专业、高效、便捷的农村产权交易服务"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">平台服务</h3>
              <p className="text-neutral">提供农村产权流转交易、信息发布、鉴证登记等一站式服务</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-accent-50 hover:bg-accent-100 transition-colors">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">价值发现</h3>
              <p className="text-neutral">专业评估体系，发现农村产权真实价值，实现资源优化配置</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-5">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3">合规保障</h3>
              <p className="text-neutral">规范交易流程，保障各方权益，防范交易风险</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="新闻动态"
            subtitle="了解最新的农村产权交易资讯"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/news">
              <Button variant="outline" size="lg">
                查看更多新闻
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            开启您的农村产权交易之旅
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            我们提供专业的交易服务和指导，帮助您安全、便捷地完成农村产权交易
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                浏览交易项目
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                联系我们
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
