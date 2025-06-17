import { AUDIO_CONFIG } from './constants';

/**
 * Converts PCM16 data to WAV format for browser playback
 * @param pcmData - Raw PCM16 audio data as Uint8Array
 * @returns WAV-formatted Blob ready for audio playback
 */
export function createWavBlob(pcmData: Uint8Array): Blob {
  const { SAMPLE_RATE, NUM_CHANNELS, BYTES_PER_SAMPLE, WAV_HEADER_SIZE } = AUDIO_CONFIG;
  
  // Ensure data length is even (16-bit samples)
  const dataLength = pcmData.length - (pcmData.length % 2);
  const bufferLength = WAV_HEADER_SIZE + dataLength;
  const buffer = new ArrayBuffer(bufferLength);
  const view = new DataView(buffer);
  
  // Helper function to write strings to buffer
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  // WAV header
  writeString(0, 'RIFF'); // ChunkID
  view.setUint32(4, bufferLength - 8, true); // ChunkSize
  writeString(8, 'WAVE'); // Format
  writeString(12, 'fmt '); // Subchunk1ID
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat (PCM)
  view.setUint16(22, NUM_CHANNELS, true); // NumChannels
  view.setUint32(24, SAMPLE_RATE, true); // SampleRate
  view.setUint32(28, SAMPLE_RATE * NUM_CHANNELS * BYTES_PER_SAMPLE, true); // ByteRate
  view.setUint16(32, NUM_CHANNELS * BYTES_PER_SAMPLE, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample
  writeString(36, 'data'); // Subchunk2ID
  view.setUint32(40, dataLength, true); // Subchunk2Size
  
  // Copy PCM data (only the even-length portion)
  const pcmView = new Uint8Array(buffer, WAV_HEADER_SIZE);
  pcmView.set(pcmData.slice(0, dataLength));
  
  return new Blob([buffer], { type: 'audio/wav' });
}

/**
 * Converts base64 audio chunks to binary audio data
 * @param chunks - Array of base64 encoded audio strings
 * @returns Combined audio data as Uint8Array
 */
export function combineAudioChunks(chunks: string[]): Uint8Array {
  const combinedAudioData = chunks.join('');
  return Uint8Array.from(atob(combinedAudioData), c => c.charCodeAt(0));
}

/**
 * Checks if audio data is sufficient for playback
 * @param audioBytes - Audio data as Uint8Array
 * @param isComplete - Whether this is the final audio check
 * @returns True if audio is ready for playback
 */
export function isAudioReadyForPlayback(audioBytes: Uint8Array, isComplete: boolean): boolean {
  if (isComplete) return true;
  return audioBytes.length >= AUDIO_CONFIG.MIN_CHUNK_SIZE;
}

/**
 * Creates a managed audio URL with cleanup
 * @param audioBlob - Audio blob to create URL for
 * @param previousUrl - Previous URL to clean up
 * @returns New audio URL
 */
export function createManagedAudioUrl(audioBlob: Blob, previousUrl?: string | null): string {
  if (previousUrl) {
    URL.revokeObjectURL(previousUrl);
  }
  return URL.createObjectURL(audioBlob);
} 