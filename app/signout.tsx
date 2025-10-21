import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SignOutPage() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await auth.signOut();
      // replace so user cannot go back
      router.replace('/signin');
    } catch (err) {
      console.error('Error signing out', err);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <Text style={styles.message}>Are you sure you want to sign out?</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => router.push('/home')} disabled={loading}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.confirm]} onPress={handleSignOut} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Sign Out</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#0F2330' },
  message: { textAlign: 'center', marginBottom: 20, color: '#333' },
  actions: { flexDirection: 'row', gap: 12 },
  button: { minWidth: 110, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cancel: { backgroundColor: '#f0f0f0' },
  confirm: { backgroundColor: '#E21212' },
  cancelText: { color: '#0F2330', fontWeight: '600' },
  confirmText: { color: '#fff', fontWeight: '700' },
});
