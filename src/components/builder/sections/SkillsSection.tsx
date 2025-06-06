import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section, SkillItem } from '../../../types';
import { Plus, X, Check, ThumbsUp, AlertTriangle } from 'lucide-react';
import { atsKeywords } from '../../../data/defaults';

interface SkillsSectionProps {
  section: Section;
}

const SkillsSection = ({ section }: SkillsSectionProps) => {
  const { addItem, removeItem, updateSection } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addItem(section.id, { name: newSkill.trim() });
      setNewSkill('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleRemoveSkill = (index: number) => {
    removeItem(section.id, index);
  };
  
  const handleAddSuggestedSkill = (skill: string) => {
    addItem(section.id, { name: skill });
  };
  
  // Get skills suggestions based on existing items
  const getSuggestions = () => {
    const currentSkills = section.items.map((item: SkillItem) => item.name.toLowerCase());
    let suggestions: string[] = [];
    
    // Get suggestions from general keywords
    const allKeywords = [
      ...atsKeywords.general,
      ...atsKeywords.tech,
      ...atsKeywords.marketing,
      ...atsKeywords.finance,
      ...atsKeywords.healthcare
    ];
    
    // Filter out skills that are already added
    suggestions = allKeywords.filter(keyword => 
      !currentSkills.includes(keyword.toLowerCase())
    );
    
    // Limit to 15 suggestions
    return suggestions.slice(0, 15);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700 mb-1">
          Add Skills
        </label>
        <div className="flex">
          <input
            type="text"
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field rounded-r-none"
            placeholder="e.g. JavaScript, Project Management"
          />
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className={`px-4 rounded-r-md font-medium text-white ${
              !newSkill.trim() ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        {section.items.length === 0 ? (
          <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No skills added yet</p>
            <button 
              onClick={() => setShowSuggestions(true)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
            >
              <ThumbsUp size={16} className="mr-1" />
              Show Suggested Skills
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {section.items.map((item: SkillItem, index: number) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-gray-800">
                <span>{item.name}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
        >
          {showSuggestions ? (
            <>
              <X size={14} className="mr-1" />
              Hide Suggestions
            </>
          ) : (
            <>
              <ThumbsUp size={14} className="mr-1" />
              Show Suggested Skills
            </>
          )}
        </button>
      </div>
      
      {showSuggestions && (
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">
              Suggested Skills for ATS Optimization
            </h4>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close suggestions"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {getSuggestions().map((skill, index) => (
              <button
                key={index}
                onClick={() => handleAddSuggestedSkill(skill)}
                className="bg-white border border-gray-300 hover:border-blue-400 px-3 py-1 rounded-full text-sm flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Plus size={14} className="mr-1" />
                {skill}
              </button>
            ))}
          </div>
          
          <div className="flex items-start mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded-md">
            <AlertTriangle size={14} className="mr-1 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>
              Adding relevant skills that match job descriptions can significantly improve your resume's ATS score.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;