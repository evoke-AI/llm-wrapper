export interface VoiceSettings {
  voiceType: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

export interface TTSStreamData {
  type: 'transcript' | 'audio' | 'complete' | 'error';
  data?: string;
  complete?: string;
  transcript?: string;
  message?: string;
}

export interface TTSRequest {
  text: string;
  voiceType: VoiceSettings['voiceType'];
}

export interface AudioState {
  url: string | null;
  isPlaying: boolean;
  chunks: string[];
  currentUrl: string | null;
}

export interface TTSState {
  inputText: string;
  translatedText: string;
  isGenerating: boolean;
  isStreaming: boolean;
  error: string | null;
  settings: VoiceSettings;
  audio: AudioState;
} 