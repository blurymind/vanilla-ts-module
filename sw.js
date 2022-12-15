const cacheName = "1629829956916";

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll([
            '/tilemap-editor/',
            '/tilemap-editor/index.html',
            '/tilemap-editor/src/tilemap-editor.js',
            '/tilemap-editor/src/styles.css',
        ])),
    );
});

self.addEventListener('message',  (e) => {
    if (e.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.match( /^.*(imgur=).*$/) ) {
        return false;
    }
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => fetch(e.request) || response),
    );
});


// Pwa stuff
let newWorker;
function showUpdateBar() {
    let snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
}
// The click event on the pop up notification
document.getElementById('reload').addEventListener('click', function(){
    newWorker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/tilemap-editor/sw.js').then(reg => {
        console.log('Service Worker Registered');
        reg.addEventListener('updatefound', () => {
            // A wild service worker has appeared in reg.installing!
            newWorker = reg.installing;

            newWorker.addEventListener('statechange', () => {
                // Has network.state changed?
                switch (newWorker.state) {
                    case 'installed':
                        if (navigator.serviceWorker.controller) {
                            showUpdateBar();
                        }
                        break;
                }
            });
        });
    });
}
let refreshing;
navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
});

let deferredPrompt;
const addBtn = document.getElementById("addPwaBtn");
addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';
    addBtn.addEventListener('click', () => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
window.addEventListener('appinstalled', () => {
    addBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('PWA was installed');
});