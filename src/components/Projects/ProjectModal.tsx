'use client';

import { useEffect, useMemo, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Users, Zap, CheckCircle } from 'lucide-react';
import { useTranslations, useMessages } from 'next-intl';
import type { Project } from '../../types/project';

type TranslationValue = string | number | Date;

interface Props {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

// Small helper: returns the key (or provided fallback) if the message is missing
function useSafeT(ns?: Parameters<typeof useTranslations>[0]) {
  const t = useTranslations(ns);
  return (key: string, fallback?: string, values?: Record<string, TranslationValue>): string => {
    try {
      // next-intl's t returns string here; coerce defensively to string just in case
      const result = values ? t(key, values) : t(key);
      return typeof result === 'string' ? result : String(result);
    } catch {
      return fallback ?? key;
    }
  };
}

// Helper to access a deep value by dot-path from the messages object
function getByPath(obj: unknown, path: string | undefined): unknown {
  if (!obj || !path) return undefined;
  return path.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

type Highlight = { text: string; color: string; icon: ReactNode };

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  const t = useSafeT();           // or useSafeT('projects') if you use a "projects" namespace
  const messages = useMessages(); // raw messages object provided by NextIntlClientProvider

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Bullets: read arrays directly from messages; if a string, split it
  // MUST be before any conditional returns to follow Rules of Hooks
  const bullets = useMemo(() => {
    const value = getByPath(messages, project.bullets_key);
    if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
    if (typeof value === 'string') {
      return value.split(/\r?\n|•/).map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, [messages, project.bullets_key]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Focus the close button when opening
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  const getHighlight = (title: string): Highlight => {
    const lower = title.toLowerCase();
    if (lower.includes('nielsen'))
      return { text: t('badges.enterprise', 'Enterprise'), color: 'from-blue-500 to-cyan-400', icon: <Users className="w-5 h-5" /> };
    if (lower.includes('athlean') && lower.includes('portal'))
      return { text: t('badges.pwa', 'PWA App'), color: 'from-purple-500 to-indigo-400', icon: <CheckCircle className="w-5 h-5" /> };
    if (lower.includes('athlean'))
      return { text: t('badges.highTraffic', 'High Traffic'), color: 'from-red-500 to-pink-400', icon: <Zap className="w-5 h-5" /> };
    return { text: t('badges.customBuild', 'Custom Build'), color: 'from-green-500 to-emerald-400', icon: <CheckCircle className="w-5 h-5" /> };
  };

  const highlight = getHighlight(project.title);

  // Copy from i18n with graceful fallbacks
  const indepth = t(project.indepth_key, project.indepth_key);
  const description = t(project.description_key, project.description_key);

  // Close when clicking backdrop only (not inner content)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t('projects.modalTitle', 'Project details')}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} — ${t('projects.imageAlt', 'project preview')}`}
              width={project.width}
              height={project.height}
              className="w-full h-full object-cover"
              sizes="(min-width: 1280px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Close Button */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={t('projects.close', 'Close')}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Project Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${highlight.color} text-white text-sm font-bold rounded-full mb-3`}>
                  {highlight.icon}
                  {highlight.text}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              </div>
              <div className="flex gap-3">
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
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {t('projects.overview', 'Project Overview')}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {indepth || description}
              </p>

              {/* Key Features */}
              {bullets.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {t('projects.keyFeatures', 'Key Features')}
                  </h4>
                  <ul className="space-y-2">
                    {bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {t('projects.techUsed', 'Technologies Used')}
                </h4>
                <div className="flex flex-wrap gap-2" aria-label={t('projects.techStack', 'Tech stack')}>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`${tech}-${index}`}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Impact */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {t('projects.impact', 'Project Impact')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {t('projects.ux', 'User Experience')}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('projects.uxNote', 'Enhanced usability')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {t('projects.performance', 'Performance')}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('projects.performanceNote', 'Optimized loading')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* /Sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
}