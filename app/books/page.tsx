// app/goodreads/page.tsx
import { XMLParser } from "fast-xml-parser";
import ShelfFilter from "./ShelfFilter";

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
  shelf?: string;
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

    const shelfRaw = it?.user_shelves;
    let shelf: string;
    if (typeof shelfRaw === "string" && shelfRaw.trim() !== "") {
      shelf = shelfRaw;
    } else if (
      Array.isArray(shelfRaw) &&
      shelfRaw.length > 0 &&
      typeof shelfRaw[0] === "string" &&
      shelfRaw[0].trim() !== ""
    ) {
      shelf = shelfRaw[0];
    } else {
      shelf = "read";
    }

    const link = typeof it?.link === "string" ? it?.link : "#";

    return { title, author, link, cover, rating, shelf };
  });

  return books;
}

export default async function Page() {
  const books = await getBooks();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Goodreads Books</h1>
      <ShelfFilter books={books} />
      <p className="mt-3 text-xs text-gray-500">
        Source: Goodreads RSS. Generated statically at build time.
      </p>
    </main>
  );
}