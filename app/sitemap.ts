import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = 'https://randompunctuation.com';

export async function getSlugs(dir: string) {
  const entries = await fs.readdir(dir, { recursive: true, withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && e.name === 'page.mdx')
    .map((e: any) => {
      const abs = path.join(e.parentPath ?? dir, e.name);
      const rel = path.relative(dir, abs);
      const folder = path.dirname(rel).replace(/\\/g, '/');
      return folder === '.' ? '' : folder;
    })
    .filter((slug) => slug !== ''); // <-- skip the root
}

export default async function sitemap() {

  // blogs
  const blogsDirectory = path.join(process.cwd(), 'app', 'blog');
  const blogSlugs = await getSlugs(blogsDirectory);

  const blogs = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date().toISOString()
  }));

  // notes
  const notesDirectory = path.join(process.cwd(), 'app', 'notes');
  const notesSlugs = await getSlugs(notesDirectory);
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

  const blogRoot = ['/blog'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  const notesRoot = ['/notes'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...work, ...about, ...projects, ...uacguard, ...ask, ...notes, ...blogs, ...blogRoot, ...notesRoot];
}
