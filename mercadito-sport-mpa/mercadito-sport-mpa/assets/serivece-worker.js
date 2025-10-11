const CACHE = 'ms-v1';
const CORE = [
  './style.css',
  './app.js',
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(r=>{
      const copy = r.clone();
      // cachea assets e imágenes
      if(e.request.url.includes('/assets/') || e.request.headers.get('accept')?.includes('image')){
        caches.open(CACHE).then(c=> c.put(e.request, copy));
      }
      return r;
    }).catch(()=> res))
  );
});
