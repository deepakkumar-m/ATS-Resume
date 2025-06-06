import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Plus, FileText, Copy, Edit, Trash2, Download, Share2, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { resume } = useResume();
  
  // Mock data for saved resumes
  const [savedResumes, setSavedResumes] = useState([
    {
      id: resume.id,
      name: 'Software Developer Resume',
      template: 'modern',
      atsScore: 85,
      lastModified: new Date().toISOString(),
      isActive: true
    },
    {
      id: crypto.randomUUID(),
      name: 'Marketing Manager Resume',
      template: 'classic',
      atsScore: 72,
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: false
    },
    {
      id: crypto.randomUUID(),
      name: 'Data Analyst Resume',
      template: 'minimal',
      atsScore: 64,
      lastModified: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: false
    }
  ]);
  
  // Mock data for job applications
  const [applications, setApplications] = useState([
    {
      id: crypto.randomUUID(),
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      dateApplied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Applied',
      resumeId: resume.id
    },
    {
      id: crypto.randomUUID(),
      company: 'Global Software Solutions',
      position: 'Frontend Developer',
      dateApplied: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Interview',
      resumeId: resume.id
    },
    {
      id: crypto.randomUUID(),
      company: 'Digital Creations',
      position: 'UX/UI Designer',
      dateApplied: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Rejected',
      resumeId: savedResumes[1].id
    }
  ]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12 fade-in">
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">My Dashboard</h1>
            <p className="text-gray-600">
              Manage your resumes and track job applications in one place
            </p>
          </div>
          
          <Link to="/builder" className="btn-primary flex items-center">
            <Plus size={16} className="mr-2" />
            Create New Resume
          </Link>
        </div>
        
        {/* Resumes Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">My Resumes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              View All
              <FileText size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedResumes.map((savedResume) => (
              <div 
                key={savedResume.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div 
                  className="h-3 w-full" 
                  style={{ 
                    backgroundColor: savedResume.atsScore >= 80 
                      ? '#10B981' 
                      : savedResume.atsScore >= 60 
                        ? '#F59E0B' 
                        : '#EF4444' 
                  }}
                ></div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 truncate max-w-[70%]">
                      {savedResume.name}
                    </h3>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      savedResume.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {savedResume.isActive ? 'Active' : 'Saved'}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar size={14} className="mr-1" />
                    Modified {formatDate(savedResume.lastModified)}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">ATS Score:</span>
                      <span className={`text-sm font-bold ${
                        savedResume.atsScore >= 80 
                          ? 'text-green-600' 
                          : savedResume.atsScore >= 60 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                      }`}>
                        {savedResume.atsScore}/100
                      </span>
                    </div>
                    
                    <span className="text-sm text-gray-500">{savedResume.template} template</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Link 
                      to="/builder" 
                      className="flex-1 py-2 text-sm font-medium text-center rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={14} className="inline-block mr-1" />
                      Edit
                    </Link>
                    <button className="flex-1 py-2 text-sm font-medium text-center rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                      <Download size={14} className="inline-block mr-1" />
                      Download
                    </button>
                    <button className="p-2 text-sm font-medium text-center rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <Link 
              to="/builder"
              className="bg-white rounded-lg shadow-sm border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 hover:border-blue-400 transition-colors duration-200 h-full"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Plus size={24} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Create New Resume</h3>
              <p className="text-sm text-gray-500 text-center">
                Start from scratch or use a template
              </p>
            </Link>
          </div>
        </div>
        
        {/* Applications Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Job Applications</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Add Application
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resume
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{application.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{application.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(application.dateApplied)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'Applied' 
                            ? 'bg-blue-100 text-blue-800' 
                            : application.status === 'Interview' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status === 'Applied' && <AlertTriangle size={12} className="mr-1" />}
                          {application.status === 'Interview' && <CheckCircle size={12} className="mr-1" />}
                          {application.status === 'Rejected' && <AlertTriangle size={12} className="mr-1" />}
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {savedResumes.find(r => r.id === application.resumeId)?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {applications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No job applications added yet</p>
                <button className="btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;