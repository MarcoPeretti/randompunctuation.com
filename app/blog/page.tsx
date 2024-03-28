import type { Metadata } from 'next';
import Link from 'next/link';
import ViewCounter from './view-counter';
import { getViewsCount } from 'app/db/queries';
import { Suspense } from 'react';
import { getBlogPosts } from 'app/db/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software development, engineering management, and more.',
};

export default function BlogPage() {

  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">Just getting started, content will slowly make its way to this site.</h1>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
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
                {post.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} trackView={false} />;
}
