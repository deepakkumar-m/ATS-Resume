import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section, EducationItem } from '../../../types';
import { Plus, Trash2, Calendar, Building, MapPin, GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  section: Section;
}

const defaultEducationItem: EducationItem = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  location: '',
  gpa: '',
  description: ''
};

const EducationSection = ({ section }: EducationSectionProps) => {
  const { addItem, removeItem } = useResume();
  const [newItem, setNewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<EducationItem>(defaultEducationItem);
  
  const handleAddItem = () => {
    setNewItem(true);
    setCurrentItem(defaultEducationItem);
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
    setCurrentItem(defaultEducationItem);
  };
  
  const handleDelete = (index: number) => {
    removeItem(section.id, index);
  };

  return (
    <div>
      <div className="mb-4">
        {section.items.length === 0 && !newItem && (
          <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No education added yet</p>
            <button 
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Education
            </button>
          </div>
        )}
        
        {section.items.map((item, index) => {
          const educationItem = item as EducationItem;
          return (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{educationItem.degree} in {educationItem.field}</h4>
                  <div className="text-sm text-gray-600">
                    {educationItem.institution}
                    {educationItem.location && ` • ${educationItem.location}`}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {educationItem.startDate} — {educationItem.endDate}
                </div>
              </div>
              
              {educationItem.gpa && (
                <div className="text-sm mb-2">
                  <span className="font-medium">GPA:</span> {educationItem.gpa}
                </div>
              )}
              
              {educationItem.description && (
                <div className="text-sm text-gray-700 mb-2 whitespace-pre-line">
                  {educationItem.description}
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
            <span>Add Another Education</span>
          </button>
        )}
      </div>
      
      {newItem && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium mb-4">Add Education</h4>
          
          <div className="mb-4">
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
              School/University*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="institution"
                name="institution"
                value={currentItem.institution}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="e.g. University of California"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={currentItem.degree}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. Bachelor of Science"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study*
              </label>
              <input
                type="text"
                id="field"
                name="field"
                value={currentItem.field}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Computer Science"
                required
              />
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
                  placeholder="e.g. Sep 2018"
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
                  className="input-field pl-10"
                  placeholder="e.g. May 2022"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
                  placeholder="e.g. Berkeley, CA"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                GPA <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={currentItem.gpa}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. 3.8/4.0"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={currentItem.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 text-sm"
              placeholder="Relevant coursework, honors, activities, etc."
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
              disabled={!currentItem.institution || !currentItem.degree || !currentItem.field || !currentItem.startDate || !currentItem.endDate}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;