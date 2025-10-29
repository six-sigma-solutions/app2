import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, findNodeHandle, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoScrollView from '../components/AutoScrollView';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Link, useRouter } from 'expo-router';
import AuthHeader from '../components/AuthHeader';
import { signUp as firebaseSignUp } from '../lib/firebase';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const scrollRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  function onSignUp() {
    setError('');
    setLoading(true);
    if (!name || !email || !password) {
      setLoading(false);
      setError('Please fill out all fields');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setLoading(false);
      setError('Please provide a valid email');
      return;
    }

    // Placeholder: after sign up, go to home
    firebaseSignUp(email, password)
      .then(() => router.replace('/(tabs)/home'))
      .catch((err) => {
        console.error('[signup] auth error', err);
        // firebase throws 'Firebase not initialized' when native/web auth wasn't initialized
        if (err?.message?.includes('Firebase not initialized') || err?.message?.includes('not initialized')) {
          setError('Login failed. Please try again');
        } else {
          setError(err.message || 'Sign up failed');
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -60: -70}
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
                ref={nameRef}
                label="Name"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Name"
                onFocus={() => {
                  try {
                    const target = nameRef.current;
                    const native = target?.getNative ? target.getNative() : target;
                    const node = findNodeHandle(native);
                    scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
                  } catch (e) {}
                }}
              />
              <FloatingLabelInput
                ref={emailRef}
                label="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email"
                onFocus={() => {
                  try {
                    const target = emailRef.current;
                    const native = target?.getNative ? target.getNative() : target;
                    const node = findNodeHandle(native);
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
                    const target = passwordRef.current;
                    const native = target?.getNative ? target.getNative() : target;
                    const node = findNodeHandle(native);
                    scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
                  } catch (e) {}
                }}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword((v: boolean) => !v)}>
                    <Text style={{padding:8, color:'#fff', fontSize:18}}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                }
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity accessibilityRole="button" onPress={onSignUp} style={styles.primaryButton}>
                <Text style={styles.primaryText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
              </TouchableOpacity>
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Already have an account? </Text>
                <Link href="/signin" style={styles.bottomLink}>
                  <Text style={styles.bottomLink}>Sign In</Text>
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
  safeArea: { flex: 1, backgroundColor: '#2a74c6' },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#2a74c6',
    justifyContent: 'flex-start',
  },
  form: { marginTop: 10},
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
  bottomText: { color: 'rgba(255,255,255,0.9)' },
  bottomLink: { color: '#fff', fontWeight: '700' },
});
