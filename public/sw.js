// Service Worker for PWA functionality

const CACHE_NAME = "digilabs-notification-app-v1"
const urlsToCache = ["/", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache)
        }),
    )
})

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

self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : { title: "DiGiLABS Notification", body: "You have a new notification!" }

    const options = {
        body: data.body || "You have a new notification!",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        vibrate: [100, 50, 100],
        data: {
            url: data.url || "/",
        },
    }

    event.waitUntil(self.registration.showNotification(data.title || "DiGiLABS Notification", options))
})

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