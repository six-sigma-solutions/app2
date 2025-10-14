import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function MyLifeLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: "#244e35ff",
        tabBarInactiveTintColor: "#777",
        tabBarIndicatorStyle: { backgroundColor: "#17e46dff", height: 3 },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          textTransform: "none",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="entrepreneur"
        options={{ title: "Entrepreneur" }}
      />
      <MaterialTopTabs.Screen name="income" options={{ title: "Income" }} />
      <MaterialTopTabs.Screen
        name="womenempowerment"
        options={{ title: "Women Empowerment" }}
      />
      <MaterialTopTabs.Screen name="students" options={{ title: "Students" }} />
      <MaterialTopTabs.Screen name="elder" options={{ title: "Elder" }} />
    </MaterialTopTabs>
  );
}
