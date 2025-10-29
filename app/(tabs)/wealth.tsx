import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AutoScrollView from "../../components/AutoScrollView";
import { useRouter } from "expo-router";

export default function Wealth() {
  const router = useRouter();

  
  // Kept your hero + 4 content blocks, adapted to the "sections" structure
  // Only content cards, hero image is now separate
  const sections = [
    {
      image: require("../../assets/wealth1.png"),
      text:
        "Wealth is more than numbers in a bank account. It is the freedom to choose our path, the security to protect what matters, and the power to create a lasting impact.",
    },
    {
      image: require("../../assets/wealth2.png"),
      text:
        "True wealth begins with discipline — living with intention, saving with wisdom, and investing with vision. It grows not only through income but also through knowledge, relationships, and the values we pass on to the next generation.",
    },
    {
      image: require("../../assets/wealth3.jpg"),
      text:
        "Our wealth is not just about what we accumulate, but about what we enable. With it, we gain the ability to support our families, nurture dreams, create opportunities, and contribute to causes that uplift society.",
    },
    {
      image: require("../../assets/wealth4.png"),
      text:
        "Wealth is not greed — it is growth. It is not selfishness—it is stewardship. When guided by purpose, wealth becomes a force for freedom, impact, and legacy. Our wealth is our power to live with dignity, give with generosity, and build a future that outlives us.",
    },
  ];

  return (
    <AutoScrollView style={styles.container} showsVerticalScrollIndicator={false}>
   
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Our Wealth</Text>
      </View>

         {/* Horizontal hero image section */}
      <View style={styles.heroImageWrap}>
        <Image
          source={require("../../assets/wealthhead.jpg")}
          style={styles.heroImage}
        />
      </View>

      {/* Sections (Income-style cards) */}
      {sections.map((section, index) => (
        <View
          key={index}
          style={[styles.sectionCard, index === sections.length - 1 && styles.lastSectionCard]}
        >
          <Image
            source={section.image}
            style={[styles.image, index === sections.length - 1 && styles.lastImage]}
          />
          {!!section.text && (
            <View style={styles.textBox}>
              <Text style={styles.text}>{section.text}</Text>
            </View>
          )}
        </View>
      ))}

      {/* View More Button (kept your original route) */}
      <View style={styles.viewMoreWrap}>
        <TouchableOpacity
          style={styles.viewMoreBtn}
          onPress={() => router.push("/(tabs)/family")}
        >
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Footer (unchanged content) */}
      <View style={styles.footer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png",
          }}
          style={styles.footerLogo}
        />
        <Text style={styles.footerTitle}></Text>
        <Text style={styles.footerSubtitle}>Independent for Entire Life</Text>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  // Carried over the Income layout look & feel
  container: { flex: 1, backgroundColor: "#fafafa" },

  header: {
    backgroundColor: "#0b3550",
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    padding: 25,
  },

  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingBottom: 16,
  
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
     
  
    borderWidth: 2,
   
      
  },

  image: {
    width: "95%",
    height: 450,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    
  },

  heroImageWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  heroImage: {
    width: "95%",
    height: 250,
    borderRadius: 28,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  lastSectionCard: {
    backgroundColor: "#f5f5f5",
  //  borderColor: "#0b3a55",
    borderWidth: 2,
   // shadowColor: "#0b3a55",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  lastImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
   
    width: "90%",
    height: 390,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },

  textBox: { padding: 16 },
  text: { fontSize: 15, lineHeight: 25, fontWeight: "600", justifyContent: "center", color: "#333" , textAlign:"justify" },

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

  footer: { alignItems: "center", paddingVertical: 30, backgroundColor: "#1f2937" },
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", marginTop: -10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});
