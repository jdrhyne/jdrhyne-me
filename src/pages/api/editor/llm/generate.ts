import type { APIContext } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import { createLLMService } from '../../../../lib/editor/llm';

export async function POST({ request }: APIContext) {
  try {
    // Verify authentication
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { prompt, context, provider = 'anthropic' } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get API key from environment
    const apiKey = provider === 'anthropic' 
      ? import.meta.env.ANTHROPIC_API_KEY 
      : import.meta.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: `${provider} API key not configured` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const llmService = createLLMService(provider, apiKey);
    const content = await llmService.generateContent(prompt, context);

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('LLM generation error:', error);
    return new Response(JSON.stringify({ error: 'Generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}