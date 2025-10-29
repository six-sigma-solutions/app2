import firebaseConfigFromFile from '../firebaseConfig';
import { Platform } from 'react-native';
// Try to pick up firebase config from other sources (expo Constants or env)
import Constants from 'expo-constants';

// We'll try to use the native @react-native-firebase/auth when running on
// native platforms (Android/iOS) and fall back to the Web JS SDK on web.
let _nativeAuth: any | null = null;
let _webAuth: any | null = null;
let _initializedNative = false;
let _initializedWeb = false;

async function initNativeAuth() {
  if (_initializedNative) return _nativeAuth;
  _initializedNative = true;
  try {
    // Before requiring the RNFB JS package ensure the native module is linked.
    // Requiring the package when the native module is missing can cause a hard
    // crash during module initialization. Check NativeModules first.
     
    const { NativeModules } = require('react-native');
    if (!NativeModules || !NativeModules.RNFBAppModule) {
      console.warn('[firebase] RNFBAppModule not present; skipping native @react-native-firebase initialization');
      _nativeAuth = null;
      return null;
    }

     
    const rnFirebaseAuth = require('@react-native-firebase/auth');
    // Some versions of the package export a function, some export an object.
    _nativeAuth = typeof rnFirebaseAuth === 'function' ? rnFirebaseAuth() : rnFirebaseAuth;
    console.log('[firebase] initialized native @react-native-firebase/auth');
    return _nativeAuth;
  } catch (err) {
    // native package not available or failed to initialize
  console.warn('[firebase] native @react-native-firebase/auth not available:', String(err));
    _nativeAuth = null;
    return null;
  }
}

async function initWebAuth() {
  if (_initializedWeb) return _webAuth;
  _initializedWeb = true;
  // Primary: firebaseConfig.ts (static file)
  let firebaseConfig: any = firebaseConfigFromFile;

  // Fallback 1: check Expo Constants (app.json extra or eas build profiles)
  try {
    const maybe = (Constants?.manifest?.extra?.firebaseConfig) || (Constants?.expoConfig?.extra?.firebaseConfig);
    if ((!firebaseConfig || !firebaseConfig.apiKey) && maybe) {
      console.log('[firebase] using firebaseConfig from Expo Constants.extra');
      firebaseConfig = maybe;
    }
  } catch (e) {}

  // Fallback 2: environment variables (EAS secrets or process.env)
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    const envApiKey = process.env.FIREBASE_API_KEY || (Constants?.manifest?.extra?.FIREBASE_API_KEY) || (Constants?.expoConfig?.extra?.FIREBASE_API_KEY);
    if (envApiKey) {
      console.log('[firebase] building firebaseConfig from environment variables');
      firebaseConfig = {
        apiKey: envApiKey,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || Constants?.manifest?.extra?.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID || Constants?.manifest?.extra?.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || Constants?.manifest?.extra?.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || Constants?.manifest?.extra?.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID || Constants?.manifest?.extra?.FIREBASE_APP_ID,
      };
    }
  }

  if (!firebaseConfig || !firebaseConfig.apiKey) {
    console.warn('[firebase] firebaseConfig is missing or incomplete. Please add your Firebase web config to firebaseConfig.ts, or provide it via app.json extra or EAS secrets.');
    return null;
  }

  try {
    const firebaseAppModule = await import('firebase/app');
    const firebaseAuthModule = await import('firebase/auth');
    const { initializeApp, getApps } = firebaseAppModule;
    // Pull initializeAuth and persistence helpers; they may not be used on pure web
    const { getAuth, initializeAuth, getReactNativePersistence } = firebaseAuthModule as any;

    // Ensure there's an app instance
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig as any);

    // On native platforms prefer to initialize the Web SDK with React Native AsyncStorage
    // so auth state persists between sessions. If AsyncStorage is available we'll use it.
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      try {
         
        const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage');
        if (ReactNativeAsyncStorage && initializeAuth && getReactNativePersistence) {
          try {
            _webAuth = initializeAuth(app, {
              persistence: getReactNativePersistence(ReactNativeAsyncStorage),
            });
            console.log('[firebase] initialized web firebase/auth with ReactNative AsyncStorage persistence');
            return _webAuth;
          } catch (e) {
            console.warn('[firebase] initializeAuth with AsyncStorage failed, falling back to getAuth()', e);
          }
        }
      } catch (e) {
        // AsyncStorage not installed — we continue to create a non-persistent auth instance
        // and log a helpful message below (firebase will also warn).
      }
    }

    // Default: use standard getAuth (memory or browser persistence)
    _webAuth = getAuth(app);
    console.log('[firebase] initialized web firebase/auth');
    return _webAuth;
  } catch (err) {
    console.error('[firebase] failed to initialize web firebase SDK:', err);
    _webAuth = null;
    return null;
  }
}

