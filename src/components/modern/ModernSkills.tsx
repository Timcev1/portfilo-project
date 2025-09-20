'use client';

import { useState, useMemo } from 'react';
import { Code, Server, Wrench, Star, Award, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { SkillSet } from '../../types/skillSets';

type Props = {
  frontEnd: SkillSet[];
  backEnd: SkillSet[];
  misc: SkillSet[];
};

type LevelKey = 'expert' | 'intermediate' | 'beginner';

function normalizeLevel(level: string): LevelKey {
  const l = level.toLowerCase();
  if (l.startsWith('exp')) return 'expert';
  if (l.startsWith('int')) return 'intermediate';
  return 'beginner';
}

function levelMeta(level: LevelKey) {
  switch (level) {
    case 'expert':
      return { pct: 100, icon: <Award className="w-4 h-4 text-green-600 dark:text-green-400" />, color: 'text-green-600 dark:text-green-400' };
    case 'intermediate':
      return { pct: 80, icon: <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />, color: 'text-yellow-600 dark:text-yellow-400' };
    default:
      return { pct: 60, icon: <Star className="w-4 h-4 text-red-600 dark:text-red-400" />, color: 'text-red-600 dark:text-red-400' };
  }
}

const SkillCard = ({ skill, gradient, levelLabel, levelPct, levelIcon, levelColor }:{
  skill: SkillSet;
  gradient: string;
  levelLabel: string;
  levelPct: number;
  levelIcon: React.ReactNode;
  levelColor: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{skill.skill}</h3>
          <div className="flex items-center gap-2">{levelIcon}</div>
        </div>

        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize font-medium">{levelLabel}</span>
            <span className={`text-sm font-bold ${levelColor}`}>{levelPct}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out origin-left`}
              style={{ width: isHovered ? `${levelPct}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CategorySection = ({
  title,
  description,
  skills,
  gradients,
  icon,
}: {
  title: string;
  description: string;
  skills: SkillSet[];
  gradients: string[];
  icon: React.ReactNode;
}) => {
  const t = useTranslations('skills');
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradients[0]} text-white`}>{icon}</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map((skill, idx) => {
          const levelKey = normalizeLevel(skill.level);
          const { pct, icon: levelIcon, color } = levelMeta(levelKey);
          const levelLabel = t(`levels.${levelKey}`);
          return (
            <SkillCard
              key={`${skill.skill}-${idx}`}
              skill={skill}
              gradient={gradients[idx % gradients.length]}
              levelLabel={levelLabel}
              levelPct={pct}
              levelIcon={levelIcon}
              levelColor={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function ModernSkills({ frontEnd, backEnd, misc }: Props) {
  const t = useTranslations('skills');

  const categories = useMemo(
    () => [
      {
        key: 'frontend',
        icon: <Code className="w-6 h-6" />,
        gradients: ['from-blue-500 to-cyan-400', 'from-purple-500 to-pink-400', 'from-indigo-500 to-blue-400', 'from-cyan-500 to-teal-400'],
        skills: frontEnd,
      },
      {
        key: 'backend',
        icon: <Server className="w-6 h-6" />,
        gradients: ['from-purple-500 to-indigo-500', 'from-red-500 to-pink-500', 'from-orange-500 to-red-400', 'from-violet-500 to-purple-400'],
        skills: backEnd,
      },
      {
        key: 'misc',
        icon: <Wrench className="w-6 h-6" />,
        gradients: ['from-green-500 to-emerald-400', 'from-orange-500 to-yellow-400', 'from-pink-500 to-rose-400', 'from-teal-500 to-cyan-400'],
        skills: misc,
      },
    ],
    [frontEnd, backEnd, misc]
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-geist-mono)] mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('fitTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('fitDescription')}
          </p>
        </div>


       {/* Legend */}
        <div className="my-16 flex justify-center">
          <div className="w-full max-w-lg bg-white dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl font-semibold font-[family-name:var(--font-geist-mono)] text-center mb-6 text-gray-800 dark:text-gray-200">
              {t('legend.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              {t('legend.note')}
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-800 dark:text-green-200">{t('levels.expert')}</span>
                </div>
                <span className="text-green-600 dark:text-green-400 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">{t('levels.intermediate')}</span>
                </div>
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">80%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="font-semibold text-red-800 dark:text-red-200">{t('levels.beginner')}</span>
                </div>
                <span className="text-red-600 dark:text-red-400 font-bold">60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.map((c) => (
          <CategorySection
            key={c.key}
            title={t(`categories.${c.key}.title`)}
            description={t(`categories.${c.key}.description`)}
            skills={c.skills}
            gradients={c.gradients}
            icon={c.icon}
          />
        ))}

       
      </div>
    </section>
  );
}
