import DetailedCard from './DetailedCard';
import projects from '../../data/projects.json';

export default function DetailedProjectsList() {
  return (
    <div className="flex flex-wrap gap-4 flex-col">
      {projects.map((project) => (
        <DetailedCard key={project.id} project={project} />
      ))}
    </div>
  );
}
