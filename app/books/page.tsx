// app/goodreads/page.tsx
import { XMLParser } from "fast-xml-parser";

// Force SSG (static at build)
export const dynamic = "force-static";
export const revalidate = false;

const RSS_URL =
  "https://www.goodreads.com/review/list_rss/193108164?key=RLyDenqpiL-EH8NvHi0IswU195gkE3xJzuwJWgsl_UAbonI9&shelf=%23ALL%23";

type Book = {
  title: string;
  author: string;
  link: string;
  cover?: string;
  rating?: string;
  pubYear?: string;
};

function extractFirstImgSrc(html?: string): string | undefined {
  if (!html) return;
  const m = html.match(/<img[^>]+src="([^"]+)"/i);
  return m?.[1];
}

function decodeHtmlEntities(s?: string) {
  if (!s || typeof s !== "string") return "";
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch(RSS_URL, {
    // Static builds use cache by default; the headers help nudge XML responses
    headers: {
      Accept:
        "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
    },
    cache: "force-cache",
  });

  const body = await res.text();
  if (!res.ok || body.trim().startsWith("<!DOCTYPE html")) {
    throw new Error(
      `Goodreads RSS fetch failed (status ${res.status}). Got HTML instead of XML.`
    );
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const data = parser.parse(body);

  const channel = data?.rss?.channel;
  let items = channel?.item ?? [];
  if (!Array.isArray(items) && items) items = [items];

  const books: Book[] = items.map((it: any) => {
    const cover = extractFirstImgSrc(it?.description);
    const title = decodeHtmlEntities(
      typeof it?.title === "string" ? it?.title : ""
    );
    const author =
      decodeHtmlEntities(
        typeof it?.["dc:creator"] === "string" ? it?.["dc:creator"] : ""
      ) ||
      decodeHtmlEntities(
        typeof it?.author_name === "string" ? it?.author_name : ""
      ) ||
      decodeHtmlEntities(
        typeof it?.author === "string" ? it?.author : ""
      ) ||
      "";

    const rating =
      typeof it?.user_rating === "string" || typeof it?.user_rating === "number"
        ? it?.user_rating.toString()
        : typeof it?.rating === "string" || typeof it?.rating === "number"
        ? it?.rating.toString()
        : undefined;

    const pubYear =
      typeof it?.book_published === "string" || typeof it?.book_published === "number"
        ? it?.book_published.toString()
        : typeof it?.book_published_year === "string" || typeof it?.book_published_year === "number"
        ? it?.book_published_year.toString()
        : undefined;

    const link = typeof it?.link === "string" ? it?.link : "#";

    return { title, author, link, cover, rating, pubYear };
  });

  return books;
}

export default async function Page() {
  const books = await getBooks();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Goodreads Books</h1>

      {/* List view (simple, responsive) */}
      <ul className="divide-y rounded-2xl border">
        {books.map((b, i) => (
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
                {b.pubYear ? ` • Year: ${b.pubYear}` : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-gray-500">
        Source: Goodreads RSS. Generated statically at build time.
      </p>
    </main>
  );
}