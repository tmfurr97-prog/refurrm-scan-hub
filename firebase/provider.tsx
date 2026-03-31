'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type Auth,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  onSnapshot,
  type Firestore,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
  type Query,
} from 'firebase/firestore';

// Firebase configuration - loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app (singleton)
function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeApp(firebaseConfig);
}

// Context types
interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

// FirebaseClientProvider component
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setIsUserLoading(false);
      },
      (error) => {
        setUserError(error);
        setIsUserLoading(false);
      }
    );
    return unsubscribe;
  }, [auth]);

  return (
    <FirebaseContext.Provider value={{ app, auth, firestore, user, isUserLoading, userError }}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Hook to access the Firebase context
function useFirebaseContext(): FirebaseContextValue {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebaseContext must be used within a FirebaseClientProvider');
  }
  return ctx;
}

// useUser - returns current user state
export function useUser() {
  const { user, isUserLoading, userError } = useFirebaseContext();
  return { user, isUserLoading, userError };
}

// useAuth - returns the Firebase Auth instance
export function useAuth() {
  const { auth } = useFirebaseContext();
  return auth;
}

// useFirestore - returns the Firestore instance
export function useFirestore() {
  const { firestore } = useFirebaseContext();
  return firestore;
}

// useDoc - subscribes to a Firestore document
export function useDoc<T = DocumentData>(
  ref: DocumentReference<T> | null | undefined
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setData(snap.exists() ? (snap.data() as T) : null);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [ref]);

  return { data, isLoading, error };
}

// useCollection - subscribes to a Firestore collection or query
export function useCollection<T = DocumentData>(
  queryOrRef: CollectionReference<T> | Query<T> | null | undefined
): { data: T[] | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!queryOrRef) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      queryOrRef,
      (snap) => {
        setData(snap.docs.map((d) => d.data() as T));
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [queryOrRef]);

  return { data, isLoading, error };
}

// useMemoFirebase - memoized Firestore reference factory
export function useMemoFirebase<T>(
  factory: () => T,
  deps?: readonly unknown[]
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps ?? []);
}

// addDocumentNonBlocking - fire-and-forget Firestore document add
export function addDocumentNonBlocking(
  ref: CollectionReference,
  data: DocumentData
): void {
  addDoc(ref, data).catch((err) => console.error('addDocumentNonBlocking error:', err));
}

// updateDocumentNonBlocking - fire-and-forget Firestore document update
export function updateDocumentNonBlocking(
  ref: DocumentReference,
  data: Partial<DocumentData>
): void {
  updateDoc(ref, data).catch((err) => console.error('updateDocumentNonBlocking error:', err));
}

// setDocumentNonBlocking - fire-and-forget Firestore document set
export function setDocumentNonBlocking(
  ref: DocumentReference,
  data: DocumentData,
  options?: { merge?: boolean }
): void {
  setDoc(ref, data, options ?? {}).catch((err) =>
    console.error('setDocumentNonBlocking error:', err)
  );
}

// signUpWithEmailPassword - creates a new user
export async function signUpWithEmailPassword(
  auth: Auth,
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// initiateEmailSignIn - signs in with email/password
export async function initiateEmailSignIn(
  auth: Auth,
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
}
