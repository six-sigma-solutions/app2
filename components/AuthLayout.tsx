import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
