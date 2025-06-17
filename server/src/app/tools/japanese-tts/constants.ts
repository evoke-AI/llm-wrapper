import type { VoiceSettings } from './types';

// Audio Processing Constants
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 24000, // OpenAI's PCM16 sample rate
  NUM_CHANNELS: 1, // Mono
  BYTES_PER_SAMPLE: 2, // 16-bit = 2 bytes
  WAV_HEADER_SIZE: 44, // WAV header is 44 bytes
  MIN_CHUNK_SIZE: 1000, // Minimum bytes for initial playback
  CHUNK_THRESHOLD: 3, // Number of chunks before starting playback
} as const;

// Voice Options with Descriptions
export const VOICE_OPTIONS: Array<{
  value: VoiceSettings['voiceType'];
  label: string;
  description: string;
}> = [
  { value: 'alloy', label: 'Alloy', description: 'Balanced' },
  { value: 'echo', label: 'Echo', description: 'Deep' },
  { value: 'fable', label: 'Fable', description: 'Warm' },
  { value: 'onyx', label: 'Onyx', description: 'Authoritative' },
  { value: 'nova', label: 'Nova', description: 'Bright' },
  { value: 'shimmer', label: 'Shimmer', description: 'Gentle' },
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  TTS_JAPANESE: '/api/tts/japanese',
} as const;

// Default Settings
export const DEFAULT_SETTINGS: VoiceSettings = {
  voiceType: 'alloy',
} as const; 