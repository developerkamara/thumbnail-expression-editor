
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-7.19c-2.818.064-5.5.93-7.67 2.61a.75.75 0 0 1-1.06-1.06c1.559-1.56 3.476-2.596 5.508-3.04a.75.75 0 0 1 .63.313A7.49 7.49 0 0 1 9.315 7.584Z" clipRule="evenodd" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center py-4">
           <SparklesIcon className="w-8 h-8 text-indigo-400 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
             Cooper Kamara AI Thumbnail Expression Editor
          </h1>
        </div>
      </div>
    </header>
  );
};
