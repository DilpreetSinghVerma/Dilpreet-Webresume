const CACHE_NAME = "ds-portfolio-v1";
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/site-logo.png",
    "/Dilpreet_Singh_Resume.pdf",
];

// Install: pre-cache key assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: Network-first for HTML/API, Cache-first for static assets
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests
    if (request.method !== "GET" || url.origin !== self.location.origin) return;

    // Network-first for HTML navigation
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(request, clone));
                    return res;
                })
                .catch(() => caches.match("/index.html"))
        );
        return;
    }

    // Cache-first for images and other static assets
    event.respondWith(
        caches.match(request).then(
            (cached) =>
                cached ||
                fetch(request).then((res) => {
                    if (res.ok && (request.destination === "image" || request.destination === "font")) {
                        const clone = res.clone();
                        caches.open(CACHE_NAME).then((c) => c.put(request, clone));
                    }
                    return res;
                })
        )
    );
});
