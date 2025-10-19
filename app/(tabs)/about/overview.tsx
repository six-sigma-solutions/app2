import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import AutoScrollView from '../../../components/AutoScrollView';
import { useRouter } from "expo-router";

export default function Overview() {
  const router = useRouter();

  const animValues = useRef([...Array(4)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animValues.forEach((val, idx) => {
      Animated.timing(val, {
        toValue: 1,
        duration: 800,
        delay: idx * 300,
        useNativeDriver: true,
      }).start();
    });
  }, [animValues]);

  const sections = [
    {
      title: "Our Purpose",
      color: "#f30000ff",
      text: "Daily Money exists to make the world healthier, happier, wealthier — one person, one family, and one community at a time.",
      img: require("../../../assets/over1.jpg"),
    },
    {
      title: "Our Approach",
      color: "#0035c7ff",
      text: "Clarity – Simplifying money so everyone can understand it.\nDiscipline – Encouraging consistent daily habits that build lasting wealth.\nIntegration – Connecting health, wealth, and peace as part of the same journey.\nGenerational Growth – Ensuring prosperity passes forward, sustaining families across generations.",
      img: require("../../../assets/over2.jpg"),
    },
    {
      title: "Our Core Beliefs",
      color: "#e70074ff",
      text: "Wealth is Freedom – The ability to choose your path without limits.\nHealth is Wealth – Without wellness, money loses its meaning.\nPeace is Success – A balanced life is the ultimate achievement.\nLegacy Matters – True prosperity is measured in impact that outlives us.",
      img: require("../../../assets/image-3.jpg"),
    },
    {
      title: "Our Promise",
      color: "#c29503ff",
      text: "Daily Money is not just about income today, but about wealth for life and beyond. We help build strong foundations so every generation thrives — financially, physically, and spiritually.",
      img: require("../../../assets/image-4.jpg"),
    },
  ];

  return (
    <AutoScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Overview</Text>
      </View>

      {sections.map((section, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            {
              opacity: animValues[index],
              transform: [
                {
                  translateY: animValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={[styles.title, { color: section.color }]}>{section.title}</Text>
          <Text style={styles.text}>{section.text}</Text>
          <Image source={section.img} style={styles.image} resizeMode="cover" />
        </Animated.View>
      ))}

      <View style={styles.buttonWrap}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/about/founders")}
        >
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>
      </View>

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
  container: { flex: 1, backgroundColor: "#fafafa" },

  header: { marginVertical: 20, paddingHorizontal: 20 },
  headerText: { fontSize: 26, fontWeight: "700", textAlign: "center", color: "forestgreen" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  title: { fontSize: 20, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  text: { fontSize: 15, lineHeight: 22, textAlign: "center", color: "#0f172a", marginBottom: 12 },

  image: { width: "100%", height: 210, borderRadius: 10 },

  buttonWrap: { alignItems: "center", marginVertical: 30 },
  button: { backgroundColor: "#4caf50", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

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