async function getAuthForPlatform() {
  // On native platforms prefer native module
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const native = await initNativeAuth();
    if (native) return { type: 'native', auth: native };
    const web = await initWebAuth();
    console.log('[firebase] falling back to web auth on native platform');
    return { type: 'web', auth: web };
  }

  // For web & other platforms use web SDK
  const web = await initWebAuth();
  console.log('[firebase] using web auth (non-native platform)');
  return { type: 'web', auth: web };
}

export async function signIn(email: string, password: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
    // native auth uses signInWithEmailAndPassword as a method on the module
    return result.auth.signInWithEmailAndPassword(email, password);
  }
  const { signInWithEmailAndPassword } = await import('firebase/auth');
  return signInWithEmailAndPassword(result.auth, email, password);
}

export async function signUp(email: string, password: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
    return result.auth.createUserWithEmailAndPassword(email, password);
  }
  const { createUserWithEmailAndPassword } = await import('firebase/auth');
  return createUserWithEmailAndPassword(result.auth, email, password);
}

export async function resetPassword(email: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
    return result.auth.sendPasswordResetEmail(email);
  }
  const { sendPasswordResetEmail } = await import('firebase/auth');
  return sendPasswordResetEmail(result.auth, email);
}

export async function getAuthInstance() {
  const result = await getAuthForPlatform();
  return result.auth;
}

// Subscribe to auth state changes. Returns an unsubscribe function.
export async function onAuthStateChanged(callback: (user: any) => void) {
  const result = await getAuthForPlatform();
  if (!result.auth) {
    // no auth available
    callback(null);
    return () => {};
  }

  if (result.type === 'native') {
    try {
      // native module is a function returning the auth instance
      const unsub = result.auth().onAuthStateChanged((user: any) => callback(user));
      return unsub;
    } catch (err) {
      console.warn('[firebase] native onAuthStateChanged failed', String(err));
      callback(null);
      return () => {};
    }
  }

  // web
  try {
    const { onAuthStateChanged: webOnAuth } = await import('firebase/auth');
    const unsub = webOnAuth(result.auth, (user: any) => callback(user));
    return unsub;
  } catch (err) {
    console.error('[firebase] web onAuthStateChanged failed', err);
    callback(null);
    return () => {};
  }
}

export async function signOutUser() {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
    return result.auth().signOut();
  }
  const { signOut } = await import('firebase/auth');
  return signOut(result.auth);
}

// Sign out helper usable by both native and web
export async function signOut() {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
    return result.auth.signOut();
  }
  const { signOut: webSignOut } = await import('firebase/auth');
  return webSignOut(result.auth);
}

// Subscribe to auth state changes. Callback receives user or null.
export async function subscribeAuth(callback: (user: any) => void) {
  const result = await getAuthForPlatform();
  if (!result.auth) {
    // If auth not available, call callback(null) and return a noop unsubscribe
    callback(null);
    return () => {};
  }

  if (result.type === 'native') {
    // native: auth.onAuthStateChanged returns unsubscribe
    const unsub = result.auth.onAuthStateChanged(callback);
    return unsub;
  }

  const { onAuthStateChanged } = await import('firebase/auth');
  const unsub = onAuthStateChanged(result.auth, callback);
  return unsub;
}
