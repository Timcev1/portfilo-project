import React from 'react';

import { SkillSet } from '../../types/skillSets';


interface Props {
  skillSets: SkillSet[];
}

export default function ProjectList({ skillSets }: Props) {
  const levelColors = {
    Beginner: 'bg-green-200',
    Intermediate: 'bg-yellow-200',
    Expert: 'bg-red-200',
  };

  return (
    <div className="my-4">
      <ul className="flex flex-wrap flex-1 gap-4">
        {skillSets.map((skillSet) => (
          <li key={skillSet.id} className={` ${levelColors[skillSet.level]} self-center font-bold p-2 text-xs text-black rounded transition-transform duration-300 transform hover:scale-105`}>
            <span className="text-lg font-semibold">{skillSet.skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
