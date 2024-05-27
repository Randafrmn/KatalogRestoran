import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  let dataJson;
  let notification;

  try {
    dataJson = event.data.json();
    notification = {
      title: dataJson.title || 'Default Title',
      options: {
        body: dataJson.options?.body || 'Default body',
        icon: dataJson.options?.icon || '/default-icon.png',
        image: dataJson.options?.image || '/default-image.png',
      },
    };
  } catch (e) {
    const textData = event.data.text();
    notification = {
      title: 'Notification',
      options: {
        body: textData,
        icon: '/default-icon.png',
      },
    };
  }

  event.waitUntil(
    self.registration.showNotification(notification.title, notification.options),
  );
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const chainPromise = async () => {
    console.log('Notification has been clicked');
    await self.clients.openWindow(
      'https://www.dicoding.com/',
    );
  };

  event.waitUntil(chainPromise());
});
