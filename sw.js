const CACHE_NAME = 'estrattore-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installa il Service Worker e salva i file nella cache locale
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Gestisce le richieste: se i file sono in cache, li usa anche offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
