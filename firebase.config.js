
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA1U2xC_gaR6Ha_29p65U6iBonmJC8nY0Q",
  authDomain: "otp-project-7d3c9.firebaseapp.com",
  projectId: "otp-project-7d3c9",
  storageBucket: "otp-project-7d3c9.appspot.com",
  messagingSenderId: "409148024618",
  appId: "1:409148024618:web:a5289f024192f24957a053",
  measurementId: "G-WVFFFZQS6G"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)