/* Merge Drop arcade service worker — cache-first so everything plays offline. */
const CACHE = 'merge-drop-v3';
const ASSETS = [
  './', './index.html', './merge-drop.html',
  './neon-snake.html', './quick-draw.html', './range-zero.html', './stack-up.html',
  './manifest.webmanifest', './icon.svg', './privacy.html', './games.js',
  './ads.js', './ads.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((names) => Promise.all(
    names.filter((name) => name.startsWith('merge-drop-') && name !== CACHE)
      .map((name) => caches.delete(name))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }))
  );
});
