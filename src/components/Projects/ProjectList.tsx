import ProjectCard from './ProjectCard';
import projects from '../../data/projects.json';

export default function ProjectsList() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
