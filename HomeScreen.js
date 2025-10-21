import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut, onAuthStateChanged } from './firebase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged((u) => {
      setUserEmail(u?.email || '');
    });
    return unsub;
  }, []);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      // replace so user cannot go back
      router.replace('/signin');
    } catch (err) {
      console.warn('Sign out failed', err);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header with Contact and Sign Out on top-left */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/contact')}>
          <Text style={styles.iconText}>📞</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleSignOut} disabled={loading}>
          <Text style={[styles.iconText, { color: '#E21212' }]}>{loading ? '...' : '🚪'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome, {userEmail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'flex-start', alignItems: 'flex-start' },
  headerRow: { flexDirection: 'row', gap: 12, marginTop: 6, marginBottom: 18 },
  iconButton: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f8fa' },
  iconText: { fontSize: 20 },
  title: { fontSize: 20, marginBottom: 18 },
});
