import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const BAR_HEIGHT = 65;       // fixed visual height for the row
const BUTTON_HEIGHT = 35;    // fixed button height (no vertical padding)

export default function Navbar() {
  return (
    // Only paint background behind the status bar, don’t add bottom insets
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Fixed-height row — looks identical on all devices */}
      <View style={styles.navbar}>
        {/* Left Logo */}
        <Link href="/home" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.logoWrapper}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png" }}
              resizeMode="contain"
              style={styles.logo}
            />
          </TouchableOpacity>
        </Link>

        {/* Right Contact */}
        <Link href="/contact" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.contactButton}>
            <Text
              style={styles.contactText}
              allowFontScaling={false}        // lock text size so height doesn’t change
            >
              Contact
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Just background for the notch/status area
  safeArea: {
    backgroundColor: "#fafafa",
  },

  // Fixed-height horizontal bar; no vertical padding that can expand
  navbar: {
    height: BAR_HEIGHT,
    backgroundColor: "#1f2937",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  logoWrapper: { justifyContent: "center", alignItems: "center" },
  logo: { width: 105, height: 54 },

  // Fixed-height button; avoid paddingVertical so height is stable
  contactButton: {
    height: BUTTON_HEIGHT,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#E21212",
    justifyContent: "center",
    alignItems: "center",
    // prevent Android from inflating touchable due to font ascent/descents
    ...(Platform.OS === "android" ? { overflow: "hidden" } : null),
  },

  // Keep text from changing height across devices
  contactText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 18,           // lock line box
    textAlign: "center",
    // Android-only: removes extra top spacing in Text
    ...(Platform.OS === "android" ? { includeFontPadding: false, textAlignVertical: "center" as const } : null),
  },
});