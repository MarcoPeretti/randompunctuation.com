import type { Metadata } from 'next';
import { queryBuilder } from 'lib/planetscale';


async function getPrompts() {
  const data = await queryBuilder
    .selectFrom('prompts')
    .select(['id', 'body'])
    .orderBy('id', 'desc')
    .limit(100)
    .execute();

  return data;
}

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'chatGPT Prompts history.',
};

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function GuestbookPage() {
  let entries;

  try {
    const [promptRes, ] = await Promise.allSettled([
      getPrompts(),
    ]);

    if (promptRes.status === 'fulfilled' && promptRes.value[0]) {
      entries = promptRes.value;
    } else {
      console.error(promptRes);
    }
    
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        Most recent chatGPT Prompts used
      </h1>
      
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col space-y-1 mb-4">
          <div className="w-full text-sm break-words">
            <span className="text-neutral-600 dark:text-neutral-400 mr-1">
              {entry.id}:
            </span>
            {entry.body}
          </div>
        </div>
      ))}
    </section>
  );
}
