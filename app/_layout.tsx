import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
// Class-based error boundary for React Native
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: any) {
    // You can log error to a service here
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Text style={{ color: 'red', fontSize: 18, margin: 20 }}>Error: {this.state.error.message}</Text>
          <Text selectable style={{ color: 'red', fontSize: 12, margin: 20 }}>{this.state.error.stack}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
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
    <ErrorBoundary>
      <AuthProvider>
        <AuthStartup />
      </AuthProvider>
    </ErrorBoundary>
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
  useEffect(() => {
    console.log('AuthStartup mounted');
  }, []);
  const { user, loading } = useAuth();
  const router = useRouter();
  // While loading, show a centered spinner (prevents UI flicker)
  if (loading) {
    console.log('Auth loading...');
    return null; // keep blank; you can replace with a spinner view if desired
  }

  // If not authenticated: render only the auth stack (signin, signup, forgot-password)
  if (!user) {
    console.log('User not authenticated, showing auth stack');
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
  console.log('User authenticated, showing main tabs');
  return (
    <>
      <NavbarWrapper />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

