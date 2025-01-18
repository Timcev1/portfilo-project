export type Project = {
    id: number;
    title?: string;
    category: string;
    image: string;
    url?: string;
    width: number;
    height: number;
    description: string;
    technologies: string[];
    bullets?: string[];
    indepth?: string;
  };
