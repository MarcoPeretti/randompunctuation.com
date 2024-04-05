import type { Metadata } from 'next';
import { getPrompts } from 'app/db/queries';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'chatGPT Prompts history. All queries are logged and can be found on this page. By default, the three sample questions are not logged.',
};

//export const dynamic = 'force-dynamic';
//export const runtime = 'edge';

export default async function PromptsPage() {

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        Most recent chatGPT Prompts used
      </h1>
      
      <Suspense>
        <PromptEntries />
      </Suspense>
    </section>
  );
}

async function PromptEntries() {
  let entries = await getPrompts();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 dark:text-neutral-400 mr-1">
          {entry.id}:
        </span>
        {entry.prompt}
      </div>
    </div>
  ));
}
