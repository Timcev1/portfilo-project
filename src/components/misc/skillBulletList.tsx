import React from 'react';

interface skillSet {
  id: number;
  name: string;
  skill: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  url: string;
}

interface Props {
  skillSets: skillSet[];
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
          <li key={skillSet.id} className={` ${levelColors[skillSet.level]} self-center font-bold p-2 text-xs text-black rounded`}>
            <h3 className="text-lg font-semibold">{skillSet.skill}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
