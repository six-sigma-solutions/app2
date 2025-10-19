import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AutoScrollView from '../../components/AutoScrollView';
import { useRouter } from "expo-router";

export default function Wealth() {
  const router = useRouter();

  const rows = [
    {
      id: 1,
      image: require("../../assets/wealth1.jpg"),
      text: "Wealth is more than numbers in a bank account. It is the freedom to choose our path, the security to protect what matters, and the power to create a lasting impact.",
      backgroundColor: "#2b9348",
    },
    {
      id: 2,
      image: require("../../assets/wealth2.jpg"),
      text: "True wealth begins with discipline — living with intention, saving with wisdom, and investing with vision. It grows not only through money but also through knowledge, relationships, and the values we pass on to the next generation.",
      backgroundColor: "#382813",
    },
    {
      id: 3,
      image: require("../../assets/wealth3.jpg"),
      text: "Our wealth is not just about what we accumulate, but about what we enable. With wealth, we gain the ability to support our families, nurture dreams, create opportunities, and contribute to causes that uplift society.",
      backgroundColor: "#910000",
    },
    {
      id: 4,
      image: require("../../assets/wealth4.jpg"),
      text: "Wealth is not greed—it is growth. It is not selfishness—it is stewardship. When guided by purpose, wealth becomes a force for freedom, for impact, and for legacy. Our wealth is our power to live with dignity, give with generosity, and build a future that outlives us.",
      backgroundColor: "#ff9100",
    },
  ];

  return (
    <AutoScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Our Wealth</Text>

      {/* Hero Image */}
      <View style={styles.hero}>
        <Image
          source={require("../../assets/wealthhead.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Rows: Image on top, text below */}
      {rows.map((row) => (
        <View
          key={row.id}
          style={[styles.row, { backgroundColor: row.backgroundColor }]}
        >
          <Image source={row.image} style={styles.rowImage} />
          <View style={styles.rowTextBox}>
            <Text style={styles.rowText}>{row.text}</Text>
          </View>
        </View>
      ))}

      {/* View More Button */}
      <TouchableOpacity
        style={styles.viewMoreBtn}
        onPress={() => router.push("/(tabs)/family")}
      >
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png",
          }}
          style={styles.footerLogo}
        />
        <Text style={styles.footerTitle}>DAILY MONEY</Text>
        <Text style={styles.footerSubtitle}>Independent for Entire Life</Text>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f5f2", paddingVertical: 20 },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    padding: 20,
    marginBottom: 20,
    color: "#0b3550",
  },
  hero: { alignItems: "center", marginBottom: 20, paddingHorizontal: 20 },
  heroImage: { width: "100%", height: 200, borderRadius: 20, marginBottom: 10 },

  row: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  rowImage: { width: "100%", height: 430, borderRadius: 20, marginBottom: 15 },
  rowTextBox: { paddingHorizontal: 10 },
  rowText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  viewMoreBtn: {
    backgroundColor: "#d32a2a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    marginVertical: 20,
  },
  viewMoreText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", padding: 10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});
