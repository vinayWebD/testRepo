/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { config } from './firebaseKeys';

const app = initializeApp(config);
const messaging = getMessaging(app);

export const Sendrequest = () => {
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            'BNEr8fsavW_uQMUS_NnllNCekCYO1_MybA1Cizb5noGiko09Rj96yrbVayebnZ2EEEf3FkF8rIU7p9fug9XSJ-0',
        });
        if (currentToken) {
          localStorage.setItem('fcm', currentToken)
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
};

export const onMessager = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
// export default firebase;
