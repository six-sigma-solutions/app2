import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';
import Navbar from '../components/Navbar';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function AuthGate() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      // If logged in, ensure we're at the home tab
      router.replace('/(tabs)/home');
    } else {
      // If not logged in, go to signin
      router.replace('/signin');
    }
  }, [user, loading, router]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthStartup />
    </AuthProvider>
  );
}

function NavbarWrapper() {
  const { user, loading } = useAuth();
  // don't show navbar while auth is initializing
  if (loading) return null;
  if (!user) return null;
  return <Navbar />;
}

function AuthStartup() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // While loading, show a centered spinner (prevents UI flicker)
  if (loading) {
    return null; // keep blank; you can replace with a spinner view if desired
  }

  // If not authenticated: render only the auth stack (signin, signup, forgot-password)
  if (!user) {
    // Show the Navbar on web during development so designers can preview layout
    if (Platform.OS === 'web') {
      return (
        <>
          <Navbar />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
          </Stack>
        </>
      );
    }

    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // If authenticated: render navbar and the main tabs stack
  return (
    <>
      <NavbarWrapper />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

