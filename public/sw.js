const cacheName = 'v1';

// Call Install Event
this.addEventListener('install', e => {
    console.log('[Service Worker] Installed');
});

// Call Activate Event
this.addEventListener('activate', e => {
    console.log('[Service Worker] Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                // eslint-disable-next-line array-callback-return
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

this.addEventListener('fetch', e => {
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http
    // skip the request if request is not made with http protocol
    // Reference: InSantoshMahto https://github.com/iamshaunjp/pwa-tutorial/issues/1
    if (!(e.request.url.indexOf('http') === 0)) return;

    e.respondWith(
        caches.match(e.request).then(res => {
            return (
                res ||
                fetch(e.request).then(response => {
                    return caches.open(cacheName).then(cache => {
                        if (!navigator.onLine) {
                            cache.put(e.request, response.clone());
                        }
                        return response;
                    });
                })
            );
        })
    );
});

this.addEventListener('push', e => {
    const data = e.data.json();
    const options = {
        body: data.body,
        icon: data.icon,
    };

    e.waitUntil(this.registration.showNotification(data.title, options));
});

this.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(this.clients.openWindow(`${process.env.HOST}`));
});
