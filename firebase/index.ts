'use client';

// Firebase module - provides React hooks and utilities for Firebase integration
// Re-exports everything from the provider for convenient importing
export {
  FirebaseClientProvider,
  useUser,
  useAuth,
  useFirestore,
  useDoc,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  setDocumentNonBlocking,
  signUpWithEmailPassword,
  initiateEmailSignIn,
} from './provider';
