import type { VoiceSettings } from '../types';
import { VOICE_OPTIONS } from '../constants';

interface TTSInputFormProps {
  inputText: string;
  settings: VoiceSettings;
  isGenerating: boolean;
  canGenerate: boolean;
  onInputChange: (text: string) => void;
  onSettingsChange: (settings: Partial<VoiceSettings>) => void;
  onGenerate: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function TTSInputForm({
  inputText,
  settings,
  isGenerating,
  canGenerate,
  onInputChange,
  onSettingsChange,
  onGenerate,
  onKeyDown
}: TTSInputFormProps) {
  return (
    <div className="space-y-4">
      {/* Description */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Speak Japanese like a native!!
      </h2>

      {/* Text Input */}
      <div>
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter in any language
        </label>
        <textarea
          id="input-text"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Enter your text here... (English, Japanese, or any language)"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isGenerating}
          onKeyDown={onKeyDown}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Enter</kbd> to translate immediately, 
          or <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Shift+Enter</kbd> for new lines
        </p>
      </div>

      {/* Voice Settings */}
      <div>
        <label htmlFor="voice-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Voice
        </label>
        <select 
          id="voice-type"
          aria-label="Voice Type"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          value={settings.voiceType}
          onChange={(e) => onSettingsChange({ voiceType: e.target.value as VoiceSettings['voiceType'] })}
          disabled={isGenerating}
        >
          {VOICE_OPTIONS.map(({ value, label, description }) => (
            <option key={value} value={value}>
              {label} ({description})
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!canGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Streaming...</span>
          </>
        ) : (
          <>
            <span>🎤</span>
            <span>Translate & Speak in Japanese</span>
          </>
        )}
      </button>
    </div>
  );
} 