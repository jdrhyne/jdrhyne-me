import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export interface LLMService {
  generateContent(prompt: string, context?: PostContext): Promise<string>;
  reviseContent(content: string, instructions: string): Promise<string>;
  suggestTitles(content: string): Promise<string[]>;
  generateExcerpt(content: string): Promise<string>;
  improveGrammar(content: string): Promise<string>;
  continueWriting(content: string, direction?: string): Promise<string>;
}

export interface PostContext {
  title?: string;
  tags?: string[];
  tone?: 'professional' | 'casual' | 'technical' | 'educational';
  audience?: string;
}

class AnthropicService implements LLMService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateContent(prompt: string, context?: PostContext): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async reviseContent(content: string, instructions: string): Promise<string> {
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Please revise the following content according to these instructions: ${instructions}\n\nContent:\n${content}`
      }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async suggestTitles(content: string): Promise<string[]> {
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Based on the following content, suggest 5 compelling blog post titles. Return only the titles, one per line.\n\nContent:\n${content.substring(0, 1000)}`
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return text.split('\n').filter(title => title.trim()).slice(0, 5);
  }

  async generateExcerpt(content: string): Promise<string> {
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Create a compelling 2-3 sentence excerpt for this blog post that would make readers want to click and read more:\n\n${content.substring(0, 1000)}`
      }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async improveGrammar(content: string): Promise<string> {
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Please fix any grammar, spelling, or punctuation errors in the following text. Keep the same tone and style, only fix errors:\n\n${content}`
      }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async continueWriting(content: string, direction?: string): Promise<string> {
    const prompt = direction 
      ? `Continue writing the following content ${direction}:\n\n${content}`
      : `Continue writing from where this left off:\n\n${content}`;

    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  private buildSystemPrompt(context?: PostContext): string {
    let prompt = 'You are a helpful AI writing assistant for a technical blog. ';
    
    if (context?.tone) {
      prompt += `Write in a ${context.tone} tone. `;
    }
    
    if (context?.audience) {
      prompt += `The target audience is ${context.audience}. `;
    }
    
    prompt += 'Provide clear, well-structured content with proper markdown formatting.';
    
    return prompt;
  }
}

class OpenAIService implements LLMService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateContent(prompt: string, context?: PostContext): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  }

  async reviseContent(content: string, instructions: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Please revise the following content according to these instructions: ${instructions}\n\nContent:\n${content}`
      }],
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  }

  async suggestTitles(content: string): Promise<string[]> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Based on the following content, suggest 5 compelling blog post titles. Return only the titles, one per line.\n\nContent:\n${content.substring(0, 1000)}`
      }],
      max_tokens: 500,
    });

    const text = response.choices[0]?.message?.content || '';
    return text.split('\n').filter(title => title.trim()).slice(0, 5);
  }

  async generateExcerpt(content: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Create a compelling 2-3 sentence excerpt for this blog post that would make readers want to click and read more:\n\n${content.substring(0, 1000)}`
      }],
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || '';
  }

  async improveGrammar(content: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Please fix any grammar, spelling, or punctuation errors in the following text. Keep the same tone and style, only fix errors:\n\n${content}`
      }],
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  }

  async continueWriting(content: string, direction?: string): Promise<string> {
    const prompt = direction 
      ? `Continue writing the following content ${direction}:\n\n${content}`
      : `Continue writing from where this left off:\n\n${content}`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || '';
  }

  private buildSystemPrompt(context?: PostContext): string {
    let prompt = 'You are a helpful AI writing assistant for a technical blog. ';
    
    if (context?.tone) {
      prompt += `Write in a ${context.tone} tone. `;
    }
    
    if (context?.audience) {
      prompt += `The target audience is ${context.audience}. `;
    }
    
    prompt += 'Provide clear, well-structured content with proper markdown formatting.';
    
    return prompt;
  }
}

// Factory function to create LLM service
export function createLLMService(provider: 'anthropic' | 'openai', apiKey: string): LLMService {
  if (provider === 'anthropic') {
    return new AnthropicService(apiKey);
  } else {
    return new OpenAIService(apiKey);
  }
}