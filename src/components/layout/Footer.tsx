import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold">成都农村产权交易所</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              致力于推动农村产权流转交易市场化、规范化、便民化，服务乡村振兴战略。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">关于我们</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">交易项目</Link></li>
              <li><Link to="/guide" className="hover:text-white transition-colors">交易指南</Link></li>
              <li><Link to="/policies" className="hover:text-white transition-colors">政策法规</Link></li>
            </ul>
          </div>

          {/* Special Links */}
          <div>
            <h3 className="font-semibold mb-4">特色栏目</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/investor-education" className="hover:text-white transition-colors">投资者教育</Link></li>
              <li><Link to="/party-building" className="hover:text-white transition-colors">党的建设</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">新闻中心</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>028-86567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@cdncq.cn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span>四川省成都市武侯区武侯大道顺江段77号</span>
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div>
            <h3 className="font-semibold mb-4">关注我们</h3>
            <div className="bg-white p-3 rounded-lg inline-block">
              <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs text-center">
                扫码关注<br />微信公众号
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>版权所有 成都农村产权交易所 © 2024</p>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-white transition-colors">政策法规</Link>
            <Link to="/contact" className="hover:text-white transition-colors">联系我们</Link>
            <Link to="/contact" className="hover:text-white transition-colors">留言反馈</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
