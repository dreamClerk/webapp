import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCtIFxqRvVQfttEy1q6MhmUW3qzNYTOA8",
  authDomain: "dreamclerk-app.firebaseapp.com",
  projectId: "dreamclerk-app",
  databaseURL: "https://dreamclerk-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "dreamclerk-app.appspot.com",
  messagingSenderId: "474992921549",
  appId: "1:474992921549:web:31c622abc6da57d9ef9284"
};

const app = !getApps().some(app => app.name === "dreamclerk-app") 
  ? initializeApp(firebaseConfig, "dreamclerk-app") 
  : getApps().find(app => app.name === "dreamclerk-app");

const appDb = getFirestore(app);
const appRealDb = getDatabase(app);
const appStorage = getStorage(app);

export { app, appDb, appRealDb, appStorage };
