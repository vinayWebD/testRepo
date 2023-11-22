import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sendrequest, onMessager } from '../../firebase';
import { register } from '../../serviceWorkerRegistration';
import { ToastNotifyInfo } from '../Toast/ToastNotify';
const Notification = () => {
  useEffect(() => {
    register();
    Sendrequest();
    const unsubscribe = onMessager().then((payload) => {
      const data = JSON.parse(payload?.data?.user)
      ToastNotifyInfo(
        `${data.firstName} ${data.lastName} 
        ${payload?.data?.type === 'like' ? 'liked your post' :
          payload?.data?.type === 'comment' ? 'comment on your post' : 'requested you to follow'
        }`)
    });

    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, []);

  // useEffect(() => {
  //   if (notification?.title) {
  //     notify();
  //   }
  // }, [notification]);

  // const notify = () => toast(<ToastDisplay notification={notification} />);

  return <Toaster />; // The <Toaster /> should be inside the return block.
};

// function ToastDisplay({ notification }) {
//   return (
//     <div>
//       <p>
//         <b>{notification?.title}</b>
//       </p>
//       <p>{notification?.body}</p>
//     </div>
//   );

// }

export default Notification;
