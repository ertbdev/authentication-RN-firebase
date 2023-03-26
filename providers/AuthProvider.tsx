import React from 'react';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type AuthContext = {
  user?: FirebaseAuthTypes.User | null;
  signInUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  singInUserUsingGoogle: () => Promise<void>;
};

const context = createContext<AuthContext | null>(null);

const getAuthError = (firebaseError: string) => {
  switch (firebaseError) {
    case 'auth/email-already-in-use':
      return 'email-already-in-use';
    case 'auth/user-not-found':
      return 'user-not-found';
    case 'auth/wrong-password':
      return 'wrong-password';
    case 'auth/too-many-requests':
      return 'too-many-requests';
    default:
      return 'unknown-error';
  }
};

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const signInUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      const _error = getAuthError(firebaseError.code);
      throw _error;
    }
  }, []);

  const singInUserUsingGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.log(firebaseError);
      // const _error = getAuthError(firebaseError.code);
      // throw _error;
    }
  };

  const signUpUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      const _error = getAuthError(firebaseError.code);
      throw _error;
    }
  }, []);

  const signOutUser = async () => {
    try {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
      isSignedInWithGoogle && (await GoogleSignin.signOut());
      await auth().signOut();
      setUser(null);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      const _error = getAuthError(firebaseError.code);
      throw _error;
    }
  };

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      const _error = getAuthError(firebaseError.code);
      throw _error;
    }
  }, []);

  const getLoggedUser = useCallback(async (loggedUser: FirebaseAuthTypes.User | null) => {
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(getLoggedUser);

    GoogleSignin.configure({
      webClientId: '26665976803-9o82f9if6hpog72id8mcdrrf3lvondlk.apps.googleusercontent.com',
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<AuthContext>(
    () => ({
      user,
      signInUser,
      signUpUser,
      signOutUser,
      sendPasswordResetEmail,
      singInUserUsingGoogle,
    }),
    [user, signInUser, signUpUser, sendPasswordResetEmail],
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    throw new Error('authContext error');
  }
  return authContext;
};
