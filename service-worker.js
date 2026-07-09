
const CACHE_NAME = "cours-gedion-v29";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./dist/output.css",
  "./manifest.webmanifest",
  "./assets/js/interactive-quiz.js",
  "./assets/js/interactive-flashcards.js",
  "./assets/js/cahier.js",
  "./assets/js/travail-global.js",
  "./assets/js/methodes.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        const copy = response.clone();
        if (response.ok && new URL(req.url).origin === self.location.origin) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return response;
      }).catch(() => {
        if (req.mode === "navigate") return caches.match("./offline.html");
        return caches.match(req);
      });
    })
  );
});
