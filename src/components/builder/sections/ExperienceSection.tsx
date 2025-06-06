import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section, ExperienceItem } from '../../../types';
import { Plus, Trash2, Calendar, Building, MapPin, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  section: Section;
}

const defaultExperienceItem: ExperienceItem = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  location: '',
  description: '',
  current: false
};

const ExperienceSection = ({ section }: ExperienceSectionProps) => {
  const { addItem, removeItem, updateSection } = useResume();
  const [newItem, setNewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ExperienceItem>(defaultExperienceItem);
  
  const handleAddItem = () => {
    setNewItem(true);
    setCurrentItem(defaultExperienceItem);
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
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSave = () => {
    addItem(section.id, currentItem);
    setNewItem(false);
    setCurrentItem(defaultExperienceItem);
  };
  
  const handleDelete = (index: number) => {
    removeItem(section.id, index);
  };
  
  const handleImproveDescription = (index: number) => {
    // This would connect to an AI service in a real implementation
    const item = section.items[index] as ExperienceItem;
    const improvedDescription = `• Increased team productivity by 27% through implementation of new project management methodologies
• Led cross-functional team of 8 engineers to deliver product features ahead of schedule
• Reduced customer reported bugs by 40% by establishing comprehensive QA processes
• Collaborated with product and design teams to improve user experience based on customer feedback`;
    
    const updatedItems = [...section.items];
    updatedItems[index] = {
      ...item,
      description: improvedDescription
    };
    
    updateSection(section.id, { items: updatedItems });
  };

  return (
    <div>
      <div className="mb-4">
        {section.items.length === 0 && !newItem && (
          <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No work experience added yet</p>
            <button 
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Experience
            </button>
          </div>
        )}
        
        {section.items.map((item, index) => {
          const experienceItem = item as ExperienceItem;
          return (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{experienceItem.position}</h4>
                  <div className="text-sm text-gray-600">
                    {experienceItem.company}
                    {experienceItem.location && ` • ${experienceItem.location}`}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {experienceItem.startDate} — {experienceItem.current ? 'Present' : experienceItem.endDate}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md relative mb-2">
                <pre className="text-sm whitespace-pre-wrap font-sans">{experienceItem.description}</pre>
                <button 
                  onClick={() => handleImproveDescription(index)}
                  className="absolute top-2 right-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded-md flex items-center transition-colors"
                >
                  <Sparkles size={12} className="mr-1" />
                  Improve
                </button>
              </div>
              
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
            <span>Add Another Experience</span>
          </button>
        )}
      </div>
      
      {newItem && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium mb-4">Add Work Experience</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title*
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={currentItem.position}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={currentItem.company}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. Acme Inc."
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
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
                  placeholder="e.g. Sep 2021"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
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
                  className={`input-field pl-10 ${currentItem.current ? 'bg-gray-100' : ''}`}
                  placeholder="e.g. Present"
                  disabled={currentItem.current}
                  required={!currentItem.current}
                />
              </div>
              <div className="mt-1 flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={currentItem.current}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                  I currently work here
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={currentItem.location}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="e.g. New York, NY"
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
              placeholder="Describe your responsibilities and achievements. Use bullet points (•) for better readability."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Start with action verbs and include quantifiable achievements.
            </p>
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
              disabled={!currentItem.position || !currentItem.company || !currentItem.startDate || (!currentItem.endDate && !currentItem.current)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;