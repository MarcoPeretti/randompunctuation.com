import 'server-only';

import { google } from 'googleapis';
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




