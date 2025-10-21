import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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
        if (err?.message?.includes('Firebase not initialized')) {
          setError('Authentication backend not configured. Please add your Firebase config to firebaseConfig.ts');
        } else {
          setError(err.message || 'Sign up failed');
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <AuthHeader />

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Name" placeholderTextColor="rgba(255,255,255,0.7)" value={name} onChangeText={setName} accessibilityLabel="Name" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} accessibilityLabel="Email" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.7)" secureTextEntry value={password} onChangeText={setPassword} accessibilityLabel="Password" />

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
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#2a74c6',
    justifyContent: 'center',
  },
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
  error: { color: '#ffdcdc', marginBottom: 8 },
  primaryButton: {
    backgroundColor: '#E16666',
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
