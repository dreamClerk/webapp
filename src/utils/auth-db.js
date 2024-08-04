import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClKeWtpxeZIH94tD6mFYs3ikcGTc38wWc",
  authDomain: "dreamclerk-db.firebaseapp.com",
  projectId: "dreamclerk-db",
  storageBucket: "dreamclerk-db.appspot.com",
  messagingSenderId: "736775856999",
  appId: "1:736775856999:web:9cda36d659297e339b05c2",
  measurementId: "G-L4PDSH40MJ"
};

const authApp = !getApps().some(app => app.name === "dreamclerk-auth") 
  ? initializeApp(firebaseConfig, "dreamclerk-auth") 
  : getApps().find(app => app.name === "dreamclerk-auth");

const auth = getAuth(authApp);
const authDb = getFirestore(authApp);
const authStorage = getStorage(authApp);
const authAnalytics = getAnalytics(authApp);

export { authApp, authDb, auth, authStorage, authAnalytics };
