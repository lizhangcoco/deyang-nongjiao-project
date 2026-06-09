import { Award, Users, Clock, Target } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

const stats = [
  { icon: Target, value: '2012', label: '成立时间' },
  { icon: Award, value: '100亿+', label: '累计交易额' },
  { icon: Users, value: '8500+', label: '服务农户' },
  { icon: Clock, value: '12年', label: '行业经验' },
];

const timeline = [
  { year: '2012', event: '成都农村产权交易所正式成立' },
  { year: '2015', event: '建成市-区-乡三级服务体系' },
  { year: '2018', event: '交易规模突破50亿元' },
  { year: '2020', event: '开通线上交易平台' },
  { year: '2023', event: '交易规模突破100亿元' },
];

const honors = [
  { title: '全省农业农村改革工作先进单位', year: '2023' },
  { title: '成都市文明单位', year: '2022' },
  { title: '四川省农村产权流转交易示范平台', year: '2021' },
  { title: '全国农村产权交易市场规范化建设试点', year: '2020' },
];

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">关于我们</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            成都农村产权交易所是经成都市人民政府批准成立的农村产权流转交易服务平台
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-neutral text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-dark mb-6">交易所简介</h2>
              <div className="space-y-4 text-neutral leading-relaxed">
                <p>
                  成都农村产权交易所是经成都市人民政府批准成立，由成都市农业农村局监管的农村产权流转交易服务平台。交易所成立于2012年，主要承担农村产权流转交易服务职能。
                </p>
                <p>
                  交易所以\"服务三农、激活资源、促进发展\"为宗旨，致力于推动农村产权流转交易市场化、规范化、便民化，为广大农户、新型农业经营主体和投资人提供优质的产权交易服务。
                </p>
                <p>
                  经过多年发展，交易所已建成以市级平台为龙头、区县分中心为骨干、乡镇服务站为基础的三级市场服务体系，覆盖成都市所有涉农乡镇。平台累计完成交易规模超过100亿元，服务农户超过8500户。
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
                alt="农村田园风光"
                className="rounded-xl shadow-card-hover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">12+</div>
                <div className="text-sm">年行业经验</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="组织架构" subtitle="科学规范的内部管理结构" />
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                交易所总部
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex flex-col md:flex-row gap-4">
                {['交易管理部', '信息发展部', '财务结算部', '综合管理部'].map((dept) => (
                  <div key={dept} className="bg-white px-6 py-3 rounded-lg shadow-sm text-center">
                    {dept}
                  </div>
                ))}
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex flex-wrap justify-center gap-4">
                {['天府新区分中心', '双流分中心', '郫都分中心', '都江堰分中心', '彭州分中心', '大邑分中心'].map((center) => (
                  <div key={center} className="bg-primary-50 px-4 py-2 rounded-lg text-sm">
                    {center}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="发展历程" subtitle="见证农村产权交易市场的发展" />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-primary-200" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-card inline-block">
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      <p className="text-neutral-dark mt-1">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Honors */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="资质荣誉" subtitle="权威认可，品质保证" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {honors.map((honor, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-card transition-shadow">
                <Award className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-semibold text-neutral-dark mb-2">{honor.title}</h3>
                <p className="text-sm text-gray-400">{honor.year}年</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
