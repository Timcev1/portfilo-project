import React from 'react';

export default function ResumeButton() {
  return (
    <div className="text-center my-4">
      <a
        href="/files/TC-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        View My Resume
      </a>
    </div>
  );
}
