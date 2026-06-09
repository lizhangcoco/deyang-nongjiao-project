import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../common/Button';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  district: string;
  type: string;
  status: string;
  keyword: string;
}

const districts = ['全部', '天府新区', '双流区', '郫都区', '都江堰市', '彭州市', '大邑县', '金堂县', '崇州市', '新都区'];
const types = ['全部', '土地经营权', '林权', '集体经营性建设用地', '集体资产', '农业设施用地', '其他'];
const statuses = ['全部', '招拍中', '已成交', '已下架'];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    district: '全部',
    type: '全部',
    status: '全部',
    keyword: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-4 mb-6">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索项目名称..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-primary font-medium mb-4"
      >
        <Filter className="w-4 h-4" />
        高级筛选
        <span className={clsx('transition-transform', isExpanded && 'rotate-180')}>
          ▼
        </span>
      </button>

      {/* Filters */}
      <div
        className={clsx(
          'grid gap-4 transition-all duration-300',
          isExpanded ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3 max-h-0 overflow-hidden opacity-0 md:opacity-0'
        )}
      >
        {/* District */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">区域</label>
          <select
            value={filters.district}
            onChange={(e) => handleChange('district', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">类型</label>
          <select
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">状态</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
