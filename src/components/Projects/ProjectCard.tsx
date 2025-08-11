'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Project } from '../../types/project';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div key={project.id} 
      className="flex flex-col relative group shadow-md p-4 rounded-lg overflow-hidden items-center"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={handleToggle}
    >
        
        <Image 
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={project.width}
            height={project.height}
            style={{ height: 'auto' }}
            className="rounded transition-transform duration-300 transform group-hover:scale-105"
        />
        <h3 className="projectTitle text-xl font-semibold text-center text-black dark:text-white">{project.title}</h3>
        <div
            className={`absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-white transition-opacity duration-300 ${
                isActive  ? 'opacity-100' : 'opacity-0'
            }`}
        >
        <p className="projectDescription mt-2 text-sm text-center">{project.description}</p>
      </div>
    </div>
  );
}
