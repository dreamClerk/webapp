import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4gWIYhpiU2vpKfUzi5MLngLojmVvHNaQ",
  authDomain: "dreamclerk-chats.firebaseapp.com",
  projectId: "dreamclerk-chats",
  storageBucket: "dreamclerk-chats.appspot.com",
  messagingSenderId: "199740255958",
  appId: "1:199740255958:web:09e71113c49f9d47eaa377"
};

const chatsApp = !getApps().some(app => app.name === "dreamclerk-chats")
  ? initializeApp(firebaseConfig, "dreamclerk-chats")
  : getApps().find(app => app.name === "dreamclerk-chats");

const chatsDb = getFirestore(chatsApp);

export { chatsApp, chatsDb };
