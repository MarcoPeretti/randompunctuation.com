'use server';

import { queryBuilder } from 'lib/planetscale';

export async function increment(slug: string) {
  const data = await queryBuilder
    .selectFrom('views')
    .where('slug', '=', slug)
    .select(['count'])
    .execute();

  const views = !data.length ? 0 : Number(data[0].count);

  await queryBuilder
    .insertInto('views')
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();
}


export async function savePromptEntry(prompt: string) {
  const body = prompt;

  await queryBuilder
    .insertInto('prompts')
    .values({ body })
    .execute();
}

