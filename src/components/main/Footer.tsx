'use client';

import { FaLinkedin, FaGithub } from 'react-icons/fa';


export default function footer() {
    const currentYear = new Date().getFullYear();
    
  return (
    <footer className="p-4 mt-14 border-t-2 border-indigo-500">
        <div className=" gap-6 mx-auto max-w-screen-xl w-full">
            <div className="flex items-center justify-center gap-6 flex-wrap grow">
                
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/timothy-cevallos/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={30} />
                    </a>
                    <a href="https://github.com/timcev1" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={30} />
                    </a>
                </div>
            </div>
            <div className="text-center sm:text-left text-xs">
                <p>&copy; {currentYear} - Cevallos Systems. All rights reserved.</p>
            </div>
            
        </div>
  </footer>
  );
}
