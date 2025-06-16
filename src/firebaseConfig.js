// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmJkx0oz_maxEJ-cUrjAOBBF1GRFVQ3dY",
  authDomain: "ficha-app-857d6.firebaseapp.com",
  projectId: "ficha-app-857d6",
  storageBucket: "ficha-app-857d6.firebasestorage.app",
  messagingSenderId: "572019229494",
  appId: "1:572019229494:web:d1d9d7b62a9620be782997"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };