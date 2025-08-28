"use client";
import React, { useState } from "react";

type Book = {
  title: string;
  author: string;
  link: string;
  cover?: string;
  rating?: string;
  shelf?: string;
};

export default function ShelfFilter({ books }: { books: Book[] }) {
  const [shelf, setShelf] = useState<string>("all");
  const shelfOptions = [
    { value: "all", label: "All shelves" },
    { value: "read", label: "Read" },
    { value: "to-read", label: "To Read" },
    { value: "currently-reading", label: "Currently Reading" },
  ];

  const filteredBooks =
    shelf === "all"
      ? books
      : books.filter(
          (b) => b.shelf?.toLowerCase() === shelf
        );

  return (
    <>
      <div className="mb-4">
        <label htmlFor="shelf-select" className="mr-2 text-sm font-medium">
          Filter by shelf:
        </label>
        <select
          id="shelf-select"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          {shelfOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <ul className="divide-y rounded-2xl border">
        {filteredBooks.map((b, i) => (
          <li key={i} className="flex items-start gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {b.cover ? (
              <img
                src={b.cover}
                alt={b.title}
                className="h-20 w-auto rounded"
                loading="lazy"
              />
            ) : (
              <div className="h-20 w-14 rounded bg-gray-200" />
            )}

            <div className="min-w-0">
              <a
                href={b.link}
                target="_blank"
                rel="noreferrer"
                className="line-clamp-2 font-medium underline underline-offset-2"
              >
                {b.title}
              </a>
              <div className="text-sm text-gray-600 dark:text-zinc-300">
                {b.author || "Unknown author"}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {b.rating ? `Rating: ${b.rating}` : "Rating: —"}
                {b.shelf ? ` • Shelf: ${b.shelf}` : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
