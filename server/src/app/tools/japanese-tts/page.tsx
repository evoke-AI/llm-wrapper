"use client";

import { useState } from "react";
import Link from "next/link";

export default function JapaneseTTSPage() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Placeholder for actual TTS implementation
    setTimeout(() => {
      setIsGenerating(false);
      alert("TTS feature coming soon! This is a placeholder implementation.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  🗾 Japanese TTS
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Convert Japanese text to natural speech
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                Beta
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {/* Input Section */}
          <div className="mb-8">
            <label htmlFor="japanese-text" className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
              Enter Japanese Text
            </label>
            <textarea
              id="japanese-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="こんにちは、世界！今日はいい天気ですね。"
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none text-lg"
              style={{ fontFamily: 'serif' }}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter any Japanese text including hiragana (ひらがな), katakana (カタカナ), or kanji (漢字)
            </p>
          </div>

          {/* Voice Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Voice Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div>
                 <label htmlFor="voice-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Voice Type
                 </label>
                 <select 
                   id="voice-type"
                   aria-label="Voice Type"
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                   disabled
                 >
                  <option>Female (Standard)</option>
                  <option>Male (Standard)</option>
                  <option>Female (Anime Style)</option>
                  <option>Child Voice</option>
                </select>
              </div>
                             <div>
                 <label htmlFor="voice-speed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Speed
                 </label>
                 <select 
                   id="voice-speed"
                   aria-label="Voice Speed"
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                   disabled
                 >
                  <option>Normal (1.0x)</option>
                  <option>Slow (0.8x)</option>
                  <option>Fast (1.2x)</option>
                </select>
              </div>
                             <div>
                 <label htmlFor="voice-pitch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Pitch
                 </label>
                 <select 
                   id="voice-pitch"
                   aria-label="Voice Pitch"
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                   disabled
                 >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mb-8">
            <button
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 ${
                !inputText.trim() || isGenerating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Speech...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10v4a2 2 0 002 2h1.586l4.707 4.707C15.923 21.337 17 20.575 17 19.414V4.586c0-1.161-1.077-1.923-1.707-1.293L10.586 8H9a2 2 0 00-2 2z" />
                  </svg>
                  <span>Generate Speech</span>
                </div>
              )}
            </button>
          </div>

          {/* Output Section Placeholder */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Audio</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">🎵</div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Audio player will appear here after generation
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Generated audio will be available for download and playback
              </p>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-3">🚀 Coming Soon</h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Multiple voice actors and styles</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Emotion and tone control</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>SSML support for advanced pronunciation</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Batch processing for long texts</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Export in multiple audio formats</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 