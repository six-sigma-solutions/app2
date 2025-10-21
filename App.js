import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, TouchableOpacity, Text } from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import { auth, onAuthStateChanged, signOut } from './firebase';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged is re-exported from firebase.js
    const unsubscribe = onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerRight: () => (
                <TouchableOpacity onPress={() => signOut()} style={{ marginRight: 12 }}>
                  <Text style={{ color: '#E16666', fontWeight: '700' }}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" options={{ title: 'Login' }} component={LoginScreen} />
            <Stack.Screen name="Register" options={{ title: 'Register' }} component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" options={{ title: 'Forgot Password' }} component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
