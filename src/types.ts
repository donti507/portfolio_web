export type PageType = 
  | 'home' 
  | 'research' 
  | 'projects' 
  | 'certifications' 
  | 'experience' 
  | 'photography' 
  | 'education' 
  | 'contact'
  | 'project-banglatruth'
  | 'project-credit-risk'
  | 'project-zen-os'
  | 'project-alan-neuronet'
  | 'project-budgetaware-hpo'
  | 'project-remote-sensing-flood'
  | 'project-multilingual-sentiment';

export interface ProgressCardItem {
  name: string;
  category: string;
  progress: number;
  status: string;
}

export interface Publication {
  type: 'book' | 'conference' | 'journal' | 'progress';
  status: string;
  title: string;
  authors: string;
  publisher?: string;
  venue?: string;
  note?: string;
  target?: string;
  actions?: {
    doi?: string;
    pdf?: string;
    dataset?: string;
    cite?: string;
    preprint?: string;
  };
}

export interface Project {
  title: string;
  category: string;
  status: string;
  date?: string;
  description: string;
  tags: string[];
  github?: string;
  organization?: string;
  featured: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  category: 'ai' | 'enterprise' | 'network' | 'competitions';
  link?: string;
}

export interface ExperienceItem {
  date: string;
  role: string;
  organization: string;
  description: string;
}

export interface PhotographyItem {
  id: string;
  title: string;
  description: string;
  category: 'Science Events' | 'Wroclaw' | 'Nature' | 'Travel';
  imageUrl: string;
  altText: string;
}
