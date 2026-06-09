import { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import FilterBar from '../components/modules/FilterBar';
import ProjectCard from '../components/modules/ProjectCard';
import SectionTitle from '../components/common/SectionTitle';
import projects from '../data/projects.json';

interface FilterState {
  district: string;
  type: string;
  status: string;
  keyword: string;
}

export default function Projects() {
  const [filters, setFilters] = useState<FilterState>({
    district: '全部',
    type: '全部',
    status: '全部',
    keyword: '',
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (filters.district !== '全部' && project.district !== filters.district) {
        return false;
      }
      if (filters.type !== '全部' && project.type !== filters.type) {
        return false;
      }
      if (filters.status !== '全部' && project.status !== filters.status) {
        return false;
      }
      if (filters.keyword && !project.title.toLowerCase().includes(filters.keyword.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">交易项目</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            精选优质农村产权项目，涵盖土地经营权、林权、集体资产等多种类型
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FilterBar onFilterChange={setFilters} />

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-neutral">
              共找到 <span className="font-semibold text-primary">{filteredProjects.length}</span> 个项目
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">暂无符合条件的项目</h3>
              <p className="text-neutral">请调整筛选条件后重试</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
