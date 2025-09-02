// app/ask/page.tsx  (SERVER component — no "use client")
import type { Metadata } from 'next';
import AskClient from './AskClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://randompunctuation.com'),
  alternates: {
    canonical: '/ask'
  },
  title: {
    default: 'Ask the Oracle',
    template: '%s | Ask the Oracle'
  },
  description: 'Ask the Oracle - OpenAI realtime Audio.'
};


export default function Page() {
  return <AskClient />;
}