// app/goodreads/page.tsx
import { XMLParser } from "fast-xml-parser";
import ShelfFilter from "./ShelfFilter";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Build as a static page
export const dynamic = "force-static";
export const revalidate = false;
// Ensure Node runtime for FS access
export const runtime = "nodejs";

const RSS_URL =
  "https://www.goodreads.com/review/list_rss/193108164?key=RLyDenqpiL-EH8NvHi0IswU195gkE3xJzuwJWgsl_UAbonI9&shelf=%23ALL%23";

export type Book = {
  title: string;
  author: string;
  link: string;
  cover?: string;       // remote cover URL (from RSS)
  localCover?: string;  // local /images/<hash>.ext
  rating?: string;
  shelf?: string;       // may be comma-separated
};

function extractFirstImgSrc(html?: string): string | undefined {
  if (!html) return;
  const m = html.match(/<img[^>]+src="([^"]+)"/i);
  return m?.[1];
}

function upscaleCoverUrl(u?: string): string | undefined {
  if (!u) return u;
  // Goodreads sizes look like ..._SX98_.jpg or ..._SY160_.jpg
  // bump to ~300px width for crisp thumbnails
  return u.replace(/_S[XY]\d+_/i, "_SX300_");
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

async function cacheImageToPublic(url: string): Promise<string | undefined> {
  try {
    const higher = upscaleCoverUrl(url) || url;
    const folder = path.join(process.cwd(), "public", "images");
    await fs.mkdir(folder, { recursive: true });

    const extFromPath = path.extname(new URL(higher).pathname) || ".jpg";
    const hash = crypto.createHash("md5").update(higher).digest("hex");
    const fileName = `${hash}${extFromPath}`;
    const filePath = path.join(folder, fileName);

    // Skip download if already present
    try {
      await fs.access(filePath);
      return `/images/${fileName}`;
    } catch {}

    const imgRes = await fetch(higher, { cache: "no-store" });
    if (!imgRes.ok) return undefined;
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await fs.writeFile(filePath, buf);

    return `/images/${fileName}`;
  } catch {
    return undefined;
  }
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch(RSS_URL, {
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

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const data = parser.parse(body);

  let items = data?.rss?.channel?.item ?? [];
  if (!Array.isArray(items) && items) items = [items];

  const books: Book[] = items.map((it: any) => {
    const rawCover = extractFirstImgSrc(it?.description);
    const title = decodeHtmlEntities(typeof it?.title === "string" ? it.title : "");
    const author =
      decodeHtmlEntities(typeof it?.["dc:creator"] === "string" ? it["dc:creator"] : "") ||
      decodeHtmlEntities(typeof it?.author_name === "string" ? it.author_name : "") ||
      decodeHtmlEntities(typeof it?.author === "string" ? it.author : "") ||
      "";

    const rating =
      typeof it?.user_rating === "string" || typeof it?.user_rating === "number"
        ? String(it.user_rating)
        : typeof it?.rating === "string" || typeof it?.rating === "number"
        ? String(it.rating)
        : undefined;

    const shelfRaw = it?.user_shelves;
    let shelf = "read";
    if (typeof shelfRaw === "string" && shelfRaw.trim()) shelf = shelfRaw;
    else if (Array.isArray(shelfRaw) && typeof shelfRaw[0] === "string" && shelfRaw[0].trim())
      shelf = shelfRaw[0];

    const link = typeof it?.link === "string" ? it.link : "#";

    return { title, author, link, cover: rawCover, rating, shelf };
  });

  // Download covers into /public/images and annotate with local paths
  const withLocal = await Promise.all(
    books.map(async (b) => {
      const local = b.cover ? await cacheImageToPublic(b.cover) : undefined;
      return { ...b, localCover: local };
    })
  );

  return withLocal;
}

export default async function Page() {
  const books = await getBooks();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">My Goodreads Books</h1>
      <ShelfFilter books={books} />
      <p className="mt-3 text-xs text-gray-500">
        Source: Goodreads RSS. Covers cached to <code>/public/images</code>.
      </p>
    </main>
  );
}