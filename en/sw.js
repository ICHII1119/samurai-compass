const CACHE = 'samurai-en-v1';
const ASSETS = [
  './',
  './lite.html',
  './practice.html',
  './report.html',
  './strings.js',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

/* Push notification handler */
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  const title = data.title || 'SAMURAI in You';
  const body  = data.body  || "Today's TIP has arrived.";
  const url   = data.url   || './practice.html';
  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '../logo.png',
      badge: '../logo.png',
      data: { url },
      requireInteraction: false,
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || './practice.html';
  e.waitUntil(clients.openWindow(url));
});
