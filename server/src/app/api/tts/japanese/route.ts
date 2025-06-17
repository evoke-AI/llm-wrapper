import { NextRequest, NextResponse } from 'next/server';
import { createOpenAIClient } from '../../../services/openai';

export async function POST(request: NextRequest) {
  try {
    const { text, voiceType = 'alloy' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = await createOpenAIClient();

    // Create a readable stream for Server-Sent Events
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use streaming with gpt-4o-audio-preview
          const stream = await openai.chat.completions.create({
            model: "gpt-4o-audio-preview",
            modalities: ["text", "audio"],
            audio: {
              voice: voiceType,
              format: "pcm16"
            },
            messages: [
              {
                role: "system",
                    content: "Translate everything I type to Japanese with the correct tone of the content. Speak like a human with natural tone not a robot. Make sure you respect the culture difference when translating the message, be more polite as we are at taking to strangers. Do not use say anything other than the translated message."
              },
              {
                role: "user",
                content: text
              }
            ],
            temperature: 0.3,
            stream: true
          });

          let audioId = '';
          let completeTranscript = '';

          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta as {
              audio?: {
                transcript?: string;
                data?: string;
                id?: string;
              };
            };
            
            if (delta?.audio) {
              // Handle audio transcript deltas
              if (delta.audio.transcript) {
                completeTranscript += delta.audio.transcript;
                
                // Send transcript update
                const transcriptData = JSON.stringify({
                  type: 'transcript',
                  data: delta.audio.transcript,
                  complete: completeTranscript
                });
                controller.enqueue(encoder.encode(`data: ${transcriptData}\n\n`));
              }

              // Handle audio data chunks
              if (delta.audio.data) {
                // Send audio chunk
                const audioData = JSON.stringify({
                  type: 'audio',
                  data: delta.audio.data,
                  audioId: delta.audio.id || audioId
                });
                controller.enqueue(encoder.encode(`data: ${audioData}\n\n`));
              }

              // Store audio ID for reference
              if (delta.audio.id) {
                audioId = delta.audio.id;
              }
            }

            // Check if streaming is complete
            if (chunk.choices[0]?.finish_reason) {
              // Send completion event
              const completeData = JSON.stringify({
                type: 'complete',
                transcript: completeTranscript,
                audioId: audioId,
                audioFormat: 'mp3'
              });
              controller.enqueue(encoder.encode(`data: ${completeData}\n\n`));
              break;
            }
          }

        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = JSON.stringify({
            type: 'error',
            message: error instanceof Error ? error.message : 'Stream processing failed'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    // Return Server-Sent Events response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Error in Japanese TTS API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 