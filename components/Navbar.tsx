import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { signOut } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import DrawerMenu from "./DrawerMenu";

const BAR_HEIGHT = 65;
const BUTTON_HEIGHT = 35;

export default function Navbar() {
  const router = useRouter();
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const logoWidth = Math.max(120, Math.min(260, Math.floor(windowWidth * 0.40)));

  let logoSource: any = null;
  try {
    // ✅ Use static require — ensures image is bundled in release build
  logoSource = require("../assets/dailymoney.png");
  } catch (e) {
    console.warn("Logo not found, using fallback URI");
  logoSource = { uri: "https://yourcdn.com/dailymoney.png" }; // fallback URL
  }

  async function onLogout() {
    try {
      await auth.signOut();
      router.replace("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  console.log("✅ Navbar rendered");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.navbar}>
        {/* Left Hamburger */}
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

        {/* Right Logo */}
        <Link href="/home" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.logoWrapper}>
            <Image
              source={logoSource}
              resizeMode="contain"
              style={[styles.logo, { width: logoWidth, height: 75 }]}
            />
          </TouchableOpacity>
        </Link>
      </View>

      {/* DrawerMenu Modal */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        presentationStyle="overFullScreen"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={styles.backdropFull} />
        </TouchableWithoutFeedback>
        <View style={styles.menuOverlayFull}>
          <DrawerMenu
            onClose={() => setMenuOpen(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fafafa",
  },
  navbar: {
    height: BAR_HEIGHT,
    backgroundColor: "#0F2330",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 20,
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 4,
  },
  logo: {
    width: 460,
    height: 400,
    marginRight:-40,
  },
  hamburgerBtn: {
    width: 50,
    height: 47,
    borderRadius: 10,
    backgroundColor: "#f6f8fa",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  hamburgerBtnActive: { backgroundColor: "#e9f2ff" },
  hamLine: {
    height: 2,
    width: 22,
    backgroundColor: "#0F2330",
    marginVertical: 2,
    borderRadius: 2,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuText: {
    fontSize: 15,
    color: "#0F2330",
    fontWeight: "600",
  },
  signingOutRow: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f5",
  },
  backdropFull: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  menuOverlayFull: {
    position: "absolute",
    left: 12,
    top: 70,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    minWidth: 160,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 20,
    zIndex: 1001,
  },
});
