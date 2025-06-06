import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ResumeEditor from '../components/builder/ResumeEditor';
import ResumePreview from '../components/builder/ResumePreview';
import AtsScoreCard from '../components/builder/AtsScoreCard';
import JobMatchAnalyzer from '../components/builder/JobMatchAnalyzer';
import { Download, FileText, Printer, Share2 } from 'lucide-react';

const BuilderPage = () => {
  const { resume, atsScore, saveResume } = useResume();
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="bg-gray-50 min-h-screen pb-12 fade-in">
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
            <p className="text-gray-600">Create and customize your ATS-optimized resume</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="btn-primary flex items-center">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="btn-secondary flex items-center">
              <Printer size={16} className="mr-2" />
              Print
            </button>
            <button className="btn-secondary flex items-center">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </div>
        
        {/* Mobile Tabs */}
        <div className="flex md:hidden mb-4 bg-white rounded-lg shadow-sm p-1 border">
          <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'editor' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'preview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'analyzer' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('analyzer')}
          >
            Analyzer
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel - Editor */}
          <div className={`w-full md:w-1/2 xl:w-2/5 ${activeTab !== 'editor' && 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="section-title flex items-center">
                <FileText size={18} className="mr-2 text-blue-600" />
                Resume Details
              </h2>
              
              <PersonalInfoForm />
            </div>
            
            <ResumeEditor />
          </div>
          
          {/* Right Panel - Preview */}
          <div className={`w-full md:w-1/2 xl:w-2/5 ${activeTab !== 'preview' && activeTab !== 'analyzer' && 'hidden md:block'}`}>
            {activeTab === 'analyzer' ? (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <AtsScoreCard score={atsScore} />
                <JobMatchAnalyzer />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
                <ResumePreview />
              </div>
            )}
          </div>
          
          {/* Extra Panel - Only visible on large screens */}
          <div className="hidden xl:block xl:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <AtsScoreCard score={atsScore} />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <JobMatchAnalyzer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;