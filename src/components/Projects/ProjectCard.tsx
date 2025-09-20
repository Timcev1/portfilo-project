'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink, Eye, ArrowRight, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Project } from '../../types/project';

interface Props {
  project: Project;
  onViewDetails: (project: Project) => void;
}

// Optional: if you split messages, pass a namespace like useTranslations('projects')
// and then call safeT('imageAlt')
function useSafeT(ns?: Parameters<typeof useTranslations>[0]) {
  const t = useTranslations(ns as any);
  return (key: string, fallback?: string, values?: Record<string, any>) => {
    try {
      return t(key as any, values as any);
    } catch {
      // If key is missing and provider isn't configured with getMessageFallback,
      // gracefully return provided fallback or the key itself
      return fallback ?? key;
    }
  };
}

export default function ModernProjectCard({ project, onViewDetails }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // If you use namespaces, e.g. messages have { "projects": { ... } },
  // you can do: const t = useSafeT('projects');
  const t = useSafeT();

  const getHighlight = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('nielsen')) {
      return { text: t('badges.enterprise', 'Enterprise'), color: 'from-blue-500 to-cyan-400' };
    }
    if (lower.includes('athlean') && lower.includes('portal')) {
      return { text: t('badges.pwa', 'PWA App'), color: 'from-purple-500 to-indigo-400' };
    }
    if (lower.includes('athlean')) {
      return { text: t('badges.highTraffic', 'High Traffic'), color: 'from-red-500 to-pink-400' };
    }
    return { text: t('badges.customBuild', 'Custom Build'), color: 'from-green-500 to-emerald-400' };
  };

  const highlight = getHighlight(project.title);

  // If your messages store descriptions by key, e.g. "projects.foo.description"
  // and your project.description_key is that key, this pulls it with graceful fallback.
  const description = t(project.description_key, project.description_key) as string;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 focus-within:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${t('projects.imageAlt', 'project preview')}`}
          width={project.width}
          height={project.height}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Highlight Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${highlight.color} text-white text-sm font-bold rounded-full shadow-lg`}
          aria-label={t('projects.highlight', 'Project highlight')}
        >
          {highlight.text}
        </div>

        {/* Hover / Focus Actions */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={t('projects.viewDetails', 'View details')}
          >
            <Eye className="w-4 h-4" />
            {t('projects.viewDetails', 'View details')}
          </button>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`${t('projects.liveSite', 'Live site')}: ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
              {t('projects.liveSite', 'Live site')}
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <Star className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technology Tags */}
        {!!project.technologies?.length && (
          <div className="flex flex-wrap gap-2 mb-4" aria-label={t('projects.techStack', 'Tech stack')}>
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                +{project.technologies.length - 4} {t('projects.more', 'more')}
              </span>
            )}
          </div>
        )}

        {/* View More Button */}
        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group-hover:translate-x-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          {t('projects.learnMore', 'Learn more')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
