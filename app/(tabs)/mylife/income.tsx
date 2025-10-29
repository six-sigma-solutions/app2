import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AutoScrollView from "../../../components/AutoScrollView";
import { useRouter } from "expo-router";

export default function Income() {
  const router = useRouter();

  const sections = [
    {
      image: require("../../../assets/income-11.png"),
      text: "Income is more than just money earned — it is the reward for effort, time, and value created. Whether through wages, salaries, profits, or investments, income provides the foundation for stability and growth.",
    },
    {
      image: require("../../../assets/income-12.jpg"),
      text: "True income, however, is not just financial. It is about the returns you gain from life itself — the knowledge you acquire, the relationships you nurture, and the health you maintain.",
    },
    {
      image: require("../../../assets/incomeimg-33.jpg"),
      text: "Secure your family's future. Build lasting wealth and assets. Create the freedom to travel, explore, and experience life. Live with peace of mind and purpose.",
    },
    {
      image: require("../../../assets/income4.png"),
      text: "Income powers growth, not greed. Energy creates opportunity. Wealth begins with wisdom. Freedom follows discipline. Balance builds true success.",
    },
  ];

  return (
    <AutoScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Income: The Fuel of Growth</Text>
      </View>

      {/* Sections */}
      {sections.map((section, index) => (
        <View
          key={index}
          style={[styles.sectionCard, index === sections.length - 1 && styles.lastSectionCard]}
        >
          <Image
            source={section.image}
            style={[styles.image, index === sections.length - 1 && styles.lastImage]}
          />
          <View style={styles.textBox}>
            <Text style={styles.text}>{section.text}</Text>
          </View>
        </View>
      ))}

      {/* View More Button */}
      <View style={styles.viewMoreWrap}>
        <TouchableOpacity
          style={styles.viewMoreBtn}
          onPress={() => router.push("/(tabs)/mylife/womenempowerment")}
        >
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png" }}
          style={styles.footerLogo}
        />
        <Text style={styles.footerTitle}></Text>
        <Text style={styles.footerSubtitle}>Independent for Entire Life</Text>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  lastSectionCard: {
    backgroundColor: '#f5f5f5',
    borderColor: '#0b3a55',
    borderWidth: 2,
    shadowColor: '#0b3a55',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  lastImage: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 2,
    borderColor: '#0b3a55',
    width: '90%',
    height: 400,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  container: { flex: 1, backgroundColor: "#fafafa" },

  header: { backgroundColor: "forestgreen", paddingVertical: 20, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 26, fontWeight: "700", textAlign: "center" , padding:25 },

  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 450,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
  },

  textBox: { padding: 16 },
  text: { fontSize: 15, lineHeight: 25, textAlign: "justify",fontWeight: "500", color: "#333" },

  viewMoreWrap: { alignItems: "center", marginVertical: 30 },
  viewMoreBtn: {
    backgroundColor: "#0b3a55",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  viewMoreText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", marginTop: -10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});