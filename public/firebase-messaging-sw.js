importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
 apiKey: 'AIzaSyD03fCwB4EoR_rN25cl7P8vw2k_bRh8Ca4',
  authDomain: 'maliya-4b31c.firebaseapp.com',
  projectId: 'maliya-4b31c',
  storageBucket: 'maliya-4b31c.firebasestorage.app',
  messagingSenderId: '294257136832',
  appId: '1:294257136832:web:d3250dd77f21dd6e294925',
  measurementId: 'G-DWCBD1JDR3',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/notification-icon.png',
    // badge: '/notification-badge.png',
    tag: 'notification',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  // Focus or open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});