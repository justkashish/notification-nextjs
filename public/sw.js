// Service Worker for PWA functionality

const CACHE_NAME = "digilabs-notification-app-v1"
const urlsToCache = ["/", "/bell-icon.png", "/notification-icon.png"]

// Install event - cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                console.log("Opened cache")
                return cache.addAll(urlsToCache)
            }),
        )
        // Activate immediately
    self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName)
                        }
                    }),
                )
            }),
        )
        // Claim clients immediately
    self.clients.claim()
})

// Fetch event - serve from cache if available
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response
            }
            return fetch(event.request)
        }),
    )
})

// Push event - handle push notifications
self.addEventListener("push", (event) => {
    const data = event.data ?
        event.data.json() :
        {
            title: "DiGiLABS Notification",
            body: "You have a new notification!",
        }

    const options = {
        body: data.body || "You have a new notification!",
        icon: "/notification-icon.png",
        badge: "/notification-icon.png",
        vibrate: [100, 50, 100],
        data: {
            url: data.url || "/",
        },
    }

    event.waitUntil(self.registration.showNotification(data.title || "DiGiLABS Notification", options))
})

// Notification click event - handle notification clicks
self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    event.waitUntil(
        clients.matchAll({ type: "window" }).then((clientList) => {
            // If a window client is already open, focus it
            for (const client of clientList) {
                if (client.url === "/" && "focus" in client) {
                    return client.focus()
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow("/")
            }
        }),
    )
})