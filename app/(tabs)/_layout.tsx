import React from "react";
import { Tabs } from "expo-router";
import "react/compiler-runtime"
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0a66c2",
        tabBarInactiveTintColor: "#222",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          borderTopWidth: 0.6,
          borderTopColor: "#ccc",
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          fontFamily: "System",
        },
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={23} color={color} />
          ),
        }}
      />

      {/* ❤️ Health */}
      <Tabs.Screen
        name="health"
        options={{
          title: "Health",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={23} color={color} />
          ),
        }}
      />

      {/* 💰 Wealth */}
      <Tabs.Screen
        name="wealth"
        options={{
          title: "Wealth",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={23} color={color} />
          ),
        }}
      />

      {/* 👨‍👩‍👧‍👦 Family */}
      <Tabs.Screen
        name="family"
        options={{
          title: "Family",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={23} color={color} />
          ),
        }}
      />

      {/* 🌿 My Life (nested layout) */}
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

      {/* ℹ️ About (nested layout) */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
