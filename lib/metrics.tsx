import 'server-only';

import { google } from 'googleapis';
import { queryBuilder } from 'lib/planetscale';
import { cache } from 'react';

const googleAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

const youtube = google.youtube({
  version: 'v3',
  auth: googleAuth,
});

export const getBlogViews = cache(async () => {
  if (!process.env.DATABASE_URL) {
    return 0;
  }

  const data = await queryBuilder
    .selectFrom('views')
    .select(['count'])
    .execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export const getViewsCount = cache(async () => {
  return queryBuilder.selectFrom('views').select(['slug', 'count']).execute();
});

