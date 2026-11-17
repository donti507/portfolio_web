import { projects } from './projects';
import { experience } from './site';

export const publishedProjects = projects.filter(project => !project.verify);
export const publishedExperience = experience.filter(entry => !entry.verify);
export const projectBySlug = (slug: string) => publishedProjects.find(project => project.slug === slug);
