import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { resetPassword } from './firebase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function onReset() {
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert('Check your email', 'Password reset email sent');
    } catch (err) {
      Alert.alert('Reset failed', err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

      <TouchableOpacity style={styles.button} onPress={onReset} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Email'}</Text>
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
