'use client';

import { useCallback, useState } from 'react';
import ModernProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import projectsData from '../../data/projects.json';
import type { Project } from '../../types/project';

// If your JSON is trusted, assert the type:
const projects = projectsData as Project[];

export default function ModernProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto max-w-screen-xxl">
        {projects.map((project) => (
          <ModernProjectCard
            key={project.id}
            project={project}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
