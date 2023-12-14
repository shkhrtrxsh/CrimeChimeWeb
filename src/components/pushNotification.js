import { useEffect } from 'react';
import {messaging} from "src/config/Firebase"; // Import the initialized messaging instance

const PushNotification = () => {
  useEffect(() => {
    // Request permission for notifications
    // messaging.requestPermission()
    //   .then(() => {
    //     console.log('Permission granted');
    //     return messaging.getToken();
    //   })
    //   .then((token) => {
    //     console.log('FCM Token:', token);
    //   })
    //   .catch((error) => {
    //     console.error('Permission denied:', error);
    //   });

    // // Handle incoming messages
    // messaging.onMessage((payload) => {
    //   console.log('Message received:', payload);
    //   // Handle the notification in your app
    // });
  }, []);

  // ... rest of your component

  return (
    <></>
  );
};

export default PushNotification;