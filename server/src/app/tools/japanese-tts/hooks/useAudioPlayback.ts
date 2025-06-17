import { useRef, useCallback, useState } from 'react';
import { createWavBlob, combineAudioChunks, isAudioReadyForPlayback, createManagedAudioUrl } from '../utils';
import { AUDIO_CONFIG } from '../constants';

export function useAudioPlayback() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioChunksRef = useRef<string[]>([]);
  const currentAudioUrlRef = useRef<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearAudio = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }
    audioChunksRef.current = [];
  }, [audioUrl]);

  const addAudioChunk = useCallback((chunk: string) => {
    audioChunksRef.current.push(chunk);
  }, []);

  const playAccumulatedAudio = useCallback((isComplete = false, isStreaming = false) => {
    if (audioChunksRef.current.length === 0) return;

    try {
      const audioBytes = combineAudioChunks(audioChunksRef.current);
      
      if (!isAudioReadyForPlayback(audioBytes, isComplete)) {
        return;
      }
      
      const wavBlob = createWavBlob(audioBytes);
      const newAudioUrl = createManagedAudioUrl(wavBlob, currentAudioUrlRef.current);
      currentAudioUrlRef.current = newAudioUrl;
      setAudioUrl(newAudioUrl);

      if (audioRef.current) {
        audioRef.current.src = newAudioUrl;
        audioRef.current.load();
        
        const handleLoadedMetadata = () => {
          if (isComplete && audioRef.current) {
            audioRef.current.play().catch(err => {
              console.error('Error playing audio:', err);
              if (!isStreaming) {
                setError('Could not play audio. Please click the play button manually.');
              }
            });
          }
        };
        
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      }
    } catch (err) {
      console.error('Error creating audio blob:', err);
      setError('Failed to process audio data.');
    }
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        setError('Could not play audio.');
      });
    }
  }, [audioUrl]);

  const shouldStartPlayback = useCallback(() => {
    return audioChunksRef.current.length >= AUDIO_CONFIG.CHUNK_THRESHOLD;
  }, []);

  return {
    // State
    audioUrl,
    error,
    audioRef,
    
    // Actions
    clearError,
    clearAudio,
    addAudioChunk,
    playAccumulatedAudio,
    playAudio,
    shouldStartPlayback,
    
    // Computed
    hasAudioChunks: audioChunksRef.current.length > 0,
  };
} 