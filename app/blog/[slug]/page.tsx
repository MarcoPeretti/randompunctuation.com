import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import Balancer from 'react-wrap-balancer';
import ViewCounter from '../view-counter';
import { getViewsCount } from 'app/db/queries';
import { Suspense, cache } from 'react';
import { getBlogPosts } from 'app/db/blog';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';
import Socials from 'app/components/socials'

export async function generateStaticParams() {
  let posts =  getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  //const { slug } = await params
  //let posts = await getBlogPosts();
  //let post = posts.find((post) => post.slug === slug);
  //let posts = getBlogPosts()

  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    keywords,
    image,
  } = post.metadata;
  const ogImage = image
    ? `https://randompunctuation.com${image}`
    : `https://randompunctuation.com/og?title=${title}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Marco Peretti' }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://randompunctuation.com/blog/${post.slug}`,
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


  // Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  //const posts = await getBlogPosts();
  //const post = posts.find((post) => post.slug === slug);

    let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
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
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            keywords: post.metadata.keywords,
            image: post.metadata.image
              ? `https://randompunctuation.com${post.metadata.image}`
              : `https://randompunctuation.com/og?title=${post.metadata.title}`,
            url: `https://randompunctuation.com/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Marco Peretti',
            },
          }),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{post.metadata.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">

        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <Socials />
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
