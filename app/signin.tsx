import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, findNodeHandle, StatusBar, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoScrollView from '../components/AutoScrollView';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Link, useRouter } from 'expo-router';
import AuthHeader from '../components/AuthHeader';
import { signIn as firebaseSignIn } from '../lib/firebase';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const scrollRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  useEffect(() => {
    // Try to set navigation bar color & button style at runtime if expo-navigation-bar is available.
    (async () => {
      try {
        // require.resolve throws if module isn't present; keeps bundlers happy
        if (require.resolve && typeof require.resolve === 'function') {
          try {
            require.resolve('expo-navigation-bar');
          } catch (err) {
            return; // not installed
          }
        }

        // dynamic require so bundlers don't crash when package is missing
         
        const NavigationBar = require('expo-navigation-bar');
        if (NavigationBar?.setBackgroundColorAsync) {
          await NavigationBar.setBackgroundColorAsync('#2a74c6');
        }
        if (NavigationBar?.setButtonStyleAsync) {
          await NavigationBar.setButtonStyleAsync('light');
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    try {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#2a74c6', true);
      }
    } catch (e) {}
  }, []);

  function onSignIn() {
    setError('');
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      setError('Please enter email and password');
      return;
    }
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setLoading(false);
      setError('Please enter a valid email');
      return;
    }

    firebaseSignIn(email, password)
      .then(() => router.replace('/(tabs)/home'))
      .catch((err) => {
        console.error('[signin] auth error', err);
        if (err?.message?.includes(' not initialized')) {
          setError( 'Login failed. Please try again');
        } else {
          setError(err.message || 'Sign in failed');
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -60 : -70}
    >
      <SafeAreaView edges={["top","bottom"]} style={styles.safeArea}>
        <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
          <AutoScrollView
            ref={scrollRef}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <AuthHeader />
            <View style={styles.form}>
              <FloatingLabelInput
                ref={emailRef}
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email"
                onFocus={() => {
                  try {
                    const node = findNodeHandle(emailRef.current);
                    scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
                  } catch (e) {}
                }}
              />
              <FloatingLabelInput
                ref={passwordRef}
                label="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password"
                onFocus={() => {
                  try {
                    const node = findNodeHandle(passwordRef.current);
                    scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
                  } catch (e) {}
                }}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword((v: boolean) => !v)}>
                    <Text style={{padding:8, color:'#fff', fontSize:18}}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                }
              />
              <Link href="/forgot-password" asChild>
                <TouchableOpacity style={styles.forgotLink}>
                  <Text style={styles.forgotText}>Forgot password ?  </Text>
                </TouchableOpacity>
              </Link>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity accessibilityRole="button" onPress={onSignIn} style={styles.primaryButton}>
                <Text style={styles.primaryText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
              </TouchableOpacity>
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Don&apos;t have an account? </Text>
                <Link href="/signup" style={styles.bottomLink}>
                  <Text style={styles.bottomLink}> Sign Up</Text>
                </Link>
              </View>
            </View>
          </AutoScrollView>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 56,
    paddingBottom: 40,
    backgroundColor: '#2a74c6',
    justifyContent: 'flex-start',
  },
  safeArea: { flex: 1, backgroundColor: '#2a74c6' },
  form: { marginTop: 10 },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 12,
    marginBottom: 12,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.03)'
  },
  forgotLink: { alignSelf: 'flex-end', marginBottom: 12 },
  forgotText: { color: '#fff', opacity: 0.9 },
  error: { color: '#ffdcdc', marginBottom: 8 },
  primaryButton: {
    backgroundColor: '#d63333ff',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  bottomText: { color: 'rgba(230, 26, 26, 0.9)' },
  bottomLink: { color: '#fff', fontWeight: '700' },
});
