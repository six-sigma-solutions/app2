import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOutUser } from '../lib/firebase';

type AuthContextType = {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined = undefined;
    (async () => {
      unsub = await onAuthStateChanged((u) => {
        setUser(u);
        setLoading(false);
      });
    })();

    return () => {
      try {
        if (unsub) unsub();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  async function signOut() {
    try {
      await signOutUser();
      setUser(null);
    } catch (err) {
      console.warn('signOut failed', err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
