// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCdf6A9cx9PUdqVc1Xr5Fb64pj13soYarg",
  authDomain: "eshop-1e6eb.firebaseapp.com",
  projectId: "eshop-1e6eb",
  storageBucket: "eshop-1e6eb.appspot.com",
  messagingSenderId: "693594435150",
  appId: "1:693594435150:web:f9823bdec167b1c7061d1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

// email and password signup
export function SignUpFunction(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// email and password signin
export function LoginFunction(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// logout
export async function LogoutFunction(){
  await signOut(auth)
}

// login with google
export function LoginWithGoogleFunction(){
  const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth,googleAuthProvider)
}

// reset password email
export function ResetPasswordFuncition(email){
  return sendPasswordResetEmail(auth,email)
}

export default app;