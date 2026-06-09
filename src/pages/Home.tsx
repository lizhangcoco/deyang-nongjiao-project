import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Building2, Shield, Award, Flag, GraduationCap } from 'lucide-react';
import HeroCarousel from '../components/modules/HeroCarousel';
import StatsCounter from '../components/modules/StatsCounter';
import ProjectCard from '../components/modules/ProjectCard';
import NewsCard from '../components/modules/NewsCard';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import projects from '../data/projects.json';
import news from '../data/news.json';

export default function Home() {
  const featuredProjects = projects.filter(p => p.status === '招拍中').slice(0, 6);
  const latestNews = news.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Party Building Banner */}
      <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Flag className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-medium">党建引领 · 乡村振兴</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/party-building" className="text-white/90 hover:text-white text-sm flex items-center gap-2">
                <span>党的建设</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/investor-education" className="text-white/90 hover:text-white text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>投资者教育</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="重点项目推荐"
            subtitle="精选优质产权项目，助您把握乡村发展机遇"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" size="lg" className="border-2 border-primary">
                查看全部项目
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Premium Version */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="国企品质 · 专业服务"
            subtitle="值得信赖的农村产权交易平台"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">权威平台</h3>
              <p className="text-gray-400 text-center">经成都市人民政府批准成立，国企背景，信誉保障</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-500/20 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">合规保障</h3>
              <p className="text-gray-400 text-center">严格遵守法律法规，确保交易公平公正公开</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">专业服务</h3>
              <p className="text-gray-400 text-center">专业团队提供一站式交易服务和咨询指导</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">卓越品质</h3>
              <p className="text-gray-400 text-center">多年行业经验，屡获殊荣，值得信赖</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <SectionTitle
                title="新闻动态"
                subtitle="了解最新的农村产权交易资讯"
                align="left"
              />
            </div>
            <Link to="/news">
              <Button variant="ghost" className="text-primary hover:text-primary-700">
                查看更多新闻
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="快速服务"
            subtitle="便捷访问各类服务入口"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { path: '/projects', label: '交易项目', icon: Building2 },
              { path: '/guide', label: '交易指南', icon: FileText },
              { path: '/policies', label: '政策法规', icon: Shield },
              { path: '/investor-education', label: '投资者教育', icon: GraduationCap },
              { path: '/party-building', label: '党的建设', icon: Flag },
              { path: '/news', label: '新闻中心', icon: FileText },
              { path: '/about', label: '关于我们', icon: Building2 },
              { path: '/contact', label: '联系我们', icon: Shield },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group flex flex-col items-center p-4 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <link.icon className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                <span className="text-sm text-gray-600 group-hover:text-primary font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            携手共进 · 共创乡村振兴新篇章
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            成都农村产权交易所作为国有企业，始终坚持服务三农、激活资源、促进发展的宗旨，为乡村振兴贡献力量
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
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
