/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FIREBASE_CONSTANT } from './constants/constants';
import { config } from './firebaseKeys';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(config);
const messaging = getMessaging(app);

export const Sendrequest = () => {
  if (typeof Notification === 'function') {
    console.log('notification');
    Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: FIREBASE_CONSTANT.KEY,
          });
          if (currentToken) {
            localStorage.setItem('fcm', currentToken);
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
  }
};

export const onMessager = () =>
  new Promise((resolve) => {
    console.log('messaging', messaging);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export const db = getFirestore(app);
// export default firebase;
