import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import ViewCounter from './view-counter';
import { getViewsCount } from 'lib/metrics';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software development, engineering management, and more.',
};

export default async function BlogPage() {
  const allViews = await getViewsCount();

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">Just getting started, content will slowly make its way to this site.</h1>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
              <ViewCounter
                allViews={allViews}
                slug={post.slug}
                trackView={false}
              />
            </div>
          </Link>
        ))}
    </section>
  );
}
