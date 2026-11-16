const CACHE_NAME = 'samurai-compass-v17';
const ASSETS = [
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Zen+Antique+Soft&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // HTMLファイルは常にネットワークから取得（古いキャッシュを返さない）
  if (e.request.destination === 'document' || url.endsWith('.html')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // ガイドブック・その他動的コンテンツはキャッシュしない
  if (url.includes('/kit-guide-')) return;
  // 静的アセット（画像・フォント等）はキャッシュ優先
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.ok && url.startsWith('http')) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    })).catch(() => caches.match('./manifest.json'))
  );
});
