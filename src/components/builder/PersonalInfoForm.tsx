import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfo } from '../../types';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resume, updateResume } = useResume();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(resume.personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = () => {
    updateResume({ personalInfo });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="john.doe@example.com"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="(123) 456-7890"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="City, State"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin size={16} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input-field pl-10"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
          GitHub <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Github size={16} className="text-gray-400" />
          </div>
          <input
            type="url"
            id="github"
            name="github"
            value={personalInfo.github}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input-field pl-10"
            placeholder="https://github.com/username"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;