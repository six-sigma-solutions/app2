import firebaseConfigFromFile from '../firebaseConfig';
import Constants from 'expo-constants';

let _webAuth: any | null = null;
let _initializedWeb = false;

async function initWebAuth() {
  if (_initializedWeb) return _webAuth;
  _initializedWeb = true;
  let firebaseConfig: any = firebaseConfigFromFile;

  try {
    const maybe = Constants?.expoConfig?.extra?.firebaseConfig;
    if ((!firebaseConfig || !firebaseConfig.apiKey) && maybe) {
      console.log('[firebase] using firebaseConfig from Expo Constants');
      firebaseConfig = maybe;
    }
  } catch (e) {}

  if (!firebaseConfig?.apiKey) {
    console.warn('[firebase] firebaseConfig missing — please check firebaseConfig.ts');
    return null;
  }

  try {
    const firebaseAppModule = await import('firebase/app');
    const firebaseAuthModule = await import('firebase/auth');
    const { initializeApp, getApps } = firebaseAppModule;
    const { getAuth, initializeAuth, getReactNativePersistence } = firebaseAuthModule as any;

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

    // Use AsyncStorage persistence on React Native
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      let authInstance;
      try {
        authInstance = getAuth(app);
        // If this succeeds, auth is already initialized
        console.log('[firebase] getAuth returned existing Auth instance');
      } catch (e: any) {
        // If not initialized, initialize it
        if (e.code === 'auth/no-auth') {
          authInstance = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
          });
          console.log('[firebase] initialized Firebase Auth with AsyncStorage persistence');
        } else {
          throw e;
        }
      }
      _webAuth = authInstance;
    } else {
      _webAuth = getAuth(app);
      console.log('[firebase] initialized web Firebase Auth');
    }
    return _webAuth;
  } catch (err) {
    console.error('[firebase] failed to initialize web SDK:', err);
    _webAuth = null;
    return null;
  }
}

async function getAuthForPlatform() {
  const web = await initWebAuth();
  return { type: 'web', auth: web };
}

export async function signIn(email: string, password: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  const { signInWithEmailAndPassword } = await import('firebase/auth');
  return signInWithEmailAndPassword(result.auth, email, password);
}

export async function signUp(email: string, password: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  const { createUserWithEmailAndPassword } = await import('firebase/auth');
  return createUserWithEmailAndPassword(result.auth, email, password);
}

export async function resetPassword(email: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  const { sendPasswordResetEmail } = await import('firebase/auth');
  return sendPasswordResetEmail(result.auth, email);
}

export async function onAuthStateChanged(callback: (user: any) => void) {
  const result = await getAuthForPlatform();
  if (!result.auth) {
    callback(null);
    return () => {};
  }

  const { onAuthStateChanged: webOnAuth } = await import('firebase/auth');
  return webOnAuth(result.auth, callback);
}

export async function signOutUser() {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  const { signOut } = await import('firebase/auth');
  return signOut(result.auth);
}

export async function signOut() {
  return signOutUser();
}
