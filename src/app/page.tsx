import Image from "next/image";

import ProjectList from "../components/Projects/ProjectList";
import DetailedProjectsList from "../components/Projects/DetailedProjects";
import ResumeBtn from "../components/misc/Resume";
import SkillBullets from "../components/misc/skillBulletList";


import frontEndData from '../data/frontEnd.json';
import backEndData from '../data/backend.json';
import miscData from '../data/misc.json';

import { SkillSet } from '../types/skillSets';


const frontEnd: SkillSet[] = frontEndData as SkillSet[];
const backEnd: SkillSet[] = backEndData as SkillSet[];
const misc: SkillSet[] = miscData as SkillSet[];


export default function Home() {
  
  return (
      <main className="p-4 flex flex-col gap-8 row-start-2 items-center ">
        <div className="h-100">
          <div className="flex">
            <div className="p-8 name max-w-screen-xl  mx-auto">
              <p className="text-6xl bold font-[family-name:var(--font-geist-mono)]">Timothy<br></br> Cevallos</p>
              <h1 className="mt-10 mb-2 text-lg font-[family-name:var(--font-geist-mono)]">Comprehensive Website Solutions: Development, Deployment, and Maintenance Tailored to Your Needs, Big or Small.</h1>
              <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="text-lg mb-2">7+ Years of Expertise in Building and Enhancing Websites, Delivering Results That Drive Success.</li>
                <li className="text-lg mb-2">Proven Success in Managing High-Traffic Websites with Hundreds of Thousands of Daily Visitors</li>
                <li className="text-lg" >Versatile Developer Skilled in Frontend and Backend Programming Across Diverse Languages.</li>
              </ol>
              <ResumeBtn />
            </div>
          </div>
          <div className="my-8 max-w-screen-lg  mx-auto justify-center flex flex-wrap flex-col md:flex-row">
            <div className="flex-1 min-w-80	">
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
                <h2 className="text-4xl text-center bold py-4 font-semibold font-[family-name:var(--font-geist-mono)]">About Me</h2>
                <p className="text-xl">I am a self-taught full-stack web developer with substantial experience in developing web applications and creating responsive user interfaces. As a technically minded professional, I thrive on solving problems of any scale, always finding solutions to even the most challenging questions.</p>
                <p className="py-6 text-xl">In my free time, I strive for balance in all aspects of life. You&apos;ll often find me experimenting in the kitchen, tending to my garden, or staying active and fit.</p>
              </div>
            </div>
          </div>
          <section className="p-4 flex flex-wrap flex-col md:flex-row max-w-screen-xl mx-auto ">
            <div className="flex-1">
              <h2 className="text-4xl bold py-4 font-semibold font-[family-name:var(--font-geist-mono)]">Am I a fit for you?</h2>
              <p>Explore an overview of my technological skills—this list is not exhaustive but highlights my expertise. If a specific skill or technology isn’t mentioned, rest assured I’m a quick learner and can adapt to meet your needs.</p>
              <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">Front End Skills</h3>
              <SkillBullets skillSets={frontEnd} />
              <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">Back End Skills</h3>
              <SkillBullets skillSets={backEnd} />
              <h3 className="text-2xl text-center bold pt-4 font-semibold font-[family-name:var(--font-geist-mono)]">Misc Skills</h3>
              <SkillBullets skillSets={misc} />
            </div>
            <div className="p-4 sm:mt-28 text-black dark:text-white text-center max-h-48	rounded">
              <p className="text-2xl font-semibold font-[family-name:var(--font-geist-mono)]">Color Code</p>
              <p>The color explains the level of knowledge.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className=" flex-1">
                  <div className="max-h-6	my-2 w-full h-full bg-red-200 rounded"></div>
                  <div className="max-h-6	my-2 w-full h-full bg-yellow-200 rounded"></div>
                  <div className="max-h-6	my-2 w-full h-full bg-green-200 rounded"></div>
                </div>
                <div className=" flex-1 text-left">
                  <p className="my-2 font-semibold"> -  Expert</p>
                  <p className="my-2 font-semibold"> -  Intermediate</p>
                  <p className="my-2 font-semibold"> -  Beginner</p>
                </div>
              </div>
             
            </div>
            
          </section>
          <section className="p-4 flex gap-4 flex-row my-12 max-w-screen-xl mx-auto">
            <div className="grow flex-1">
              
            <div className="shrink flex-1">
              <h2 className="text-4xl font-semibold pb-4 font-[family-name:var(--font-geist-mono)]">Overview of Work Experience</h2>
              <p className="text-lg">Skilled in leading full-stack development efforts, optimizing backend infrastructure, and leveraging WordPress and WooCommerce for 
custom site functionality. Proven ability to enhance user engagement and satisfaction through mobile-first website updates and the 
seamless integration of multimedia features. Expertise in delivering high-performance and custom web solutions by utilizing modern 
technologies like Alpine JS, Tailwind CSS, PHP, and Laravel. Adept at streamlining project timelines, resolving performance issues, and 
aligning technical solutions with business objectives. Well-versed in driving operational improvements through full backend or frontend overhauls.</p>
         
            </div>
            
          </div>
        </section>
        <section className="mt-6 mx-auto sm:mt-12">
          <h2 className="text-3xl	text-center font-semibold">Public Examples of Work</h2>
          <ProjectList />
        </section>
        <section className="mt-6 mx-auto sm:mt-12 max-w-screen-xl">
          <h2 className="text-3xl text-center bold">Project Information</h2>
          <DetailedProjectsList />
        </section>
      </main>
  );
}
