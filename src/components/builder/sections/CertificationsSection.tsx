import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Section, CertificationItem } from '../../../types';
import { Plus, Trash2, Calendar, Award, Globe } from 'lucide-react';

interface CertificationsSectionProps {
  section: Section;
}

const defaultCertificationItem: CertificationItem = {
  name: '',
  issuer: '',
  date: '',
  link: '',
  expirationDate: ''
};

const CertificationsSection = ({ section }: CertificationsSectionProps) => {
  const { addItem, removeItem } = useResume();
  const [newItem, setNewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<CertificationItem>(defaultCertificationItem);
  
  const handleAddItem = () => {
    setNewItem(true);
    setCurrentItem(defaultCertificationItem);
  };
  
  const handleCancelAdd = () => {
    setNewItem(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    addItem(section.id, currentItem);
    setNewItem(false);
    setCurrentItem(defaultCertificationItem);
  };
  
  const handleDelete = (index: number) => {
    removeItem(section.id, index);
  };

  return (
    <div>
      <div className="mb-4">
        {section.items.length === 0 && !newItem && (
          <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No certifications added yet</p>
            <button 
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Certification
            </button>
          </div>
        )}
        
        {section.items.map((item, index) => {
          const certItem = item as CertificationItem;
          return (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{certItem.name}</h4>
                  <div className="text-sm text-gray-600">
                    {certItem.issuer}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {certItem.date}
                  {certItem.expirationDate && ` - ${certItem.expirationDate}`}
                </div>
              </div>
              
              {certItem.link && (
                <div className="text-sm">
                  <a 
                    href={certItem.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <Globe size={14} className="mr-1" />
                    View Credential
                  </a>
                </div>
              )}
              
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        
        {section.items.length > 0 && !newItem && (
          <button 
            onClick={handleAddItem}
            className="mt-4 flex items-center justify-center w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-600 hover:text-blue-700 hover:border-blue-300 transition-colors duration-200"
          >
            <Plus size={16} className="mr-1" />
            <span>Add Another Certification</span>
          </button>
        )}
      </div>
      
      {newItem && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium mb-4">Add Certification</h4>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Award size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="e.g. AWS Certified Solutions Architect"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization*
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={currentItem.issuer}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Amazon Web Services"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={currentItem.date}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. May 2022"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={currentItem.expirationDate}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. May 2025 or No Expiration"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Credential URL <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe size={16} className="text-gray-400" />
              </div>
              <input
                type="url"
                id="link"
                name="link"
                value={currentItem.link}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="e.g. https://www.credential.net/..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancelAdd}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
              disabled={!currentItem.name || !currentItem.issuer || !currentItem.date}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;