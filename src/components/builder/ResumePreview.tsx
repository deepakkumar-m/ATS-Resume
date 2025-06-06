import { useResume } from '../../context/ResumeContext';

const ResumePreview = () => {
  const { resume, selectedTemplate } = useResume();

  // Mock rendering for demonstration purposes
  // In a real implementation, we would have different template components
  return (
    <div className="bg-white border border-gray-200 shadow-md max-w-[8.5in] mx-auto">
      <div className="relative">
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          Preview
        </div>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: selectedTemplate.color }}>
          <h1 className="text-2xl font-bold text-white">{resume.personalInfo.name || 'Your Name'}</h1>
          
          <div className="flex flex-wrap text-white text-sm mt-2">
            {resume.personalInfo.email && (
              <div className="mr-4 mb-1">
                {resume.personalInfo.email}
              </div>
            )}
            
            {resume.personalInfo.phone && (
              <div className="mr-4 mb-1">
                {resume.personalInfo.phone}
              </div>
            )}
            
            {resume.personalInfo.location && (
              <div className="mr-4 mb-1">
                {resume.personalInfo.location}
              </div>
            )}
            
            {resume.personalInfo.website && (
              <div className="mr-4 mb-1">
                {resume.personalInfo.website}
              </div>
            )}
            
            {resume.personalInfo.linkedin && (
              <div className="mr-4 mb-1">
                LinkedIn
              </div>
            )}
            
            {resume.personalInfo.github && (
              <div className="mb-1">
                GitHub
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {resume.sections.map((section) => {
            if (!section.visible) return null;
            
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 border-b border-gray-300 pb-1 mb-3">
                  {section.title}
                </h2>
                
                {section.id === 'summary' && section.content && (
                  <p className="text-sm text-gray-700">
                    {section.content}
                  </p>
                )}
                
                {section.id === 'experience' && section.items.map((item: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.position}</h3>
                      <span className="text-sm text-gray-600">{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.company}</span>
                      {item.location && <span className="text-gray-600">{item.location}</span>}
                    </div>
                    <p className="text-sm mt-1 whitespace-pre-line">{item.description}</p>
                  </div>
                ))}
                
                {section.id === 'education' && section.items.map((item: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.degree} in {item.field}</h3>
                      <span className="text-sm text-gray-600">{item.startDate} - {item.endDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.institution}</span>
                      {item.location && <span className="text-gray-600">{item.location}</span>}
                    </div>
                    {item.gpa && (
                      <p className="text-sm mt-1">GPA: {item.gpa}</p>
                    )}
                    {item.description && (
                      <p className="text-sm mt-1 whitespace-pre-line">{item.description}</p>
                    )}
                  </div>
                ))}
                
                {section.id === 'skills' && (
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item: any, i: number) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {section.id === 'projects' && section.items.map((item: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      {(item.startDate || item.endDate) && (
                        <span className="text-sm text-gray-600">
                          {item.startDate && item.startDate} 
                          {item.startDate && item.endDate && ' - '} 
                          {item.endDate && item.endDate}
                        </span>
                      )}
                    </div>
                    {item.technologies && (
                      <p className="text-sm font-medium">{item.technologies}</p>
                    )}
                    <p className="text-sm mt-1 whitespace-pre-line">{item.description}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                        Project Link
                      </a>
                    )}
                  </div>
                ))}
                
                {section.id === 'certifications' && section.items.map((item: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="text-sm text-gray-600">{item.date}</span>
                    </div>
                    <p className="text-sm font-medium">{item.issuer}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                        Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;