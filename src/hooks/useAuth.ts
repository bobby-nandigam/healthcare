import { useEffect } from 'react';
import { auth, onAuthStateChanged } from '../services/firebase';
import { useAppStore } from '../store/useAppStore';
import { User } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, authLoading, setUser, setAuthLoading } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setAuthLoading]);

  return { user, isAuthenticated, authLoading };
};
