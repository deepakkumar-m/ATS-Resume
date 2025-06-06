import { useEffect, useState } from 'react';
import { Award, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface AtsScoreCardProps {
  score: number;
}

const AtsScoreCard = ({ score }: AtsScoreCardProps) => {
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    // Animate the score when it changes
    setProgressValue(0);
    const timer = setTimeout(() => {
      setProgressValue(score);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  // Determine score status
  const getScoreStatus = () => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'needs-improvement';
  };
  
  const status = getScoreStatus();
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Award size={18} className="mr-2 text-blue-600" />
        ATS Score
      </h3>
      
      <div className="bg-gray-100 rounded-full h-8 mb-2 relative overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            status === 'excellent' 
              ? 'bg-green-500' 
              : status === 'good' 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
          }`}
          style={{ width: `${progressValue}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-sm text-gray-800">{score}/100</span>
        </div>
      </div>
      
      <div className={`p-4 rounded-md mb-4 ${
        status === 'excellent' 
          ? 'bg-green-50 border border-green-100' 
          : status === 'good' 
            ? 'bg-yellow-50 border border-yellow-100' 
            : 'bg-red-50 border border-red-100'
      }`}>
        <div className="flex items-start">
          {status === 'excellent' ? (
            <CheckCircle size={20} className="mr-2 text-green-600 mt-0.5 flex-shrink-0" />
          ) : status === 'good' ? (
            <AlertTriangle size={20} className="mr-2 text-yellow-600 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle size={20} className="mr-2 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          
          <div>
            <h4 className="font-medium text-sm">
              {status === 'excellent' 
                ? 'Excellent! Your resume is well-optimized for ATS.'
                : status === 'good'
                  ? 'Good start, but there\'s room for improvement.'
                  : 'Your resume needs significant improvements.'}
            </h4>
            
            <p className="text-sm mt-1 text-gray-600">
              {status === 'excellent' 
                ? 'Your resume should perform well with most ATS systems. Keep up the good work!'
                : status === 'good'
                  ? 'Add more relevant keywords and complete all required sections for better results.'
                  : 'Focus on adding relevant keywords, completing all sections, and using a clearer format.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-sm space-y-2">
        <h4 className="font-medium">Quick Improvements:</h4>
        
        {score < 100 && (
          <ul className="space-y-1 pl-5 list-disc text-gray-700">
            {score < 80 && (
              <li>Add more relevant skills to the Skills section</li>
            )}
            {score < 70 && (
              <li>Include measurable achievements in your Experience</li>
            )}
            {score < 60 && (
              <li>Complete your Professional Summary section</li>
            )}
            {score < 50 && (
              <li>Add more details to your Education section</li>
            )}
          </ul>
        )}
        
        <a href="#" className="text-blue-600 hover:text-blue-700 inline-flex items-center mt-2 font-medium text-sm">
          View detailed report
          <ArrowRight size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default AtsScoreCard;