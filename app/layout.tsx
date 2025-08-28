import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://randompunctuation.com'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Marco Peretti',
    template: '%s | Marco Peretti'
  },
  description: 'My portfolio, blog, and personal website.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}> 
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <Header />
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
function Header() {
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Notes', url: '/notes' },
    { name: 'About', url: '/about' },
    { name: 'Work', url: '/work' },
    { name: 'Projects', url: '/projects' },
    { name: 'Ask', url: '/ask' }
  ];
  return (
    <header className="mb-12 text-center">
      <nav>
        <div className="flex justify-center space-x-4 tracking-tight">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
}

function Footer() {
  const links = [
    { name: '@perettimarco', url: 'https://x.com/perettimarco' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/marcoperetti' },
    { name: 'github', url: 'https://github.com/marcoperetti' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
