import { useState } from 'react';
import { FileText, Download, Search } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import policies from '../data/policies.json';

const levels = ['全部', '国家级', '省级', '市级'];

export default function Policies() {
  const [selectedLevel, setSelectedLevel] = useState('全部');
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredPolicies = policies.filter((policy) => {
    if (selectedLevel !== '全部' && policy.level !== selectedLevel) {
      return false;
    }
    if (searchKeyword && !policy.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case '国家级':
        return 'bg-red-100 text-red-700';
      case '省级':
        return 'bg-orange-100 text-orange-700';
      case '市级':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">政策法规</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            了解农村产权交易相关法律法规，保障您的合法权益
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search and Filter */}
          <Card className="p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索政策标题..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-neutral-dark hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="mb-6">
            <p className="text-neutral">
              共找到 <span className="font-semibold text-primary">{filteredPolicies.length}</span> 个政策法规
            </p>
          </div>

          {/* Policy List */}
          {filteredPolicies.length > 0 ? (
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <Card key={policy.id} hover className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(policy.level)}`}>
                          {policy.level}
                        </span>
                        <span className="text-xs text-gray-400">{policy.category}</span>
                      </div>
                      <h3 className="font-semibold text-neutral-dark text-lg mb-2 hover:text-primary cursor-pointer">
                        {policy.title}
                      </h3>
                      <p className="text-neutral text-sm mb-3 line-clamp-2">{policy.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">发布日期：{policy.publishDate}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">暂无符合条件的政策法规</h3>
              <p className="text-neutral">请调整搜索条件后重试</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
