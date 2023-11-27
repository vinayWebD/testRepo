/* eslint-disable no-undef */
// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDgP44s6jgJgY3b0o_648cUkT70mb-XLwc',
  authDomain: 'purdriven-9d762.firebaseapp.com',
  projectId: 'purdriven-9d762',
  storageBucket: 'purdriven-9d762.appspot.com',
  messagingSenderId: '261561607690',
  appId: '1:261561607690:web:e9fdf3ff5f85dd9b89a1f3',
  measurementId: 'G-J9PVVS2HMZ',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
