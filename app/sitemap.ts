import { getBlogPosts, getNotes } from 'app/db/blog';

export default async function sitemap() {
  const blogs = await getBlogPosts();
  blogs.map((post) => ({
    url: `https://randompunctuation.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const notes = await getNotes();
  notes.map((post) => ({
    url: `https://randompunctuation.com/notes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', '/blog', '/notes', '/about', '/projects', '/ask', '/work'].map(
    (route) => ({
      url: `https://randompunctuation.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs, ...notes];
}
