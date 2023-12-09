// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface GuestbookTable {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  updated_at?: string;
}

interface PromptsTable {
  id: Generated<number>;
  body: string;
  created_by: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
  guestbook: GuestbookTable;
  prompts: PromptsTable;
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
