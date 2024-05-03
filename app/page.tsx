import ViewCounter from 'app/blog/view-counter';

import {
  getViewsCount,
} from 'app/db/queries';
import { Suspense } from 'react';
//import Image from 'next/image';
//import v4 from 'public/images/v4.jpg';

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

async function BlogLink({ slug, name }) {
  const allViews = await getViewsCount();

  return (
    <a
      href={`/blog/${slug}`}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50  dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
    >
      <div className="flex flex-col">
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <ViewCounter allViews={allViews} slug={slug} trackView={false} />
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </a>
  );
}

export default async function Page() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">Hey, I'm Marco 👋</h1>
      <p className="prose prose-neutral dark:prose-invert">
        I am former company Founder, CTO and VP of Engineering, currently residing in Lausanne, Switzerland.
      </p>
      <br></br>
      <p className="prose prose-neutral dark:prose-invert">
        This is my new blog, where I plan to publish content on software development, scaling engineering organisations as well as sharing some notes about books I've read.
      </p>
      <br></br>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Recent blog posts:
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          <BlogLink
            name="Scaling Engineering Teams"
            slug="scaling-engineering-teams"
          />
          <BlogLink
            name="Notes on An Elegant Puzzle, by Will Larson"
            slug="an-elegant-puzzle"
          />
          <BlogLink
            name="Interview Performance Vs Job Performance"
            slug="interview-performance-vs-job-performance"
          />
        </Suspense>

      </div>
    </section>
  );
}
