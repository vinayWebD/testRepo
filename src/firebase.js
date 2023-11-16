/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyDgP44s6jgJgY3b0o_648cUkT70mb-XLwc',
  authDomain: 'purdriven-9d762.firebaseapp.com',
  projectId: 'purdriven-9d762',
  storageBucket: 'purdriven-9d762.appspot.com',
  messagingSenderId: '261561607690',
  appId: '1:261561607690:web:e9fdf3ff5f85dd9b89a1f3',
  measurementId: 'G-J9PVVS2HMZ'
}

const app = initializeApp(config)
const messaging = getMessaging(app);

// messaging.onBackgroundMessage(function (payload) {
//   console.log('Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

export const Sendrequest = () => {
  console.log('Requesting User Permission……');

  Notification.requestPermission().then(async (permission) => {
    console.log('permission', permission)
    if (permission === 'granted') {
      console.log('Notification User Permission Granted.');
      try {
        const currentToken = await getToken(messaging, { vapidKey: 'BNEr8fsavW_uQMUS_NnllNCekCYO1_MybA1Cizb5noGiko09Rj96yrbVayebnZ2EEEf3FkF8rIU7p9fug9XSJ-0' });
        console.log('currentToken', currentToken)
        if (currentToken) {
          console.log('Client Token: ', currentToken);
        } else {
          console.log('Failed to generate the registration token.');
        }
      } catch (err) {
        console.log('An error occurred when requesting to receive the token', err);
      }
    } else {

      console.log('User Permission Denied.');

    }

  });

  // return getToken(messaging, { vapidKey: 'BNEr8fsavW_uQMUS_NnllNCekCYO1_MybA1Cizb5noGiko09Rj96yrbVayebnZ2EEEf3FkF8rIU7p9fug9XSJ-0' })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log('current token for client: ', currentToken);
  //       // Perform any other neccessary action with the token
  //     } else {
  //       // Show permission request UI
  //       console.log('No registration token available. Request permission to generate one.');
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //   });
};

export const onMessager = () =>

  new Promise((resolve) => {

    onMessage(messaging, (payload) => {

      resolve(payload);

    });

  });
// export default firebase;