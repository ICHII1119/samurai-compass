/**
 * firebase-messaging-sw.js
 * FCM Service Worker for Web Push notifications (English version).
 *
 * SETUP:
 *   1. Firebase Console → Project Settings → Cloud Messaging
 *   2. Web Push certificates → Generate key pair → copy the public key
 *   3. In lite.html, replace 'YOUR_VAPID_KEY_HERE' with that key
 *   4. Deploy this file to the same directory as lite.html (files-en/)
 */

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC1qm7kUjSRk7QRwxK-W7bH1q-pqH3lklU",
  authDomain: "samurai-compass.firebaseapp.com",
  projectId: "samurai-compass",
  storageBucket: "samurai-compass.firebasestorage.app",
  messagingSenderId: "502771859953",
  appId: "1:502771859953:web:89e801832fdd42c6cb0450"
});

const messaging = firebase.messaging();

/* Background message handler (app not in foreground) */
messaging.onBackgroundMessage(payload => {
  const { title = 'SAMURAI in You', body = "Today's practice is waiting.", url } = payload.data || payload.notification || {};
  self.registration.showNotification(title, {
    body,
    icon: '../logo.png',
    badge: '../logo.png',
    data: { url: url || './practice.html' },
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || './practice.html';
  e.waitUntil(clients.openWindow(url));
});
