// Service Worker — Ziros 2026
// Estrategia: cache-first para activos estáticos + tiles de mapa

const CACHE_NAME      = 'ziros-2026-v3';
const TILES_CACHE     = 'ziros-map-tiles-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/data.js',
  '/js/app.js',
  '/assets/ziros_logo.png',
  '/assets/lib/leaflet.js',
  '/assets/lib/leaflet.css',
  '/manifest.json',
];

// ── Instalación: precachear activos estáticos ─────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activación: eliminar cachés antiguas ──────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== TILES_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Tiles de CartoDB — cache-first, guardar cuando haya red
  if (url.hostname.endsWith('basemaps.cartocdn.com')) {
    event.respondWith(
      caches.open(TILES_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => new Response('', { status: 503 }));
        })
      )
    );
    return;
  }

  // Activos propios (mismo origen) — cache-first
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
