const CACHE_NAME = 'mi-primer-amor-v1';
const ARCHIVOS_A_CACHEAR = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/imagenes/logo-principal.png'
];

// Instalar
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS_A_CACHEAR))
  );
});

// Activar
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(nombres => Promise.all(
      nombres.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
    ))
  );
});

// Buscar en caché primero
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(respuesta => respuesta || fetch(e.request))
  );
});