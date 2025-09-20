'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Code, Smartphone, Server, Palette, Users } from 'lucide-react';
import Image from 'next/image';
import ResumeBtn from '../misc/Resume';
import { useTranslations, useMessages } from 'next-intl';

function useSafeT(ns?: Parameters<typeof useTranslations>[0]) {
  const t = useTranslations(ns as any);
  return (key: string, fallback?: string, values?: Record<string, any>) => {
    try {
      return t(key as any, values as any);
    } catch {
      return fallback ?? key;
    }
  };
}

// Read a nested value (incl. arrays) by dot path from messages
function getByPath(obj: any, path?: string) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((o, k) => (o && k in o ? (o as any)[k] : undefined), obj);
}

export default function ClientHero() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // i18n
  const t = useSafeT('hero');
  const messages = useMessages();

  // Pull array fields directly from messages
  const summary: string[] = useMemo(() => {
    const arr = getByPath(messages, 'hero.summary');
    return Array.isArray(arr) ? arr : [];
  }, [messages]);

  // Services from messages (title + description)
  const services = useMemo(
    () => [
      {
        icon: <Code className="w-6 h-6" />,
        title: t('services.frontend.title', 'Frontend'),
        description: t('services.frontend.desc', 'React, Next.js, TailwindCSS'),
      },
      {
        icon: <Server className="w-6 h-6" />,
        title: t('services.backend.title', 'Backend'),
        description: t('services.backend.desc', 'PHP, Laravel, WordPress'),
      },
      {
        icon: <Smartphone className="w-6 h-6" />,
        title: t('services.mobile.title', 'Mobile-First'),
        description: t('services.mobile.desc', 'Responsive Design'),
      },
      {
        icon: <Palette className="w-6 h-6" />,
        title: t('services.uiux.title', 'UI/UX'),
        description: t('services.uiux.desc', 'Modern Interfaces'),
      },
    ],
    [t]
  );

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SSR hydration guard
  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <p className="text-6xl lg:text-7xl font-bold font-[family-name:var(--font-geist-mono)] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('name', 'Your Name')}
            </p>
            <h1 className="text-xl lg:text-2xl font-[family-name:var(--font-geist-mono)] text-gray-700 dark:text-gray-300">
              {t('headline', 'Full Stack Web Developer')}
            </h1>
            <ol className="list-inside list-decimal text-lg space-y-2 font-[family-name:var(--font-geist-mono)] text-gray-600 dark:text-gray-400">
              {summary.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ol>
            <div className="pt-4">
              <ResumeBtn />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <Image
                className="w-full h-auto"
                src="/images/home/programer.svg"
                alt={t('imageAlt', 'Developer illustration')}
                width={600}
                height={600}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background:
              'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
          }}
        />

        <div className="relative z-10 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="animate-fadeInUp">
              <p className="text-6xl lg:text-7xl font-bold font-[family-name:var(--font-geist-mono)] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('name', 'Your Name')}
              </p>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-xl lg:text-2xl font-[family-name:var(--font-geist-mono)] text-gray-700 dark:text-gray-300">
                {t('headline', 'Full Stack Web Developer')}
              </h1>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <ol className="list-inside list-decimal text-lg space-y-2 font-[family-name:var(--font-geist-mono)] text-gray-600 dark:text-gray-400">
                {summary.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            </div>

            <div className="animate-fadeInUp pt-4" style={{ animationDelay: '0.6s' }}>
              <ResumeBtn />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <div className="p-4 bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{t('stats.years.value', '7+')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.years.label', 'Years Experience')}</div>
              </div>
              <div className="p-4 bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{t('stats.visitors.value', '100k+')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.visitors.label', 'Daily Visitors')}</div>
              </div>
              <div className="p-4 bg-white/70 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">{t('stats.projects.value', '50+')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.projects.label', 'Projects')}</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end animate-fadeInUp" style={{ animationDelay: '1s' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
                <Image
                  className="w-full h-auto"
                  src="/images/home/programer.svg"
                  alt={t('imageAlt', 'Developer illustration')}
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold font-[family-name:var(--font-geist-mono)] mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('about.title', 'About Me')}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {t('about.description1', 'First paragraph about me...')}
              </p>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.description2', 'Second paragraph about me...')}
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-blue-600 dark:text-blue-400 mb-2 flex justify-center">{service.icon}</div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{service.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{service.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl backdrop-blur-lg border border-gray-200 dark:border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {t('cta.title', 'Ready to Work Together?')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{t('cta.subtitle', "Let's build something amazing")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
