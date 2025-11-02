import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
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
      // Force sign-out on every launch (all platforms, including web)
      try {
        await signOutUser();
        console.log('[AuthProvider] forced sign-out on every launch');
      } catch (e) {
        // ignore sign-out errors
      }

      // Safety timeout: if auth initialization stalls (native module issues or
      // networking), don't keep the whole app blank in production. After 5s
      // fall back to unauthenticated state so routes (signin/signup) render.
      const safetyTimeout = setTimeout(() => {
        console.warn('[AuthProvider] auth init timeout - falling back to unauthenticated state');
        setUser(null);
        setLoading(false);
      }, 5000);

      unsub = await onAuthStateChanged((u) => {
        // auth responded; clear the safety timeout and update state
        try {
          clearTimeout(safetyTimeout);
        } catch (e) {}
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
