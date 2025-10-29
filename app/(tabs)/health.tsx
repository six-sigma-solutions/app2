/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AutoScrollView from '../../components/AutoScrollView';
import { useRouter } from "expo-router";

export default function Health() {
  const router = useRouter();
 
  return (
    <AutoScrollView style={styles.container}>
      {/* === PAGE TITLE === */}
      <Text style={styles.heading}>Our Health</Text>

      {/* === HERO SECTION === */}
      <View style={styles.hero}>
        

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            <Text style={styles.colorHealthy}>Live Healthy, </Text>
            <Text style={styles.colorHappy}>Live Happy, </Text>
            <Text style={styles.colorWealthy}>Live Wealthy</Text>
          </Text>
          </View>
          <View style={styles.heroImageContainer}>
          <Image
            source={require("../../assets/healthhead.jpg")}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroText}>
            Your journey to wellness and financial freedom starts here.
    
            Our health is our true wealth — it gives us energy, focus, and freedom to live fully. Every choice - what we eat, how we move, how we rest shapes our future. When we care for our health, we care for our dreams, our families, and our world. Strong bodies. Clear minds. Happy hearts. Together, we build a healthier tomorrow - Our health, our strength, our future.
          </Text>
        </View>
      </View>

      {/* === QUOTE HEADER === */}
      <Text style={styles.sectionHeader}>
        My health is my greatest wealth. 😊
      </Text>

      {/* === HEALTH CARDS === */}
      <View style={styles.subImageContainer}>
        {[
          {
            img: require("../../assets/health1.jpg"),
            color: "#27b4f0ff",
            quotes: [
              "Health and fitness are not temporary — they are my lifetime goal.",
              "Health is not a destination — it’s a lifelong evolution.",
              "Fitness is the art I practice for life.",
            ],
          },
          {
            img: require("../../assets/health2.jpg"),
            color: "#b11597",
            quotes: [
              "I am committed to wellness for life.",
              "Wellness is not a season — it’s my soul’s commitment.",
              "Wellness isn’t a goal — it’s my lifestyle.",
            ],
          },
          {
            img: require("../../assets/health3.jpg"),
            color: "#34004d",
            quotes: [
              "I need lifelong health and fitness.",
              "I’m powered by purpose — strong for life.",
              "Wellness is my lifetime mission.",
            ],
          },
          {
            img: require("../../assets/health4.jpg"),
            color: "#002770",
            quotes: [
              "I want to be fit, strong, and energetic for my entire life.",
              "Forever active, forever alive, forever me.",
              "I live strong. I stay fit. I grow limitless.",
            ],
          },
        ].map((item, index) => (
          <View key={index} style={styles.cardBlock}>
            <Image source={item.img} style={styles.cardImage} />
            <View style={[styles.cardBox, { backgroundColor: item.color }]}>
              {item.quotes.map((q, i) => (
                <Text key={i} style={styles.cardText}>
                  “{q}”
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* === FOOTER QUOTES === */}
      <View style={styles.footerCard}>
        <View style={styles.footer}>
          <Text style={styles.footerQuoteEnglish}>
            "No need for medicine if you allow proper digestion between meals."
          </Text>
          <Text style={styles.footerQuoteTamil}>
            “மருந்தென வேண்டாவாம் யாக்கைக்கு அருந்தியது”
          </Text>
          <Text style={styles.footerQuoteTamilsecond}>அற்றது போற்றி உணின்.”</Text>
          <Text style={styles.footerQuoteTamilsecondtitle}>- திருக்குறள்</Text>

          <Text style={styles.footerQuoteTamilsecond3}>
           முன் உண்டது செரித்ததைத் தெளிவாக அறிந்து, அதன் பின்னரே உண்பானால், அவனுடைய உடலுக்கு ‘மருந்து’ வேண்டாம்.
          </Text>

          <Text style={styles.footerQuoteTamilsecond4}>
            “தண்ணீரைச் சாப்பிடு, உணவை அருந்து”
            உண்மையான ஆரோக்கிய வாழ்க்கையின் ரகசியம்.
          </Text>

          <Text style={styles.footerQuoteEnglish}>
            💧 “Eat your water. Sip your meals. The secret of true healthy life.”
          </Text>
        </View>
      </View>

      {/* === LEARN MORE BUTTON === */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.push("/(tabs)/wealth")}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>Learn More</Text>
      </TouchableOpacity>

      {/* === FINAL FOOTER === */}
      <View style={styles.footer2}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png",
          }}
          style={styles.footerLogo2}
        />
        <Text style={styles.footerTitle2}></Text>
        <Text style={styles.footerSubtitle2}>
          Independent for Entire Life
        </Text>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 20 },

  heading: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: "#002770",
    marginVertical: 20,
  },

  hero: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  heroImageContainer: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },

  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },

  heroContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    marginBottom: 10,
    textAlign: "center",
  },

  colorHealthy: { color: "#d32a2a" },
  colorHappy: { color: "#084700" },
  colorWealthy: { color: "#002770" },

  heroText: {
    fontSize: 17,
    fontWeight: "700",
    marginVertical: 15,
    color: "#333",
    justifyContent: "center",
    textAlign: "justify",
    lineHeight: 25,
  },

  sectionHeader: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 40,
    color: "#c00606",
  },

  subImageContainer: { paddingHorizontal: 20, marginBottom: 20 },
  cardBlock: {
  marginBottom: 40,
  borderRadius: 20,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 4,
},
  cardImage: {
  width: "100%",
  height: 500, // or 550 for extra coverage
  borderRadius: 20,
  marginBottom: 15,
  resizeMode: "cover",
},

  cardBox: {
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  cardText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
    lineHeight: 25,
    minHeight:60,
  },

  footerCard: { paddingHorizontal: 20, marginTop: 40 },
  footer: {
    backgroundColor: "#000",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  footerQuoteEnglish: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },

  footerQuoteTamil: {
    color: "#fffb2c",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
  },

  footerQuoteTamilsecond: {
    color: "#fffb2c",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
  },

  footerQuoteTamilsecondtitle: {
    color: "#fffb2c",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    marginVertical: 5,
  },

  footerQuoteTamilsecond3: {
    color: "#fffb2c",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  footerQuoteTamilsecond4: {
    color: "#fffb2c",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  btnPrimary: {
    backgroundColor: "#0f766e",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 30,
    alignSelf: "center",
  },

  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer2: { alignItems: "center", paddingVertical: 30,backgroundColor:'#1f2937' },
  footerLogo2: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle2: { fontSize: 20,marginTop:-10, fontWeight: "700", color: "#fffb2c" },
  footerSubtitle2: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});
