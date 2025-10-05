// app/[locale]/page.tsx (or wherever this lives)
import { useLocale, useTranslations } from 'next-intl';

import ProjectList from '../../components/Projects/ProjectList';
import ClientHero from '../../components/modern/ClientHero';
import ModernSkills from '../../components/modern/ModernSkills';

import frontEndData from '../../data/frontEnd.json';
import backEndData from '../../data/backend.json';
import miscData from '../../data/misc.json';

import type { SkillSet } from '../../types/skillSets';

const frontEnd: SkillSet[] = frontEndData as SkillSet[];
const backEnd: SkillSet[] = backEndData as SkillSet[];
const misc: SkillSet[] = miscData as SkillSet[];

export default function Home() {
  // Page-level namespaces
  const tHome = useTranslations('home');     // work/explore sections
  const locale = useLocale();

  return (
    <main className="flex flex-col">
      {/* Hero & About Sections – no props needed now */}
      <ClientHero key={`hero-${locale}`} />
      <section id="skills" >
        {/* Skills Section */}
        <ModernSkills
          key={`skills-${locale}`}
          frontEnd={frontEnd}
          backEnd={backEnd}
          misc={misc}
        />
      </section>
      {/* Work Experience Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-4xl font-semibold font-[family-name:var(--font-geist-mono)] mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {tHome('workTitle')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
              {tHome('workSummary')}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-[family-name:var(--font-geist-mono)] mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {tHome('examplesTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {tHome('examplesSubtitle')}
            </p>
          </div>

          {/* Modern Project Cards */}
          <ProjectList />
        </div>
      </section>
    </main>
  );
}
