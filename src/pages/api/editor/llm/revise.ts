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

    const { content, instructions, action, provider = 'anthropic' } = await request.json();

    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
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
    let result: string | string[] = '';

    switch (action) {
      case 'revise':
        if (!instructions) {
          return new Response(JSON.stringify({ error: 'Instructions are required for revision' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        result = await llmService.reviseContent(content, instructions);
        break;

      case 'titles':
        result = await llmService.suggestTitles(content);
        break;

      case 'excerpt':
        result = await llmService.generateExcerpt(content);
        break;

      case 'grammar':
        result = await llmService.improveGrammar(content);
        break;

      case 'continue':
        result = await llmService.continueWriting(content, instructions);
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('LLM revision error:', error);
    return new Response(JSON.stringify({ error: 'Revision failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}