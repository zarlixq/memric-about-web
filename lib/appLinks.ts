// lib/appLinks.ts
export const APP_LINKS = {
  androidPackage: "com.memric.app",
  universal: (slug: string) => `https://memric.app/u/${encodeURIComponent(slug)}?openInApp=1`,
  fallbackStore: "https://memric.app/download",
};

export function openInApp(slug: string) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);

  if (isAndroid) {
    window.location.href =
      `intent://u/${encodeURIComponent(slug)}#Intent;scheme=memric;` +
      `package=${APP_LINKS.androidPackage};` +
      `S.browser_fallback_url=${encodeURIComponent(APP_LINKS.fallbackStore)};end`;
    return;
  }
  const t = Date.now();
  window.location.href = APP_LINKS.universal(slug);
  setTimeout(() => {
    if (Date.now() - t < 1800) window.location.href = APP_LINKS.fallbackStore;
  }, 1500);
}
