import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { templates } from '../data/defaults';
import { Link } from 'react-router-dom';
import { Check, Lock, FileText, ArrowRight, Search, Filter } from 'lucide-react';

const TemplatesPage = () => {
  const { changeTemplate, selectedTemplate } = useResume();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    all: true,
    atsOptimized: false,
    free: false
  });
  
  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setFilters({
        all: true,
        atsOptimized: false,
        free: false
      });
    } else {
      setFilters({
        ...filters,
        all: false,
        [filter]: !filters[filter as keyof typeof filters]
      });
    }
  };
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filters.all) return matchesSearch;
    
    const matchesFilters = (
      (filters.atsOptimized && template.isAtsOptimized) ||
      (filters.free && !template.isPremium)
    );
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12 fade-in">
      <div className="container-custom py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Templates</h1>
          <p className="text-gray-600 max-w-3xl">
            Choose from our collection of professionally designed templates. All templates are ATS-friendly 
            and optimized to help you get past the initial screening.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="relative md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.all 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Templates
            </button>
            <button 
              onClick={() => handleFilterChange('atsOptimized')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                filters.atsOptimized 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FileText size={16} className="mr-1" />
              ATS Optimized
            </button>
            <button 
              onClick={() => handleFilterChange('free')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                filters.free 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Free Templates
            </button>
          </div>
        </div>
        
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                  selectedTemplate.id === template.id ? 'border-blue-500' : 'border-transparent'
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="relative h-56 bg-gray-100">
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: template.color }}
                  >
                    <div className="w-4/5 h-5/6 bg-white rounded-sm flex flex-col p-3">
                      <div className="h-6 w-1/3 bg-gray-200 rounded-sm mb-2"></div>
                      <div className="flex space-x-1 mb-2">
                        <div className="h-3 w-16 bg-gray-200 rounded-sm"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded-sm"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded-sm"></div>
                      </div>
                      <div className="h-4 w-full bg-gray-200 rounded-sm mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded-sm mb-2"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded-sm"></div>
                      <div className="mt-auto">
                        <div className="h-3 w-full bg-gray-200 rounded-sm mb-1"></div>
                        <div className="h-3 w-full bg-gray-200 rounded-sm mb-1"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {template.isAtsOptimized && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Check size={12} className="mr-1" />
                      ATS Optimized
                    </div>
                  )}
                  
                  {selectedTemplate.id === template.id && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                        <Check size={24} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => changeTemplate(template.id)}
                      className={`text-sm font-medium flex items-center ${
                        selectedTemplate.id === template.id
                          ? 'text-blue-600 cursor-default'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      disabled={selectedTemplate.id === template.id}
                    >
                      {selectedTemplate.id === template.id ? (
                        <>
                          <Check size={16} className="mr-1" />
                          Selected
                        </>
                      ) : (
                        'Select Template'
                      )}
                    </button>
                    
                    <Link
                      to={selectedTemplate.id === template.id ? '/builder' : '#'}
                      onClick={() => {
                        if (selectedTemplate.id !== template.id) {
                          changeTemplate(template.id);
                          setTimeout(() => {
                            window.location.href = '/builder';
                          }, 100);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      Use Template
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;