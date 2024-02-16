// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const vapidKey =
  "BHUXW0BVb9aYEkyw3lG8KE_MlLE4pm_NoL6nqt4AQvNJ3qknWd3XYZ6uN17jMpZA3JsLqaXwxwPQQ85VmjNFenA";
const firebaseConfig = {
  apiKey: "AIzaSyA2Xr47GpaHZL0DKbjwlSJXmbO9dHWP9Uo",
  authDomain: "wan-belleview.firebaseapp.com",
  projectId: "wan-belleview",
  storageBucket: "wan-belleview.appspot.com",
  messagingSenderId: "108132035520",
  appId: "1:108132035520:web:182f882be6f7b5430f7625",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

initializeFirestore(FirebaseApp, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

export const Firestore = getFirestore(FirebaseApp);

// firebaseApps previously initialized using initializeApp()
// connectFirestoreEmulator(Firestore, "127.0.0.1", 8080);

const auth = getAuth(FirebaseApp);
// connectAuthEmulator(auth, "http://127.0.0.1:9099");

export const time = 24 * 60 * 60 * 1000;
