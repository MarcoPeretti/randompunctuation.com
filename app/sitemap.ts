import { getBlogPosts } from 'app/db/blog';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://randompunctuation.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', '/blog', '/about', '/projects', '/work'].map(
    (route) => ({
      url: `https://randompunctuation.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs];
}
