const CACHE_NAME = 'cms-quota-v1';  // ← 可改版號以觸發更新
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/icon.png',
  '/manifest.json'
];

// 安裝時快取資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// 啟用時清除舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.map((name) => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
      }))
    )
  );
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  );
});
