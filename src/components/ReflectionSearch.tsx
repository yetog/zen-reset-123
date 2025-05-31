
import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';

interface ReflectionSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const ReflectionSearch: React.FC<ReflectionSearchProps> = ({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange
}) => {
  const filters = [
    { id: 'all', label: 'All Reflections', icon: Filter },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'week', label: 'This Week', icon: Calendar },
    { id: 'month', label: 'This Month', icon: Calendar }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
          <input
            type="text"
            placeholder="Search your reflections..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-purple-300 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900'
                    : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <IconComponent size={16} />
                <span className="text-sm font-light">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReflectionSearch;
