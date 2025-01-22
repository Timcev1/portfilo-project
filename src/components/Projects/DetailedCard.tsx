import Image from 'next/image';

import { Project } from '../../types/project';

interface Props {
  project: Project;
}

export default function DetailedCard({ project }: Props) {

  return (
    <div key={project.id} 
      className="flex flex-wrap relative group shadow-md p-4 rounded-lg overflow-hidden align-left justify-center"
    >
      <div className="min-w-80 max-w-96">
        <Image 
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={project.width}
            height={project.height}
            className="rounded m-auto"
        />
        {project.url && 
          (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-center block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded">
              Visit {project.title}
            </a>
          )
        }
      </div>
      <div className="px-4 flex-1">
        <h3 className="pb-4 projectTitle text-3xl font-semibold text-black dark:text-white">{project.title}</h3>
        <ul className="flex flex-wrap gap-2 pb-4">
          <p className="py-2">Technologies used:</p>
          {project.technologies.map((tech: string, index: number) => (
            <li className="self-center font-bold p-2 text-xs bg-slate-200 text-black rounded" key={index}>{tech}</li>
          ))}
        </ul>
        <p className="projectDescription mt-2 text-md">{project.indepth ? project.indepth : project.description}</p>
        {project.bullets && project.bullets.map((tech: string, index: number) => (
          <li
            className="self-center p-2 text-sm text-black dark:text-white rounded"
            key={index}
          >
            {tech}
          </li>
        ))}

      </div>
    </div>
  );
}
