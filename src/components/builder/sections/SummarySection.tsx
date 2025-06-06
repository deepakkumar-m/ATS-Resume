import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section } from '../../../types';
import { Sparkles } from 'lucide-react';

interface SummarySectionProps {
  section: Section;
}

const SummarySection = ({ section }: SummarySectionProps) => {
  const { updateSection } = useResume();
  const [content, setContent] = useState(section.content || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleBlur = () => {
    updateSection(section.id, { content });
  };
  
  const suggestions = [
    "Results-driven [profession] with [X] years of experience in [industry/field]. Proven track record of [key achievement] resulting in [measurable outcome]. Adept at [key skill 1], [key skill 2], and [key skill 3] with a focus on [area of specialization].",
    "Detail-oriented [profession] with expertise in [specific area]. Demonstrated success in [achievement] that [specific result]. Skilled in [technical skill] and [soft skill], with a passion for [industry/field].",
    "Innovative [profession] with a strong background in [field/industry]. Consistently [achievement verb] [result] through [method/approach]. Excel at [skill 1] and [skill 2], with particular strengths in [specific area]."
  ];
  
  const applySuggestion = (suggestion: string) => {
    setContent(suggestion);
    updateSection(section.id, { content: suggestion });
    setShowSuggestions(false);
  };

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Write a professional summary that highlights your expertise
        </label>
        <button 
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
        >
          <Sparkles size={14} className="mr-1" />
          AI Suggestions
        </button>
      </div>
      
      <textarea
        id="summary"
        value={content}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 text-sm"
        placeholder="Write a concise, powerful summary that highlights your expertise, experience, and key achievements..."
      />
      
      <div className="text-xs text-gray-500 mt-1 flex justify-between">
        <span>{content.length} characters</span>
        <span>Recommended: 50-200 characters</span>
      </div>
      
      {showSuggestions && (
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-md p-3">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Sparkles size={14} className="mr-1 text-blue-600" />
            AI-Generated Suggestions
          </h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-2 rounded border border-gray-200 text-sm">
                <p className="mb-2 text-gray-700">{suggestion}</p>
                <button 
                  onClick={() => applySuggestion(suggestion)} 
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded transition-colors"
                >
                  Use this
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: Replace the bracketed placeholders with your specific information.
          </p>
        </div>
      )}
    </div>
  );
};

export default SummarySection;