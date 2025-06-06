import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section, ProjectItem } from '../../../types';
import { Plus, Trash2, Calendar, Globe } from 'lucide-react';

interface ProjectsSectionProps {
  section: Section;
}

const defaultProjectItem: ProjectItem = {
  name: '',
  description: '',
  technologies: '',
  link: '',
  startDate: '',
  endDate: ''
};

const ProjectsSection = ({ section }: ProjectsSectionProps) => {
  const { addItem, removeItem } = useResume();
  const [newItem, setNewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ProjectItem>(defaultProjectItem);
  
  const handleAddItem = () => {
    setNewItem(true);
    setCurrentItem(defaultProjectItem);
  };
  
  const handleCancelAdd = () => {
    setNewItem(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    addItem(section.id, currentItem);
    setNewItem(false);
    setCurrentItem(defaultProjectItem);
  };
  
  const handleDelete = (index: number) => {
    removeItem(section.id, index);
  };

  return (
    <div>
      <div className="mb-4">
        {section.items.length === 0 && !newItem && (
          <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No projects added yet</p>
            <button 
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Project
            </button>
          </div>
        )}
        
        {section.items.map((item, index) => {
          const projectItem = item as ProjectItem;
          return (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{projectItem.name}</h4>
                  {projectItem.technologies && (
                    <div className="text-sm text-gray-600">
                      Technologies: {projectItem.technologies}
                    </div>
                  )}
                </div>
                {(projectItem.startDate || projectItem.endDate) && (
                  <div className="text-sm text-gray-600">
                    {projectItem.startDate && projectItem.startDate}
                    {projectItem.startDate && projectItem.endDate && ' — '}
                    {projectItem.endDate && projectItem.endDate}
                  </div>
                )}
              </div>
              
              {projectItem.description && (
                <div className="text-sm text-gray-700 mb-2 whitespace-pre-line">
                  {projectItem.description}
                </div>
              )}
              
              {projectItem.link && (
                <div className="text-sm mb-3">
                  <a 
                    href={projectItem.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <Globe size={14} className="mr-1" />
                    Project Link
                  </a>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        
        {section.items.length > 0 && !newItem && (
          <button 
            onClick={handleAddItem}
            className="mt-4 flex items-center justify-center w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-600 hover:text-blue-700 hover:border-blue-300 transition-colors duration-200"
          >
            <Plus size={16} className="mr-1" />
            <span>Add Another Project</span>
          </button>
        )}
      </div>
      
      {newItem && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium mb-4">Add Project</h4>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentItem.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. E-commerce Website"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  value={currentItem.startDate}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. Jan 2022"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  value={currentItem.endDate}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. Mar 2022 or Ongoing"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={currentItem.technologies}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Project Link <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe size={16} className="text-gray-400" />
              </div>
              <input
                type="url"
                id="link"
                name="link"
                value={currentItem.link}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="e.g. https://github.com/username/project"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={currentItem.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 text-sm"
              placeholder="Describe the project, your role, and key accomplishments..."
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancelAdd}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
              disabled={!currentItem.name || !currentItem.description}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;