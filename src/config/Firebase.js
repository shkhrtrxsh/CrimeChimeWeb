import 'firebase/messaging';
import { getMessaging,getToken,onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDOA8PJp4mzsrv8wa_JXrzUVps6bjo9o0Y',
  authDomain: 'crimechime-fddd5.firebase.com',
  projectId: 'rimechime-fddd5',
  appId: '1:1055894599370:web:4938f4b80db8cdcb3b2633',
  storageBucket: "crimechime-fddd5.appspot.com",
  messagingSenderId: "AAAA9dg49so:APA91bEDd_7fMsucmn1w2ZTmgtCRnUqfQVEALyP7QvfGyBbKbAUvsjPOMFRuAjqIwsnKl2RTwJdk8EIJzeECP2T21xfJBiReJwNutnB9QztgZwh8KIEGn6nJvGi0iD9uSxMPYIIGqhca",

};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging)
  .then((currentToken) => {
    if (currentToken) {
      console.log('Current FCM token:', currentToken);
    } else {
      console.log('No registration token available. Permission is requested automatically.');
    }
  })
  .catch((error) => {
    console.error('Error getting FCM token:', error);
  });

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  // Handle the notification in your app
});

export { messaging };