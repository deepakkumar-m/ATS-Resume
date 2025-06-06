import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Users, Shield, Award, FileText } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12 fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">About ATS Resume</h1>
            <p className="text-xl mb-6">
              We're on a mission to help job seekers create resumes that get past ATS systems 
              and into the hands of recruiters.
            </p>
            <Link to="/builder" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-gray-100 transition-colors">
              Start Building <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-700 mb-4">
                ATS Resume was founded with a vision to democratize the job application process. We believe that every job seeker deserves access to professional-grade tools that help them showcase their talents effectively.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform is designed to bridge the gap between talented professionals and their dream jobs by providing a powerful, yet easy-to-use resume builder that optimizes for modern ATS systems.
              </p>
              <p className="text-gray-700">
                Today, we continue to innovate and improve our platform, making it easier for job seekers to create compelling resumes that tell their professional story effectively.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team working together" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Meet the Creator</h2>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img 
                  src="/profile.jpg" 
                  alt="Deepakkumar Manivannan" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Deepakkumar Manivannan</h3>
              <p className="text-gray-600 mb-2">GenAI DevOps Engineer</p>
              <p className="text-gray-700 text-sm max-w-lg mx-auto">
                Passionate about creating tools that make a difference in people's lives. 
                Specialized in web development and user experience design with a focus on 
                building practical solutions for real-world problems.
              </p>
              
              <div className="flex justify-center gap-4 mt-4">
                <a 
                  href="https://github.com/deepakkumar-m" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/deepakkumar-manivannan/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://twitter.com/Deepak_kumarm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your ATS-Optimized Resume?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed interviews with resumes created using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder" className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-gray-100 transition-colors">
              <FileText size={18} className="mr-2" />
              Create Your Resume
            </Link>
            <Link to="/templates" className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-800 transition-colors">
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;