import type { Metadata } from 'next';
import Link from 'next/link';
import ViewCounter from './view-counter';
import { getViewsCount } from 'app/db/queries';
import { Suspense } from 'react';
import { getNotes } from 'app/db/blog';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes, mostly for personal use - kind like a second brain.',
  keywords: "Engineering Management, Scaling Teams, Cybersecurity, Hiring",
};

export default function NotesPage() {

  let allNotes = getNotes();

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">My humble second brain.</h1>
      {allNotes
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((note) => (
          <Link
            key={note.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/notes/${note.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {note.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={note.slug} />
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
