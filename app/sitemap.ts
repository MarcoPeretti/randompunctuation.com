import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://randompunctuation.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/blog', '/about'].map(
    (route) => ({
      url: `https://randompunctuation.com${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs];
}
