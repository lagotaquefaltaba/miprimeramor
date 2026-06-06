const CACHE_NAME = 'mi-primer-amor-v3'; // Subimos la versión para que el navegador limpie lo anterior
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './imagenes/logo-principal.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(nombres => 
      Promise.all(nombres.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('listen2myradio.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
