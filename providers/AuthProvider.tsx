import React from 'react';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type AuthContext = {
  user?: FirebaseAuthTypes.User | null;
  error?: string;
  signInUser?: (email: string, password: string) => Promise<void>;
  signUpUser?: (email: string, password: string) => Promise<void>;
  signOutUser?: () => Promise<void>;
  clearError?: () => void;
};

const context = createContext<AuthContext>({});

const getAuthError = (firebaseError: string) => {
  switch (firebaseError) {
    case 'auth/email-already-in-use':
      return 'email-already-in-use';
    case 'auth/user-not-found':
      return 'user-not-found';
    case 'auth/wrong-password':
      return 'wrong-password';
    default:
      return 'unknown-error';
  }
};

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [error, setError] = useState<string>();

  const signInUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      const _error = getAuthError(firebaseError.code);
      setError(_error);
    }
  }, []);

  const signUpUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      const _error = getAuthError(firebaseError.code);
      setError(_error);
    }
  }, []);

  const signOutUser = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (err) {
      const firebaseError = err as {code: string};
      const _error = getAuthError(firebaseError.code);
      setError(_error);
    }
  };

  const clearError = () => {
    setError(undefined);
  };

  const getLoggedUser = useCallback(async (loggedUser: FirebaseAuthTypes.User | null) => {
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(getLoggedUser);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<AuthContext>(
    () => ({
      user,
      error,
      signInUser,
      signUpUser,
      signOutUser,
      clearError,
    }),
    [user, error, signInUser, signUpUser],
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useGetLoggedUser = () => useContext(context).user;
export const useGetAuthError = () => useContext(context).error;
export const useSignIn = () => useContext(context).signInUser;
export const useSignUp = () => useContext(context).signUpUser;
export const useSignOut = () => useContext(context).signOutUser;
export const useClearAuthError = () => useContext(context).clearError;
