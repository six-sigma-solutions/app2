import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import AutoScrollView from "../../../components/AutoScrollView";
import { useRouter } from "expo-router";

export default function Elder() {
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
      img: require("../../../assets/ef1.jpg"),
      text: `DM represents a rebirth, a movement where elders earn daily, share wisdom, and feel valuable again.
Live with financial confidence. Feel valued and included. Share your wisdom, not your worries.
Enjoy peace, purpose, and pride in your DM life.`,
    },
    {
      img: require("../../../assets/elder2.jpg"),
      text: `Empowerment begins with a choice. Choose to live with abundance, not dependence.
Your experience is your greatest asset and we help you turn it into income.
Invest in your health, reclaim your wealth, and cherish your family. That's the DM way.`,
    },
    {
      img: require("../../../assets/elder3.jpg"),
      text: `Retirement means living life on your own schedule and enjoying inner peace.
It’s not the end of possibilities; it’s the start of living life on your own terms.
That’s the DM way: freedom with purpose and dignity at every stage of life.`,
    },
    {
      img: require("../../../assets/elder4.jpg"),
      text: `When elders thrive, families become stronger. When their voices are valued, communities become wiser.
Living freely and confidently makes society richer in humanity, not just wealth.
The DM way lets every generation learn, earn, and live with purpose.`,
    },
  ];

  return (
    <AutoScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DM – Empower Elders</Text>
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
          <Image source={section.img} style={styles.image} resizeMode="stretch" />
          <Text style={styles.text}>{section.text}</Text>
        </Animated.View>
      ))}

      <View style={styles.viewMoreWrap}>
        <TouchableOpacity
          style={styles.viewMoreBtn}
          onPress={() => router.push("/(tabs)/about/overview")}
        >
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png",
          }}
          resizeMode="cover"
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
  headerText: {
    fontSize: 26,
    padding:20,
    fontWeight: "700",
    textAlign: "center",
    color: "forestgreen",
  },

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

  image: {
    width: "100%",
    height: 420,
    borderRadius: 15,
    marginBottom: 12,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#0f172a",
    fontWeight: "600",
  },

  viewMoreWrap: { alignItems: "center", marginVertical: 30 },
  viewMoreBtn: {
    backgroundColor: "#1a3ef5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  viewMoreText: { color: "#fff", fontSize: 16, fontWeight: "600" },

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