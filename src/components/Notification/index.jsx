import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Sendrequest, onMessager } from '../../firebase';
import { register } from '../../serviceWorkerRegistration';
const Notification = () => {

  const [notification, setNotification] = useState({ title: '', body: '' });
  useEffect(() => {

    register();
    Sendrequest();

    const unsubscribe = onMessager().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
        duration: 60000,
        position: 'top-right',
      });
    });

    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, []);

  console.log('notification', notification);

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
