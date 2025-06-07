import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });

  const searchData = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    content: post.body,
    tags: post.data.tags,
    pubDate: post.data.pubDate,
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};