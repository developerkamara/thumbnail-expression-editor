import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  originalImageUrl: string | null | undefined;
  generatedImageUrl: string | null;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold">Cooper AI is working its magic...</p>
        <p className="text-sm">This may take a moment.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-semibold">Your edited thumbnail will appear here.</p>
        <p className="text-sm">Upload an image and provide a prompt to get started.</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, originalImageUrl, generatedImageUrl, error }) => {
  return (
    <div className="w-full h-full min-h-[30rem] lg:min-h-0 flex items-center justify-center bg-gray-900/50 rounded-lg p-4 border border-gray-700">
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
        <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {!isLoading && !error && generatedImageUrl && originalImageUrl && (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-400">Original</h3>
              <img src={originalImageUrl} alt="Original thumbnail" className="w-full object-contain rounded-lg shadow-lg max-h-96" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-400">Generated</h3>
              <img src={generatedImageUrl} alt="Generated result" className="w-full object-contain rounded-lg shadow-lg max-h-96" />
            </div>
          </div>
          <a
            href={generatedImageUrl}
            download="edited-thumbnail.png"
            className="mt-2 inline-flex items-center gap-2 px-6 py-2 text-md font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Generated Image
          </a>
        </div>
      )}
      {!isLoading && !error && !generatedImageUrl && <Placeholder />}
    </div>
  );
};
