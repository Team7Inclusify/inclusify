import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../KEYS";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
export const auth = getAuth(app);

(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

export const database = getFirestore(app);
