
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ResultDisplay } from './components/ResultDisplay';
import { editImageWithPrompt } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import type { UploadedImage } from './types';
import { PRESET_PROMPTS } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        file: file,
        previewUrl: reader.result as string,
      });
      setGeneratedImage(null); // Clear previous result on new upload
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage.file);
      const resultBase64 = await editImageWithPrompt(imagePart.inlineData.data, imagePart.inlineData.mimeType, prompt);
      const imageUrl = `data:image/png;base64,${resultBase64}`;
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the image.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const handlePresetPrompt = (preset: string) => {
    setPrompt(preset);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-6 h-fit">
            <h2 className="text-2xl font-bold text-indigo-400">1. Upload your Thumbnail</h2>
            <ImageUploader onImageUpload={handleImageUpload} imagePreviewUrl={originalImage?.previewUrl} />
            
            <h2 className="text-2xl font-bold text-indigo-400 mt-4">2. Describe the Expression</h2>
            <PromptControls 
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isReady={!!originalImage && !!prompt}
              onPresetSelect={handlePresetPrompt}
              presets={PRESET_PROMPTS}
            />
          </div>

          {/* Right Column: Results */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
             <h2 className="text-2xl font-bold text-indigo-400 mb-6">3. See the Result</h2>
             <ResultDisplay 
                isLoading={isLoading} 
                generatedImageUrl={generatedImage} 
                error={error} 
              />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Kamara Cooper Tech Solution Group.</p>
      </footer>
    </div>
  );
};

export default App;
