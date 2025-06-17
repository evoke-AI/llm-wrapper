"use client";

import { useJapaneseTTS } from './hooks/useJapaneseTTS';
import { TTSHeader } from './components/TTSHeader';
import { TTSInputForm } from './components/TTSInputForm';
import { TTSStatusIndicators } from './components/TTSStatusIndicators';
import { TTSResults } from './components/TTSResults';

export default function JapaneseTTSPage() {
  const tts = useJapaneseTTS();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TTSHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          
          <TTSInputForm
            inputText={tts.inputText}
            settings={tts.settings}
            isGenerating={tts.isGenerating}
            canGenerate={tts.canGenerate}
            onInputChange={tts.setInputText}
            onSettingsChange={tts.updateSettings}
            onGenerate={tts.generateSpeech}
            onKeyDown={tts.handleKeyDown}
          />

          <TTSStatusIndicators
            error={tts.error}
            isStreaming={tts.isStreaming}
          />

          {tts.hasResults && (
            <TTSResults
              translatedText={tts.translatedText}
              audioUrl={tts.audioUrl}
              audioRef={tts.audioRef}
              onPlayAudio={tts.playAudio}
            />
          )}
        </div>
      </main>
    </div>
  );
} 