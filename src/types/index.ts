export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  current?: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location?: string;
  gpa?: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level?: number;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  expirationDate?: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'basic' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom';
  content?: string;
  items: any[];
  visible: boolean;
  required?: boolean;
}

export interface Resume {
  id: string;
  name: string;
  templateId: string;
  personalInfo: PersonalInfo;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  jobDescription?: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  description: string;
  color: string;
  font: string;
  spacing: 'compact' | 'standard' | 'spacious';
  isAtsOptimized: boolean;
}

export interface AtsScoreDetails {
  overall: number;
  sections: {
    [key: string]: {
      score: number;
      feedback: string;
      suggestions: string[];
    }
  };
  keywords: {
    missing: string[];
    found: string[];
  };
}