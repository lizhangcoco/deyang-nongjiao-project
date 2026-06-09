import { useParams, Link } from 'react-router-dom';
import { MapPin, Scale, Coins, Phone, Calendar, ArrowLeft, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import projects from '../data/projects.json';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">项目不存在</h2>
          <Link to="/projects">
            <Button>返回项目列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = {
    '招拍中': 'bg-green-100 text-green-700',
    '已成交': 'bg-gray-100 text-gray-600',
    '已下架': 'bg-red-100 text-red-600',
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('zh-CN');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            to="/projects"
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回项目列表
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                  statusColor[project.status as keyof typeof statusColor] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {project.status}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shrink-0">
              申请交易
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card>
                <div className="aspect-video">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Card>

              {/* Project Info */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold text-neutral-dark">项目详情</h2>
                </Card.Header>
                <Card.Body>
                  <p className="text-neutral leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </Card.Body>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold text-neutral-dark">项目信息</h2>
                </Card.Header>
                <Card.Body className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">项目位置</div>
                      <div className="text-neutral-dark font-medium">{project.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">项目面积</div>
                      <div className="text-neutral-dark font-medium">{project.area} 亩</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coins className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">挂牌价格</div>
                      <div className="text-accent text-xl font-bold">{formatPrice(project.price)} 元</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">发布时间</div>
                      <div className="text-neutral-dark font-medium">{project.publishDate}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Contact */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold text-neutral-dark">联系方式</h2>
                </Card.Header>
                <Card.Body className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{project.contact.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">联系人</div>
                      <div className="text-neutral-dark font-medium">{project.contact.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-gray-500">联系电话</div>
                      <div className="text-neutral-dark font-medium">{project.contact.phone}</div>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    电话咨询
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    在线留言
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
