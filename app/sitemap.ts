import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = 'https://randompunctuation.com';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {

  // blogs
  const blogsDirectory = path.join(process.cwd(), 'app', 'blog');
  const blogSlugs = await getNoteSlugs(blogsDirectory);

  const blogs = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date().toISOString()
  }));

  // notes
  const notesDirectory = path.join(process.cwd(), 'app', 'notes');
  const notesSlugs = await getNoteSlugs(notesDirectory);
  const notes = notesSlugs.map((slug) => ({
    url: `${SITE_URL}/notes/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const work = ['', '/work'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const about = ['/about'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const projects = ['/projects'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const uacguard = ['/uacguard'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const ask = ['/ask'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...work, ...about, ...projects, ...uacguard, ...ask, ...notes, ...blogs];
}
