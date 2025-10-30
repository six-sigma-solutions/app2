import firebaseConfigFromFile from '../firebaseConfig';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

let _nativeAuth: any | null = null;
let _webAuth: any | null = null;
let _initializedNative = false;
let _initializedWeb = false;

async function initNativeAuth() {
  if (_initializedNative) return _nativeAuth;
  _initializedNative = true;
  try {
    const { NativeModules } = require('react-native');
    if (!NativeModules?.RNFBAppModule) {
      console.warn('[firebase] RNFBAppModule not found, skipping native initialization');
      _nativeAuth = null;
      return null;
    }

    const rnFirebaseAuth = require('@react-native-firebase/auth');
    _nativeAuth = typeof rnFirebaseAuth === 'function' ? rnFirebaseAuth() : rnFirebaseAuth;
    console.log('[firebase] initialized native Firebase Auth');
    return _nativeAuth;
  } catch (err) {
    console.warn('[firebase] native @react-native-firebase/auth not available:', String(err));
    _nativeAuth = null;
    return null;
  }
}

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

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      try {
        const AsyncStorage = require('@react-native-async-storage/async-storage');
        _webAuth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });
        console.log('[firebase] initialized web Firebase Auth with persistence');
        return _webAuth;
      } catch (e) {
        console.warn('[firebase] initializeAuth with AsyncStorage failed, falling back');
      }
    }

    _webAuth = getAuth(app);
    console.log('[firebase] initialized web Firebase Auth');
    return _webAuth;
  } catch (err) {
    console.error('[firebase] failed to initialize web SDK:', err);
    _webAuth = null;
    return null;
  }
}

async function getAuthForPlatform() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const native = await initNativeAuth();
    if (native) return { type: 'native', auth: native };
    const web = await initWebAuth();
    return { type: 'web', auth: web };
  }
  const web = await initWebAuth();
  return { type: 'web', auth: web };
}

export async function signIn(email: string, password: string) {
  const result = await getAuthForPlatform();
  if (!result.auth) throw new Error('Firebase not initialized');
  if (result.type === 'native') {
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
  const { sendPasswordResetEmail } = await import('firebase/auth');
  return sendPasswordResetEmail(result.auth, email);
}

export async function onAuthStateChanged(callback: (user: any) => void) {
  const result = await getAuthForPlatform();
  if (!result.auth) {
    callback(null);
    return () => {};
  }

  if (result.type === 'native') {
    try {
      const unsub = result.auth().onAuthStateChanged(callback);
      return unsub;
    } catch (err) {
      console.warn('[firebase] native onAuthStateChanged failed', String(err));
      callback(null);
      return () => {};
    }
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
