import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section } from '../../../types';
import { Edit, Save, X } from 'lucide-react';

interface CustomSectionProps {
  section: Section;
}

const CustomSection = ({ section }: CustomSectionProps) => {
  const { updateSection } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content || '');
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleSave = () => {
    updateSection(section.id, { content });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setContent(section.content || '');
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 text-sm"
            placeholder="Enter content for this section..."
          />
          
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              <X size={14} className="mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              <Save size={14} className="mr-1" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          {section.content ? (
            <div className="relative bg-gray-50 p-3 rounded-md">
              <pre className="text-sm whitespace-pre-wrap font-sans">{section.content}</pre>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Edit content"
              >
                <Edit size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors duration-200"
            >
              <Edit size={16} className="inline mr-2" />
              <span>Add Content</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSection;