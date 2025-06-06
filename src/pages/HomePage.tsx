import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  Download, 
  Sparkles, 
  ThumbsUp, 
  LineChart 
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Create ATS-Optimized Resumes <span className="text-gradient">That Get You Hired</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Our AI-powered resume builder helps you create professional, ATS-friendly resumes 
                that catch recruiters' attention and pass through applicant tracking systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/builder" className="btn-primary flex items-center justify-center">
                  <FileText size={18} className="mr-2" />
                  Create Resume
                </Link>
                <Link to="/templates" className="btn-secondary flex items-center justify-center">
                  <Search size={18} className="mr-2" />
                  View Templates
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/main.jpg"
                alt="Resume Builder Preview" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our ATS Resume Builder?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help you create resumes that not only look great 
              but are optimized to pass through Applicant Tracking Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS-Optimized Templates</h3>
              <p className="text-gray-600">
                Our templates are designed to be easily parsed by Applicant Tracking Systems, 
                increasing your chances of getting past the initial screening.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Suggestions</h3>
              <p className="text-gray-600">
                Get intelligent suggestions to improve your resume content, highlighting your achievements 
                and using industry-specific keywords.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Job Description Analyzer</h3>
              <p className="text-gray-600">
                Paste a job description and our tool will analyze it, suggesting keywords and skills 
                to include in your resume for better matching.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Download size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Export Formats</h3>
              <p className="text-gray-600">
                Export your resume in multiple formats including PDF, DOCX, and plain text 
                to be ready for any application process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time ATS Score</h3>
              <p className="text-gray-600">
                Get instant feedback on how well your resume will perform with ATS systems, 
                with specific suggestions for improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <LineChart size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume Analytics</h3>
              <p className="text-gray-600">
                Track the performance of your resume with detailed analytics and insights 
                to help you improve your job application strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Creating an ATS-optimized resume has never been easier. Follow these simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Choose a Template</h3>
              <p className="text-gray-600 mb-4">
                Select from our collection of ATS-friendly resume templates designed for your industry.
              </p>
              <img 
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Fill in Your Details</h3>
              <p className="text-gray-600 mb-4">
                Enter your information and get AI-powered suggestions to improve your content.
              </p>
              <img 
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-4">Download & Apply</h3>
              <p className="text-gray-600 mb-4">
                Export your ATS-optimized resume and start applying to jobs with confidence.
              </p>
              <img 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start creating your ATS-optimized resume today and increase your chances of getting interviews.
          </p>
          <Link to="/builder" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-gray-100 transition-colors">
            Create Your Resume <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;