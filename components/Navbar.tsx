import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Navbar() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        {/* Left Logo */}
        <Link href="/home" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.logoWrapper}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png",
              }}
              resizeMode="contain"
              style={styles.logo}
            />
          </TouchableOpacity>
        </Link>

        {/* Right Contact */}
        <Link href="/contact" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.contactButton}>
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#fafafa" },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "android" ? 8 : 10,
    paddingHorizontal: 20,
    backgroundColor: "#fafafa",
  },
  logoWrapper: { justifyContent: "center", alignItems: "center" },
  logo: { width: 105, height: 54 },
  contactButton: {
    backgroundColor: "#E21212",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 38,
  },
  contactText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
});
