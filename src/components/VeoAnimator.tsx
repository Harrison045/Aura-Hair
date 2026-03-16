import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Play, Loader2, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function VeoAnimator() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setVideoUrl(null);
      setError(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const getApiKey = () => {
    // Try to get the API key from Vite env or process.env
    try {
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {
      // Ignore
    }
    return import.meta.env.VITE_GEMINI_API_KEY || (window as any).process?.env?.API_KEY || '';
  };

  const handleGenerate = async () => {
    if (!file) return;

    try {
      setError(null);
      setIsGenerating(true);
      setStatusMessage('Checking API Key...');

      // Check for API key selection via AI Studio platform
      if (typeof (window as any).aistudio !== 'undefined') {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setStatusMessage('Please select an API key to continue.');
          await (window as any).aistudio.openSelectKey();
          // Assume success after opening dialog to avoid race conditions
        }
      }

      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error("API Key not found. Please ensure it is set in the environment.");
      }

      // Create a new instance right before the call to ensure fresh key
      const ai = new GoogleGenAI({ apiKey });
      
      setStatusMessage('Preparing image...');
      const base64String = await fileToBase64(file);
      const base64Data = base64String.split(',')[1];

      setStatusMessage('Initializing Veo model...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, high-quality slow motion video of this hairstyle blowing gently in the wind. Photorealistic, elegant lighting, fashion editorial style.',
        image: {
          imageBytes: base64Data,
          mimeType: file.type,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      const loadingMessages = [
        'Analyzing hair texture...',
        'Generating cinematic motion...',
        'Applying elegant lighting...',
        'Rendering high-quality frames...',
        'Almost there, finalizing video...'
      ];
      
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        setStatusMessage(loadingMessages[msgIndex % loadingMessages.length]);
        msgIndex++;
      }, 8000);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      clearInterval(msgInterval);

      if (operation.error) {
        throw new Error(operation.error.message || 'Failed to generate video.');
      }

      setStatusMessage('Fetching your video...');
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });
        
        if (!response.ok) throw new Error('Failed to download the generated video.');
        
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error('No video URL returned from the model.');
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
         setError('API Key session expired or invalid. Please try again.');
         try {
           await (window as any).aistudio?.openSelectKey();
         } catch(e) {}
      } else {
         setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsGenerating(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-taupe" />
          Animate Your Look
        </h3>
        <p className="text-white/80 text-sm mt-2">
          Upload a photo of your hair and see it come to life with cinematic motion using Veo AI.
        </p>
      </div>

      <div className="relative aspect-[9/16] bg-black/20 rounded-2xl overflow-hidden border border-white/10 flex flex-col items-center justify-center group">
        <AnimatePresence mode="wait">
          {videoUrl ? (
            <motion.video
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : previewUrl ? (
            <motion.img
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={previewUrl}
              alt="Preview"
              className={`w-full h-full object-cover ${isGenerating ? 'opacity-50 blur-sm' : ''}`}
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-white/50 p-6 text-center"
            >
              <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">Upload a portrait photo to begin</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10"
            >
              <Loader2 className="w-10 h-10 text-brand-taupe animate-spin mb-4" />
              <p className="text-white font-medium text-center px-6 animate-pulse">
                {statusMessage}
              </p>
              <p className="text-white/50 text-xs mt-2 text-center px-6">
                This may take a few minutes. Please don't close this window.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Overlay */}
        <AnimatePresence>
          {error && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-10 p-6 text-center"
            >
              <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
              <p className="text-white font-medium mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-colors"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button (Hidden when generating or video is ready) */}
        {!isGenerating && !videoUrl && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 hover:bg-white text-brand-charcoal px-6 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Upload className="w-4 h-4" />
              {previewUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        {videoUrl ? (
          <button
            onClick={() => {
              setVideoUrl(null);
              setPreviewUrl(null);
              setFile(null);
            }}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-full text-sm font-medium transition-colors"
          >
            Start Over
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!file || isGenerating}
            className={`w-full py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              !file || isGenerating
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-brand-taupe hover:bg-brand-rose text-brand-charcoal shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate Video
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
