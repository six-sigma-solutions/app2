// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     color: "#222",
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
// Root index — redirect to the main tabs home route so the router always
// has a matching entry for '/'. This prevents the 'Unmatched Route' page.
export default function Index() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Only attempt to redirect when the Root Layout is mounted and
    // router state has stabilized. Checking segments length is a
    // lightweight guard that indicates routing context is available.
    if (segments && segments.length >= 0) {
      // small timeout to ensure root navigators mount first on web
      const id = setTimeout(() => router.replace('/(tabs)/home'), 50);
      return () => clearTimeout(id);
    }
  }, [router, segments]);
}
