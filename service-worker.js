importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAlUrPS3z63XaCHHDYR-Q6xKamfMSXZQj1A",
  authDomain: "radio-la-gota-ea116.firebaseapp.com",
  projectId: "radio-la-gota-ea116",
  storageBucket: "radio-la-gota-ea116.firebasestorage.app",
  messagingSenderId: "716796347803",
  appId: "1:716796347803:web:6a7ff1dd276f7fbae271be"
});

const messaging = firebase.messaging();

// Recibir aunque la app esté cerrada
messaging.onBackgroundMessage((payload) => {
  return self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "https://i.imgur.com/17A2JLJ.jpg",
    badge: "https://i.imgur.com/17A2JLJ.jpg",
    data: { url: "/radiolagota/" }
  });
});

self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));