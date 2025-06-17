"use client";

import { useState } from "react";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  href: string;
  isComingSoon?: boolean;
}

const tools: Tool[] = [
  {
    id: "japanese-tts",
    name: "Japanese TTS",
    description: "Convert Japanese text to natural speech using advanced AI voice synthesis",
    icon: "🗾",
    category: "Speech",
    href: "/tools/japanese-tts",
    isComingSoon: false,
  },
  {
    id: "text-summarizer",
    name: "Text Summarizer",
    description: "Summarize long documents and articles using advanced language models",
    icon: "📝",
    category: "Text Processing",
    href: "/tools/text-summarizer",
    isComingSoon: true,
  },
  {
    id: "code-generator",
    name: "Code Generator",
    description: "Generate code snippets and complete functions from natural language descriptions",
    icon: "💻",
    category: "Development",
    href: "/tools/code-generator",
    isComingSoon: true,
  },
  {
    id: "language-translator",
    name: "Language Translator",
    description: "Translate text between multiple languages with context-aware AI",
    icon: "🌐",
    category: "Language",
    href: "/tools/language-translator",
    isComingSoon: true,
  },
  {
    id: "image-analyzer",
    name: "Image Analyzer",
    description: "Extract insights and descriptions from images using computer vision",
    icon: "👁️",
    category: "Vision",
    href: "/tools/image-analyzer",
    isComingSoon: true,
  },
  {
    id: "chat-assistant",
    name: "Chat Assistant",
    description: "Intelligent conversational AI for various tasks and questions",
    icon: "💬",
    category: "Conversation",
    href: "/tools/chat-assistant",
    isComingSoon: true,
  },
];

const categories = ["All", "Speech", "Text Processing", "Development", "Language", "Vision", "Conversation"];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                LLM Wrapper
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Your comprehensive AI tools dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {tools.filter(t => !t.isComingSoon).length} tools available
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="group relative">
              {tool.isComingSoon ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                  </div>
                </div>
              ) : (
                <Link href={tool.href} className="block">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:scale-105">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{tool.icon}</div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Available
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different category or check back later for new tools.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>LLM Wrapper - Empowering productivity with AI tools</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
