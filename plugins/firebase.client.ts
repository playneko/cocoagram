import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyA4Zuj_42LnleE32gwGmMaZTwYOT--u1M4",
    authDomain: "cocoa-ab10c.firebaseapp.com",
    databaseURL: "https://cocoa-ab10c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cocoa-ab10c",
    storageBucket: "cocoa-ab10c.appspot.com",
    messagingSenderId: "123289636830",
    appId: "1:123289636830:web:3225b5eb5b51b10cea574f",
    measurementId: "G-E2LJST3FZM"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
});
