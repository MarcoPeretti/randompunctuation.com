// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface PromptsTable {
  id: Generated<number>;
  body: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
  prompts: PromptsTable;
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
