import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signUp } from './firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onRegister() {
    setLoading(true);
    try {
      await signUp(email, password);
      // onAuthStateChanged will send user to Home
    } catch (err) {
      console.error('[signup] auth error', err);
      const code = err?.code || '';
      const msg = err?.message || String(err);
      Alert.alert('Register failed', `${code} — ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={onRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { height: 48, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  button: { backgroundColor: '#2a74c6', height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
