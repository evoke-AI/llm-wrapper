interface TTSResultsProps {
  translatedText: string;
  audioUrl: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onPlayAudio: () => void;
}

export function TTSResults({ translatedText, audioUrl, audioRef, onPlayAudio }: TTSResultsProps) {
  if (!translatedText && !audioUrl) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Generated Results</h3>
      
      {/* Translated Text */}
      {translatedText && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Japanese Translation:
          </label>
          <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
            <p className="text-gray-900 dark:text-white font-japanese text-lg">
              {translatedText}
            </p>
          </div>
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Audio Playback:
          </label>
          <div className="flex items-center space-x-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="flex-1"
              preload="auto"
            >
              Your browser does not support the audio element.
            </audio>
            <button
              onClick={onPlayAudio}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>▶️</span>
              <span>Play</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 