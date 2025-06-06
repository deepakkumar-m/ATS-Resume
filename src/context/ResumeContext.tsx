import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Resume, Section, Template } from '../types';
import { defaultResume, templates } from '../data/defaults';

interface ResumeContextType {
  resume: Resume;
  selectedTemplate: Template;
  atsScore: number;
  updateResume: (updatedResume: Partial<Resume>) => void;
  updateSection: (sectionId: string, data: Partial<Section>) => void;
  addItem: (sectionId: string, item: any) => void;
  removeItem: (sectionId: string, itemIndex: number) => void;
  moveItem: (sectionId: string, fromIndex: number, toIndex: number) => void;
  changeTemplate: (templateId: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  calculateAtsScore: () => number;
  resetResume: () => void;
  saveResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resume, setResume] = useState<Resume>(() => {
    const savedResume = localStorage.getItem('atsResume');
    return savedResume ? JSON.parse(savedResume) : defaultResume;
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(() => {
    return templates.find(t => t.id === resume.templateId) || templates[0];
  });
  
  const [atsScore, setAtsScore] = useState<number>(0);
  
  useEffect(() => {
    calculateAtsScore();
  }, [resume]);
  
  const updateResume = (updatedResume: Partial<Resume>) => {
    setResume(prev => ({ ...prev, ...updatedResume }));
  };
  
  const updateSection = (sectionId: string, data: Partial<Section>) => {
    setResume(prev => {
      const updatedSections = prev.sections.map(section => 
        section.id === sectionId ? { ...section, ...data } : section
      );
      return { ...prev, sections: updatedSections };
    });
  };
  
  const addItem = (sectionId: string, item: any) => {
    setResume(prev => {
      const updatedSections = prev.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, items: [...section.items, item] };
        }
        return section;
      });
      return { ...prev, sections: updatedSections };
    });
  };
  
  const removeItem = (sectionId: string, itemIndex: number) => {
    setResume(prev => {
      const updatedSections = prev.sections.map(section => {
        if (section.id === sectionId) {
          const updatedItems = [...section.items];
          updatedItems.splice(itemIndex, 1);
          return { ...section, items: updatedItems };
        }
        return section;
      });
      return { ...prev, sections: updatedSections };
    });
  };
  
  const moveItem = (sectionId: string, fromIndex: number, toIndex: number) => {
    setResume(prev => {
      const updatedSections = prev.sections.map(section => {
        if (section.id === sectionId) {
          const updatedItems = [...section.items];
          const [movedItem] = updatedItems.splice(fromIndex, 1);
          updatedItems.splice(toIndex, 0, movedItem);
          return { ...section, items: updatedItems };
        }
        return section;
      });
      return { ...prev, sections: updatedSections };
    });
  };
  
  const changeTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      updateResume({ templateId });
    }
  };
  
  const moveSection = (fromIndex: number, toIndex: number) => {
    setResume(prev => {
      const updatedSections = [...prev.sections];
      const [movedSection] = updatedSections.splice(fromIndex, 1);
      updatedSections.splice(toIndex, 0, movedSection);
      return { ...prev, sections: updatedSections };
    });
  };
  
  const calculateAtsScore = () => {
    // Simple scoring algorithm based on resume completeness and keywords
    let score = 0;
    const maxScore = 100;
    
    // Check basic fields
    if (resume.personalInfo.name) score += 5;
    if (resume.personalInfo.email) score += 5;
    if (resume.personalInfo.phone) score += 5;
    if (resume.personalInfo.location) score += 5;
    
    // Check summary
    const summary = resume.sections.find(s => s.id === 'summary');
    if (summary && summary.content && summary.content.length > 50) score += 10;
    
    // Check experience
    const experience = resume.sections.find(s => s.id === 'experience');
    if (experience && experience.items.length > 0) {
      score += Math.min(experience.items.length * 5, 20);
      
      // Check for bullet points and action verbs in experience
      experience.items.forEach(job => {
        if (job.description && job.description.includes('•')) score += 2;
        if (job.description && /\b(achieved|improved|led|managed|developed|created|implemented)\b/i.test(job.description)) score += 3;
      });
    }
    
    // Check education
    const education = resume.sections.find(s => s.id === 'education');
    if (education && education.items.length > 0) score += 10;
    
    // Check skills
    const skills = resume.sections.find(s => s.id === 'skills');
    if (skills && skills.items.length > 0) {
      score += Math.min(skills.items.length, 10);
    }
    
    // Normalize score
    const normalizedScore = Math.min(Math.round(score), maxScore);
    setAtsScore(normalizedScore);
    return normalizedScore;
  };
  
  const resetResume = () => {
    setResume(defaultResume);
    setSelectedTemplate(templates[0]);
  };
  
  const saveResume = () => {
    localStorage.setItem('atsResume', JSON.stringify(resume));
  };
  
  useEffect(() => {
    saveResume();
  }, [resume]);
  
  return (
    <ResumeContext.Provider
      value={{
        resume,
        selectedTemplate,
        atsScore,
        updateResume,
        updateSection,
        addItem,
        removeItem,
        moveItem,
        changeTemplate,
        moveSection,
        calculateAtsScore,
        resetResume,
        saveResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};