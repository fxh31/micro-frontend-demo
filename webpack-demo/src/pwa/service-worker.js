// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  // Perform install steps like caching assets
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
});