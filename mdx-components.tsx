import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

// next.config.ts enables mdxRs, which rules out rehype plugins such as
// rehype-slug, so headings derive their anchor id here instead. Without this
// there is nothing for an in-page "#section" link to target.
function headingText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(headingText).join('');
  if (React.isValidElement(node)) {
    return headingText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function slugify(node: React.ReactNode): string {
  return headingText(node)
    .toLowerCase()
    .replace(/['\u2019]/g, '')      // Developers' Survey -> developers-survey
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Renders the "Stack" line under a project as a labelled row of chips, so the
// technology list reads as metadata rather than as another body paragraph.
// `items` is a comma-separated list; `label` scopes it when a section covers
// more than one project.
function Stack({ items, label }: { items: string; label?: string }) {
  return (
    <div className="mt-5 mb-1">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400 dark:text-zinc-500">
        Stack
        {label ? (
          <span className="normal-case tracking-normal text-gray-500 dark:text-zinc-400">
            {' \u00b7 '}
            {label}
          </span>
        ) : null}
      </p>
      <ul className="flex flex-wrap gap-1.5 pl-0 list-none">
        {items
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => (
            <li
              key={item}
              className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[13px] leading-none text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0 text-4xl" {...props} />
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2
      id={slugify(children)}
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3 text-2xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3
      id={slugify(children)}
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3 text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Stack,
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
