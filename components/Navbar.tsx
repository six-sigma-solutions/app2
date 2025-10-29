import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform, Modal, TouchableWithoutFeedback, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link , useRouter } from "expo-router";
import { signOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const BAR_HEIGHT = 65;       // fixed visual height for the row
const BUTTON_HEIGHT = 35;    // fixed button height (no vertical padding)

export default function Navbar() {
  const router = useRouter();
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  // compute a responsive logo width: between 90 and 160, relative to screen width
  const logoWidth = Math.max(90, Math.min(160, Math.floor(windowWidth * 0.28)));

  // prefer a local logo at assets/logo.png but fall back to the remote URL
  let logoSource: any = null;
  try {
     
    logoSource = require('../assets/DailyMoney.png');
  } catch (e) {
    logoSource = null;
  }

  async function onLogout() {
    try {
      await auth.signOut();
      router.replace('/signin');
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  return (
    // Only paint background behind the status bar, don’t add bottom insets
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Fixed-height row — looks identical on all devices */}
      <View style={styles.navbar}>
        {/* Left Logo */}
        <Link href="/home" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.logoWrapper}>
            <Image
              source={logoSource || {  }}
              resizeMode="contain"
              style={[styles.logo, { width: logoWidth }]}
            />
          </TouchableOpacity>
        </Link>

        {/* Right: hamburger menu */}
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMenuOpen((s) => !s)}
            style={[styles.hamburgerBtn, menuOpen ? styles.hamburgerBtnActive : null]}
            accessibilityLabel="Open menu"
          >
            <View style={styles.hamLine} />
            <View style={[styles.hamLine, { width: 18 }]} />
            <View style={[styles.hamLine, { width: 14 }]} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={styles.backdropFull} />
        </TouchableWithoutFeedback>

        <View style={styles.menuOverlayFull} accessible accessibilityRole="menu">
          <TouchableOpacity
            style={styles.menuItem}
            accessibilityRole="menuitem"
            accessibilityLabel="Contact"
            onPress={() => {
              setMenuOpen(false);
              router.push('/contact');
            }}
          >
            <Text style={styles.menuText}>📞 Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            accessibilityRole="menuitem"
            accessibilityLabel="Sign Out"
            onPress={async () => {
              setMenuOpen(false);
              setSigningOut(true);
              try {
                await onLogout();
              } catch (e) {
                try {
                  await signOut();
                  router.replace('/signin');
                } catch (er) {
                  console.error(er);
                }
              } finally {
                setSigningOut(false);
              }
            }}
          >
            <Text style={[styles.menuText, { color: '#E21212' }]}>🚪 Sign Out</Text>
          </TouchableOpacity>

          {signingOut && (
            <View style={styles.signingOutRow} pointerEvents="none">
              <Text style={styles.menuText}>Signing out…</Text>
            </View>
          )}
        </View>
      </Modal>
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
    backgroundColor: "#0F2330",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 20,
  },

  logoWrapper: { justifyContent: "center", alignItems: "flex-start", paddingLeft: 4 },
  logo: { width: 190, height: 80 },

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
  // hamburger button
  hamburgerBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerBtnActive: { backgroundColor: '#e9f2ff' },
  hamLine: { height: 2, width: 22, backgroundColor: '#0F2330', marginVertical: 2, borderRadius: 2 },

  // menu overlay
  menuOverlay: {
    position: 'absolute',
    right: 0,
    top: 52,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    minWidth: 140,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  menuItem: { paddingVertical: 10, paddingHorizontal: 14 },
  menuText: { fontSize: 15, color: '#0F2330', fontWeight: '600' },
  // backdrop covers the screen to detect outside taps and darken background
  backdrop: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)' },
  signingOutRow: { paddingHorizontal: 14, paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f1f3f5' },
  // Fullscreen backdrop used when menu is open — sits above other content
  backdropFull: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1000 },
  // Full menu overlay positioned near the top-right with high zIndex/elevation
  menuOverlayFull: {
    position: 'absolute',
    right: 12,
    top: 70,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    minWidth: 160,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 20,
    zIndex: 1001,
  },
});