import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import AuthHeader from '../components/AuthHeader';
import { resetPassword as firebaseReset } from '../lib/firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function onReset() {
    setLoading(true);
    if (!email) {
      setLoading(false);
      setMessage('Please enter your email');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setLoading(false);
      setMessage('Please enter a valid email');
      return;
    }
    firebaseReset(email)
      .then(() => setMessage('If that email exists we sent a reset link'))
      .catch((err) => {
        console.error('[reset] auth error', err);
        if (err?.message?.includes('Firebase not initialized')) {
          setMessage('Authentication backend not configured. Please add your Firebase config to firebaseConfig.ts');
        } else {
          setMessage(err.message || 'Unable to send reset');
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <AuthHeader title="Forgot password" subtitle="" />

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} accessibilityLabel="Email" />

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <TouchableOpacity accessibilityRole="button" onPress={onReset} style={styles.primaryButton}>
            <Text style={styles.primaryText}>{loading ? 'Sending...' : 'Reset Password'}</Text>
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <Link href="/signin">
              <Text style={styles.backText}>Back to Sign In</Text>
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
  message: { color: 'rgba(255,255,255,0.95)', marginBottom: 8 },
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
  backText: { color: 'rgba(255,255,255,0.95)' },
});
