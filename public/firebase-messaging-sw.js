// /public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
 apiKey: "AIzaSyAJGIgUzhTqWD0i4GTfOYaKXf6kn45RFmM",
  authDomain: "notifications-fd96d.firebaseapp.com",
  projectId: "notifications-fd96d",
  storageBucket: "notifications-fd96d.firebasestorage.app",
  messagingSenderId: "150858804472",
  appId: "1:150858804472:web:656568e02b81d759015f0d"
});

// Get messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  // Extract notification data
  const notificationTitle = payload.notification?.title || payload.data?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'You have a new message',
    // icon: payload.notification?.icon || payload.data?.icon || '/icon-192x192.png', // Add your app icon
    // badge: '/badge-72x72.png', // Optional: small badge icon
    tag: payload.data?.tag || 'default', // Prevent duplicate notifications
    data: payload.data, // Pass through custom data
    requireInteraction: false, // Auto-dismiss after some time
    actions: payload.data?.actions ? JSON.parse(payload.data.actions) : [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ], // Custom action buttons
  };

  // Show the notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);
  
  event.notification.close();
  
  // Handle action button clicks
  if (event.action) {
    console.log('Action clicked:', event.action);
    // Handle specific actions here
    return;
  }
  
  // Default click behavior - open/focus the app
  const urlToOpen = event.notification.data?.click_action || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no existing window, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle notification close events (optional)
self.addEventListener('notificationclose', function(event) {
  console.log('[firebase-messaging-sw.js] Notification closed:', event);
  
  // Optional: Send analytics or cleanup
  // You can track when users dismiss notifications
});

// Service worker installation and activation
self.addEventListener('install', function() {
  console.log('[firebase-messaging-sw.js] Service worker installing...');
  self.skipWaiting(); // Immediately activate new service worker
});

self.addEventListener('activate', function(event) {
  console.log('[firebase-messaging-sw.js] Service worker activating...');
  event.waitUntil(self.clients.claim()); // Claim all clients immediately
});