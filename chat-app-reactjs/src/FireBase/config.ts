import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNRpfw5Xyw3ozm4717tizYpvvbwVV89Dk',
  authDomain: 'chat-app-9bd60.firebaseapp.com',
  projectId: 'chat-app-9bd60',
  storageBucket: 'chat-app-9bd60.firebasestorage.app',
  messagingSenderId: '1017893369251',
  appId: '1:1017893369251:web:19cac2e028a239dfde5616',
  measurementId: 'G-ZT19TGZP33',
  databaseURL:
    'https://chat-app-9bd60-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);
