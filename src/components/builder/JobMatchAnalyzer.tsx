import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Search, RefreshCw, ThumbsUp, AlertTriangle } from 'lucide-react';
import { atsKeywords } from '../../data/defaults';

const JobMatchAnalyzer = () => {
  const { resume, updateResume } = useResume();
  const [jobDescription, setJobDescription] = useState(resume.jobDescription || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<null | {
    score: number;
    matching: string[];
    missing: string[];
  }>(null);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = analyzeMatch(jobDescription);
      setMatchResults(results);
      updateResume({ jobDescription });
      setIsAnalyzing(false);
    }, 1500);
  };
  
  // Simple keyword matching algorithm (this would be more sophisticated in a real app)
  const analyzeMatch = (jobDesc: string) => {
    const allKeywords = [
      ...atsKeywords.general,
      ...atsKeywords.tech,
      ...atsKeywords.marketing,
      ...atsKeywords.finance,
      ...atsKeywords.healthcare
    ];
    
    // Convert job description to lowercase for case-insensitive matching
    const jobDescLower = jobDesc.toLowerCase();
    
    // Get all resume content as a single string
    const resumeContent = getResumeContent().toLowerCase();
    
    // Find matching and missing keywords
    const matching: string[] = [];
    const missing: string[] = [];
    
    allKeywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (jobDescLower.includes(keywordLower)) {
        if (resumeContent.includes(keywordLower)) {
          matching.push(keyword);
        } else {
          missing.push(keyword);
        }
      }
    });
    
    // Calculate match score
    const totalKeywords = matching.length + missing.length;
    const score = totalKeywords > 0 
      ? Math.round((matching.length / totalKeywords) * 100) 
      : 0;
    
    return {
      score,
      matching,
      missing
    };
  };
  
  // Get all resume content as a single string
  const getResumeContent = () => {
    let content = '';
    
    // Add personal info
    Object.values(resume.personalInfo).forEach(value => {
      if (value) content += value + ' ';
    });
    
    // Add section content
    resume.sections.forEach(section => {
      if (section.content) content += section.content + ' ';
      
      section.items.forEach(item => {
        if (typeof item === 'string') {
          content += item + ' ';
        } else {
          Object.values(item).forEach(value => {
            if (value && typeof value === 'string') content += value + ' ';
          });
        }
      });
    });
    
    return content;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Search size={18} className="mr-2 text-blue-600" />
        Job Match Analyzer
      </h3>
      
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Paste Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 text-sm"
          placeholder="Paste the job description here to analyze keyword matches..."
        />
      </div>
      
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !jobDescription.trim()}
        className={`w-full py-2 px-4 rounded-md font-medium text-white flex items-center justify-center ${
          isAnalyzing || !jobDescription.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isAnalyzing ? (
          <>
            <RefreshCw size={16} className="mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search size={16} className="mr-2" />
            Analyze Match
          </>
        )}
      </button>
      
      {matchResults && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Match Score:</h4>
            <span className={`font-bold ${
              matchResults.score >= 70 
                ? 'text-green-600' 
                : matchResults.score >= 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}>
              {matchResults.score}%
            </span>
          </div>
          
          <div className="space-y-4 mt-4">
            {matchResults.matching.length > 0 && (
              <div>
                <div className="flex items-center text-sm font-medium text-green-700 mb-2">
                  <ThumbsUp size={14} className="mr-1" />
                  <span>Found Keywords ({matchResults.matching.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResults.matching.map((keyword, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {matchResults.missing.length > 0 && (
              <div>
                <div className="flex items-center text-sm font-medium text-red-700 mb-2">
                  <AlertTriangle size={14} className="mr-1" />
                  <span>Missing Keywords ({matchResults.missing.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResults.missing.map((keyword, index) => (
                    <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {matchResults.missing.length > 0 && (
            <div className="mt-4 text-sm bg-yellow-50 border border-yellow-100 rounded-md p-3">
              <p className="font-medium text-yellow-800">Improvement Suggestions:</p>
              <p className="text-gray-700 mt-1">
                Try incorporating the missing keywords into your resume to improve your match score.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatchAnalyzer;