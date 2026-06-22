import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** O Firebase só é inicializado quando as variáveis de ambiente existem.
 *  Assim o site público continua funcionando (com conteúdo padrão) mesmo
 *  antes de o projeto Firebase ser conectado. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

function ensureApp(): FirebaseApp | undefined {
  if (!isFirebaseConfigured) return undefined;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth | undefined {
  const a = ensureApp();
  if (!a) return undefined;
  if (!authInstance) authInstance = getAuth(a);
  return authInstance;
}

export function getDb(): Firestore | undefined {
  const a = ensureApp();
  if (!a) return undefined;
  if (!dbInstance) dbInstance = getFirestore(a);
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage | undefined {
  const a = ensureApp();
  if (!a) return undefined;
  if (!storageInstance) storageInstance = getStorage(a);
  return storageInstance;
}
