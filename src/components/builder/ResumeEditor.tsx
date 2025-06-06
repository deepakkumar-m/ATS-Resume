import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Section as SectionType } from '../../types';
import { PlusCircle, GripVertical, Eye, EyeOff, Settings, Info } from 'lucide-react';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import CustomSection from './sections/CustomSection';

const ResumeEditor = () => {
  const { resume, moveSection } = useResume();
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isSectionExpanded = (sectionId: string) => {
    return expandedSections[sectionId] !== false;
  };

  const handleDragStart = (index: number) => {
    setDraggedSectionIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedSectionIndex === null || draggedSectionIndex === index) return;
  };

  const handleDrop = (index: number) => {
    if (draggedSectionIndex === null || draggedSectionIndex === index) return;
    moveSection(draggedSectionIndex, index);
    setDraggedSectionIndex(null);
  };

  const renderSectionComponent = (section: SectionType) => {
    switch (section.id) {
      case 'summary':
        return <SummarySection section={section} />;
      case 'experience':
        return <ExperienceSection section={section} />;
      case 'education':
        return <EducationSection section={section} />;
      case 'skills':
        return <SkillsSection section={section} />;
      case 'projects':
        return <ProjectsSection section={section} />;
      case 'certifications':
        return <CertificationsSection section={section} />;
      default:
        return <CustomSection section={section} />;
    }
  };

  return (
    <div className="mb-6">
      {resume.sections.map((section, index) => (
        <div
          key={section.id}
          draggable={true}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          className={`resume-section mb-4 ${
            draggedSectionIndex === index ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="drag-handle mr-2">
                <GripVertical size={18} />
              </div>
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              {section.required && (
                <div className="ml-2 has-tooltip">
                  <Info size={14} className="text-blue-500" />
                  <span className="tooltip -mt-14">Required for ATS</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleSection(section.id)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isSectionExpanded(section.id) ? 'Collapse section' : 'Expand section'}
              >
                {isSectionExpanded(section.id) ? (
                  <EyeOff size={16} className="text-gray-500" />
                ) : (
                  <Eye size={16} className="text-gray-500" />
                )}
              </button>
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Section settings"
              >
                <Settings size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          {isSectionExpanded(section.id) && (
            <div className="pl-5 border-l-2 border-gray-100 mt-4">
              {renderSectionComponent(section)}
            </div>
          )}
        </div>
      ))}

      <button className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors duration-200">
        <PlusCircle size={18} className="mr-2" />
        <span>Add New Section</span>
      </button>
    </div>
  );
};

export default ResumeEditor;