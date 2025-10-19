import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "react/compiler-runtime";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const BASE_HEIGHT = 58; // Your desired tab bar height without system nav
  const bottomInset = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor: "#0a66c2",
        tabBarInactiveTintColor: "#222",

        // ✅ Main Fix: properly handle system nav & gesture bar
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.6,
          borderTopColor: "#ccc",
          // Height increases only when the system adds a bottom inset
          height: BASE_HEIGHT + bottomInset,
          paddingBottom: bottomInset > 0 ? bottomInset : 8, // minimum 8 padding if no inset
          paddingTop: 0,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: "Health",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wealth"
        options={{
          title: "Wealth",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: "Family",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mylife"
        options={{
          title: "My Life",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf-outline" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}