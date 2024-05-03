import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import Balancer from 'react-wrap-balancer';
import ViewCounter from '../view-counter';
import { getViewsCount } from 'app/db/queries';
import { Suspense, cache } from 'react';
import { getNotes } from 'app/db/blog';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import Socials from 'app/components/socials' 

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let note = getNotes().find((post) => post.slug === params.slug);
  if (!note) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    keywords,
    image,
  } = note.metadata;
  const ogImage = image
    ? `https://randompunctuation.com${image}`
    : `https://randompunctuation.com/og?title=${title}`;

  return {
    title,
    description,
    keywords,
    authors: [{name: 'Marco Peretti'}],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://randompunctuation.com/notes/${note.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  noStore();

  const currentDate = new Date();
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Note({ params }) {
  const note = getNotes().find((post) => post.slug === params.slug);

  if (!note) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: note.metadata.title,
            datePublished: note.metadata.publishedAt,
            dateModified: note.metadata.publishedAt,
            description: note.metadata.summary,
            keywords: note.metadata.keywords,
            image: note.metadata.image
              ? `https://randompunctuation.com${note.metadata.image}`
              : `https://randompunctuation.com/og?title=${note.metadata.title}`,
            url: `https://randompunctuation.com/notes/${note.slug}`,
            author: {
              '@type': 'Person',
              name: 'Marco Peretti',
            },
          }),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{note.metadata.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">

        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(note.metadata.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={note.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={note.content} />
      </article>    
      <Socials/>
      </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views;
  try {
    views = await getViewsCount();
    incrementViews(slug);

  } catch (error) {
    console.error(error);
  }
  return <ViewCounter allViews={views} slug={slug} trackView />;
}
