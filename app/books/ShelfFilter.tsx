"use client";

import * as React from "react";
import type { Book } from "./page";

type Props = { books: Book[] };

function uniqueShelves(books: Book[]): string[] {
  const set = new Set<string>();
  books.forEach((b) => {
    (b.shelf ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((s) => set.add(s));
  });
  return Array.from(set).sort();
}

export default function ShelfFilter({ books }: Props) {
  const shelves = React.useMemo(() => ["All shelves", ...uniqueShelves(books)], [books]);
  const [shelf, setShelf] = React.useState<string>("All shelves");

  const filtered = React.useMemo(() => {
    if (shelf === "All shelves") return books;
    return books.filter((b) =>
      (b.shelf ?? "")
        .split(",")
        .map((s) => s.trim())
        .includes(shelf)
    );
  }, [books, shelf]);

  return (
    <section>
      {/* Filter control */}
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="shelf" className="text-sm">
          Filter by shelf:
        </label>
        <select
          id="shelf"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          className="rounded-md border bg-transparent px-2 py-1 text-sm"
        >
          {shelves.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* WALL layout — covers only, served from /public/images when available */}
      <div
        className="
          grid gap-3
          grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
          xl:grid-cols-8
        "
      >
        {filtered.map((b, i) => (
          <a
            key={`${b.link}-${i}`}
            href={b.link}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-lg bg-neutral-200 shadow-sm"
            title={b.title}
          >
            <div className="aspect-[2/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.localCover || b.cover || ""}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}