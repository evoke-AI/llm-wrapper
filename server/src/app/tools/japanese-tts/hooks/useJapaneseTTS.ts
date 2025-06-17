import { useState, useCallback } from 'react';
import type { VoiceSettings, TTSStreamData, TTSRequest } from '../types';
import { API_ENDPOINTS, DEFAULT_SETTINGS } from '../constants';
import { useAudioPlayback } from './useAudioPlayback';

export function useJapaneseTTS() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<VoiceSettings>(DEFAULT_SETTINGS);

  const audioPlayback = useAudioPlayback();

  const clearError = useCallback(() => {
    setError(null);
    audioPlayback.clearError();
  }, [audioPlayback]);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetState = useCallback(() => {
    setTranslatedText("");
    clearError();
    audioPlayback.clearAudio();
  }, [clearError, audioPlayback]);

  const processStreamData = useCallback((data: TTSStreamData, hasStartedPlaying: { current: boolean }) => {
    switch (data.type) {
      case 'transcript':
        if (data.complete) {
          setTranslatedText(data.complete);
        }
        break;
        
      case 'audio':
        if (data.data) {
          audioPlayback.addAudioChunk(data.data);
          
          // Start playing after receiving enough chunks
          if (!hasStartedPlaying.current && audioPlayback.shouldStartPlayback()) {
            hasStartedPlaying.current = true;
            audioPlayback.playAccumulatedAudio(false, isStreaming);
          }
        }
        break;
        
      case 'complete':
        if (data.transcript) {
          setTranslatedText(data.transcript);
        }
        setIsStreaming(false);
        audioPlayback.playAccumulatedAudio(true, false);
        break;
        
      case 'error':
        throw new Error(data.message || 'Unknown error occurred');
        
      default:
        console.warn('Unknown stream data type:', data.type);
    }
  }, [audioPlayback, isStreaming]);

  const generateSpeech = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to translate and speak.");
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    resetState();

    try {
      const requestBody: TTSRequest = {
        text: inputText,
        voiceType: settings.voiceType,
      };

      const response = await fetch(API_ENDPOINTS.TTS_JAPANESE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to start streaming');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      const hasStartedPlaying = { current: false };

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data: TTSStreamData = JSON.parse(line.slice(6));
              processStreamData(data, hasStartedPlaying);
            } catch (err) {
              console.error('Error parsing SSE data:', err);
            }
          }
        }
      }
      
      // Manual completion trigger if no complete event was received
      if (audioPlayback.hasAudioChunks) {
        audioPlayback.playAccumulatedAudio(true, false);
        setIsStreaming(false);
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  }, [inputText, settings.voiceType, resetState, processStreamData, audioPlayback]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating && inputText.trim()) {
        generateSpeech();
      }
    }
  }, [isGenerating, inputText, generateSpeech]);

  return {
    // State
    inputText,
    translatedText,
    isGenerating,
    isStreaming,
    error: error || audioPlayback.error,
    settings,
    
    // Audio
    audioUrl: audioPlayback.audioUrl,
    audioRef: audioPlayback.audioRef,
    
    // Actions
    setInputText,
    updateSettings,
    generateSpeech,
    playAudio: audioPlayback.playAudio,
    handleKeyDown,
    clearError,
    
    // Computed
    canGenerate: !isGenerating && inputText.trim().length > 0,
    hasResults: translatedText.length > 0 || audioPlayback.audioUrl !== null,
  };
} 