import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkxThu763pLlicg7TEPSDn5YnAPO3VC3M",
  authDomain: "fir-auth-dd335.firebaseapp.com",
  projectId: "fir-auth-dd335",
  storageBucket: "fir-auth-dd335.firebasestorage.app",
  messagingSenderId: "129243239737",
  appId: "1:129243239737:web:6d717d41b9d727c72584e8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
