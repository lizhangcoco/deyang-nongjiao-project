import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';

const contactInfo = [
  {
    icon: Phone,
    title: '联系电话',
    content: '028-86567890',
    subtitle: '工作日 9:00-17:00',
  },
  {
    icon: Mail,
    title: '电子邮箱',
    content: 'info@cdncq.cn',
    subtitle: '24小时内回复',
  },
  {
    icon: MapPin,
    title: '办公地址',
    content: '四川省成都市武侯区武侯大道顺江段77号',
    subtitle: '点击查看地图',
  },
  {
    icon: Clock,
    title: '办公时间',
    content: '周一至周五 9:00-17:00',
    subtitle: '节假日除外',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">联系我们</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            如有任何疑问或建议，欢迎随时与我们联系
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-neutral-dark mb-1">{info.title}</h3>
                <p className="text-primary font-medium mb-1">{info.content}</p>
                <p className="text-xs text-gray-400">{info.subtitle}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <SectionTitle
                title="在线留言"
                subtitle="我们期待听到您的声音"
                align="left"
              />
              {submitted ? (
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">留言成功！</h3>
                  <p className="text-neutral mb-4">感谢您的留言，我们会在24小时内与您联系</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    继续留言
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="姓名"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="请输入您的姓名"
                    required
                  />
                  <Input
                    label="联系电话"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="请输入您的联系电话"
                    required
                  />
                  <Input
                    label="电子邮箱"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入您的邮箱地址"
                    required
                  />
                  <Input
                    label="留言主题"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="请输入留言主题"
                    required
                  />
                  <Textarea
                    label="留言内容"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="请输入您的留言内容..."
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '提交中...' : '提交留言'}
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <SectionTitle
                title="地理位置"
                subtitle="欢迎到访我们的办公地点"
                align="left"
              />
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                    alt="办公地点"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-neutral-dark">成都农村产权交易所</p>
                      <p className="text-sm text-gray-500">点击查看完整地图</p>
                    </div>
                  </div>
                </div>
                <Card.Body>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-neutral-dark">详细地址</div>
                        <div className="text-neutral text-sm">四川省成都市武侯区武侯大道顺江段77号</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-neutral-dark">导航搜索</div>
                        <div className="text-neutral text-sm">可使用高德地图或百度地图搜索\"成都农村产权交易所\"</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
