/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase using the configuration credentials
const firebaseConfig = {
  apiKey: "AIzaSyCOrSvIv3xzbGswc5S0RxnGyp96pMHY8vQ",
  authDomain: "amsmultiservices-2aacd.firebaseapp.com",
  projectId: "amsmultiservices-2aacd",
  storageBucket: "amsmultiservices-2aacd.firebasestorage.app",
  messagingSenderId: "999661441213",
  appId: "1:999661441213:web:91eddc1c2248e2c30967d4",
  measurementId: "G-565C0X9LCM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Se connecter / Sign In
export async function connecter(email: string, motDePasse: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, motDePasse);
  return result.user;
}

// Connexion avec Google
export async function connecterAvecGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Créer un compte / Sign Up
export async function inscrire(email: string, motDePasse: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, motDePasse);
  await sendEmailVerification(result.user);
  return result.user;
}

// Renvoyer un email de vérification (ex: bouton "Je n'ai pas reçu l'email de vérification")
export async function renvoyerEmailVerification(): Promise<void> {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  } else {
    throw new Error("Aucun utilisateur n'est connecté. Connectez-vous d'abord.");
  }
}

// Se déconnecter / Sign Out
export async function deconnecter(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
export type { User };
