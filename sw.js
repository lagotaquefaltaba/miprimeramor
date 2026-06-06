const CACHE_NAME = 'mi-primer-amor-v1';
const ARCHIVOS = [
  '/miprimeramor/',
  '/miprimeramor/index.html',
  '/miprimeramor/manifest.json',
  '/miprimeramor/imagenes/logo-principal.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(nombres => 
    Promise.all(nombres.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
  ));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
