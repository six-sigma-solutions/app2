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
      text: "DM exists to make the world healthier, happier, wealthier - one person, one family, and one community at a time.",
      img: require("../../../assets/over1.jpg"),
    },
    {
      title: "Our Approach",
      color: "#0035c7ff",
      text: "Clarity – Simplifying finance so everyone feels confident.\nDiscipline – Encouraging consistent daily habits that build lasting wealth.\nIntegration – Connecting health, wealth, and peace as part of the same journey.\nGenerational Growth – Ensuring prosperity passes forward, sustaining families across generations.",
      img: require("../../../assets/over2.jpg"),
    },
    {
      title: "Our Core Beliefs",
      color: "#e70074ff",
      text: "Health is Wealth – Without wellness, income loses its meaning.\nWealth is Freedom – The ability to choose your path without limits.\nLegacy Matters – True prosperity is measured in impact that outlives us.",
      img: require("../../../assets/image-3.jpg"),
    },
    {
      title: "Our Promise",
      color: "#c29503ff",
      text: "DM stands for more than health, it represents lifelong prosperity. We help create strong foundations for generations to flourish — in wealth, wellness, and spirit.",
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
  text: { fontSize: 15, lineHeight: 25, textAlign: "justify", color: "#0f172a", marginBottom: 15, fontWeight: "500" },

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
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", marginTop:-10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});