'use server';

import { sql } from './postgres';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function increment(slug: string) {
  noStore();
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1
  `;
}

export async function savePromptEntry(prompt: string) {
  const body = prompt;

  noStore();
  await sql`

  INSERT INTO prompts (prompt)
  VALUES (${body})
  `;
}