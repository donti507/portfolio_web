import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DeepDetail } from '../components/deep/DeepDetail';
import { publishedProjects, projectBySlug } from '../data/catalog';
import { deepProjects, type DeepProject } from '../data/deep';
import type { ProjectDetail as Project } from '../data/projects';
import { person } from '../data/site';
import NotFound from './NotFound';

function fromProject(project: Project): DeepProject {
  const sections: DeepProject['sections'] = [
    {id: 'question', title: 'The question', base: ['question'], blocks: []},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What I did', base: ['approach'], blocks: []},
    {id: 'findings', title: 'What I found', base: ['findings'], blocks: []},
    {id: 'limits', title: 'What this does not show', base: ['limits'], blocks: []},
    {id: 'reproduce', title: 'Reproduce it', base: ['reproduce'], blocks: []},
    {id: 'next', title: 'What’s next', base: ['next'], blocks: []},
  ];
  return {
    metrics: project.stats.map(stat => ({label: stat.label, value: stat.value, caption: '', tone: 'primary', icon: 'layers'})),
    sections: sections.filter(section => section.base?.some(field => {
      const value = project[field];
      return typeof value === 'string' ? Boolean(value) : Boolean(value?.length);
    })),
  };
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectBySlug(slug ?? '');
  useEffect(() => {
    document.title = `${project?.shortTitle ?? 'Page not found'} · ${person.name}`;
  }, [project]);
  if (!project) return <NotFound />;
  const index = publishedProjects.indexOf(project);
  return <DeepDetail project={project} content={deepProjects[project.slug] ?? fromProject(project)}
    previous={publishedProjects[index - 1]} next={publishedProjects[index + 1]} />;
}
