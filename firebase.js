import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
export function onAuthStateChanged(cb) {
  return firebaseOnAuthStateChanged(auth, cb);
}
export function signOut() {
  return firebaseSignOut(auth);
}
