import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';

import ProjectList from "../../components/Projects/ProjectList";
import DetailedProjectsList from "../../components/Projects/DetailedProjects";
import ResumeBtn from "../../components/misc/Resume";
import SkillBullets from "../../components/misc/skillBulletList";

import frontEndData from '../../data/frontEnd.json';
import backEndData from '../../data/backend.json';
import miscData from '../../data/misc.json';

import { SkillSet } from '../../types/skillSets';

const frontEnd: SkillSet[] = frontEndData as SkillSet[];
const backEnd: SkillSet[] = backEndData as SkillSet[];
const misc: SkillSet[] = miscData as SkillSet[];

export default function Home() {
  
  const t = useTranslations();
  const locale = useLocale();
  console.log('📍 Active locale:', locale);
  console.log('🗂 Translation:', t('headline'));

  return (
    <main className="p-4 flex flex-col gap-8 row-start-2 items-center ">
      <div className="h-100">
        <div className="flex">
          <div className="p-4 sm:p-8 name max-w-screen-xl mx-auto">
            <p className="text-6xl bold font-[family-name:var(--font-geist-mono)]">{t('name')}</p>
            <h1 className="mt-10 mb-2 text-lg font-[family-name:var(--font-geist-mono)]">{t('headline')}</h1>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              {t?.raw('summary').map((item: string, i: number) => (
                <li key={i} className="text-lg mb-2">{item}</li>
              ))}
            </ol>
            <ResumeBtn />
          </div>
        </div>
        <div className="my-8 max-w-screen-lg mx-auto justify-center flex flex-wrap flex-col md:flex-row">
          <div className="flex-1 min-w-80">
            <Image
              className="grow"
              src="/images/home/programer.svg"
              alt="programer SVG"
              width={800}
              height={800}
              priority
            />
          </div>
          <div className="flex-1 justify-center">
            <h2 className="text-4xl text-center bold py-4 font-semibold font-[family-name:var(--font-geist-mono)]">{t('aboutTitle')}</h2>
            <p className="text-xl">{t('aboutDescription1')}</p>
            <p className="py-6 text-xl">{t('aboutDescription2')}</p>
          </div>
        </div>
      </div>

      <section className="p-4 flex flex-wrap flex-col md:flex-row max-w-screen-xl mx-auto ">
        <div className="flex-1">
          <h2 className="text-4xl bold py-4 font-semibold font-[family-name:var(--font-geist-mono)]">{t('fitTitle')}</h2>
          <p>{t('fitDescription')}</p>
          <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">{t('frontend')}</h3>
          <SkillBullets skillSets={frontEnd} />
          <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">{t('backend')}</h3>
          <SkillBullets skillSets={backEnd} />
          <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">{t('misc')}</h3>
          <SkillBullets skillSets={misc} />
        </div>
        <div className="p-4 sm:mt-28 text-black dark:text-white text-center max-h-48 rounded">
          <p className="text-2xl font-semibold font-[family-name:var(--font-geist-mono)]">{t('colorCode')}</p>
          <p>{t('colorNote')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex-1">
              <div className="max-h-6 my-2 w-full h-full bg-red-200 rounded"></div>
              <div className="max-h-6 my-2 w-full h-full bg-yellow-200 rounded"></div>
              <div className="max-h-6 my-2 w-full h-full bg-green-200 rounded"></div>
            </div>
            <div className="flex-1 text-left">
              <p className="my-2 font-semibold">{t('expert')}</p>
              <p className="my-2 font-semibold">{t('intermediate')}</p>
              <p className="my-2 font-semibold">{t('beginner')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 flex gap-4 flex-row my:8 sm:my-12 max-w-screen-xl mx-auto">
        <div className="grow flex-1">
          <div className="shrink flex-1">
            <h2 className="text-4xl font-semibold pb-4 font-[family-name:var(--font-geist-mono)]">{t('workTitle')}</h2>
            <p className="text-lg">{t('workSummary')}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 mx-auto sm:mt-12">
        <h2 className="text-3xl text-center font-semibold">{t('examplesTitle')}</h2>
        <ProjectList />
      </section>

      <section className="mt-6 mx-auto sm:mt-12 max-w-screen-xl">
        <h2 className="text-3xl text-center bold">{t('projectInfo')}</h2>
        <DetailedProjectsList />
      </section>
    </main>
  );
}
