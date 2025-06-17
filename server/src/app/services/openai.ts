'use server';

import OpenAI from 'openai';

export async function createOpenAIClient() {
    return new OpenAI({
        baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
        apiKey: process.env.OPENAI_API_KEY,
    });
}
