import type { RequestHandler } from "express";

const DEFAULT_URL =
  "https://yandex.ru/maps/org/osteria_mario/82975400237?si=y5b38dyxgxtmdhh0v4g0hgy460";

export const handleOsteriaPhotos: RequestHandler = async (req, res) => {
  try {
    const target = (req.query.url as string) || DEFAULT_URL;
    const response = await fetch(target, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ images: [], error: "Failed to fetch source page" });
      return;
    }

    const html = await response.text();

    // Extract Yandex avatars CDN links
    const urlRegex = /https?:\/\/avatars\.mds\.yandex\.net\/[^"'()\s>]+/g;
    const matches = html.match(urlRegex) || [];

    // Prefer larger/original images when available
    const unique = Array.from(new Set(matches)).filter((u) => /\b(orig|1200x|800x)\b/.test(u));

    const images = (unique.length ? unique : Array.from(new Set(matches))).slice(0, 8);

    res.json({ images });
  } catch (err) {
    res.status(500).json({ images: [], error: "Unexpected error" });
  }
};
