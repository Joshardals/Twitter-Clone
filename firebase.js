import { initializeApp, getApp, getApps } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDR4_rHq9RMmaBoOdhpiMZrBcpIHSrZehU",
  authDomain: "twitter-clone-830df.firebaseapp.com",
  projectId: "twitter-clone-830df",
  storageBucket: "twitter-clone-830df.appspot.com",
  messagingSenderId: "221309560231",
  appId: "1:221309560231:web:cde426b9553fa11f908282",
  measurementId: "G-5GYNGL0MCX",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFireStore();
const storage = getStorage();

export default app;
export { db, storage };
