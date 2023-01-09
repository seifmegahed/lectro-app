import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdLM6MjAAAAAEStPp3orS_ErpmS-484hyA4kmWx"),
  isTokenAutoRefreshEnabled: true,
});
