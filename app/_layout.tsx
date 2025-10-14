import React from "react";
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Tell Expo Router to use (tabs) as main layout */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
