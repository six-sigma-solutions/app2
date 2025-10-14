import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

export default function Students() {
  const router = useRouter();

  // Animation refs for sections
  const animValues = useRef(
    [...Array(4)].map(() => new Animated.Value(0))
  ).current;

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
      img: require("../../../assets/ssss.jpg"),
      text: `Our future starts with today's discipline. 
We help turn student loans into student gains.
Your degree gets you a job; your DailyMoney skills get you freedom.
Build wealth while you learn. Don't just chase grades, chase growth.`,
    },
    {
      img: require("../../../assets/student555.jpg"),
      text: `Learn to earn while you still have time.
Our side hustle is your main opportunity.
Financial confidence is the best graduation gift.
DailyMoney provides a business blueprint for students.
We train you for real-world success.`,
    },
    {
      img: require("../../../assets/stu3.jpg"),
      text: `Achieve personal growth and financial freedom.
Pay off student debt through your own earned income.
Financial independence brings confidence and self-respect.`,
    },
    {
      img: require("../../../assets/stu4.jpg"),
      text: `DailyMoney empowered to learn, inspired to earn.
Earn with pride, learn with purpose.
Students earn, and the world learns the value of determination.
Self-earned income builds more than wealth, it builds wisdom.`,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily Money – Empower Students</Text>
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
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* ✅ Apply same wrapper style for every image */}
          <View style={styles.imageWrapper}>
            <Image
              source={section.img}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>

          <Text style={styles.text}>{section.text}</Text>
        </Animated.View>
      ))}

      <View style={styles.viewMoreWrap}>
        <TouchableOpacity
          style={styles.viewMoreBtn}
          onPress={() => router.push("/(tabs)/mylife/elder")}
        >
          <Text style={styles.viewMoreText}>View More</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },

  header: { marginVertical: 20, paddingHorizontal: 20 },
  headerText: {
    fontSize: 26,
    padding: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "darkgreen",
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
  imageWrapper: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden", // ✅ ensures all images clip properly
    backgroundColor: "#fff", // optional - prevents transparency edges
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 600,
    borderRadius: 15,
    marginBottom: 12,
    
  },

  text: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: "#0f172a",
  },

  viewMoreWrap: { alignItems: "center", marginVertical: 30 },
  viewMoreBtn: {
    backgroundColor: "#0b3a55",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  viewMoreText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  footer: { alignItems: "center", paddingVertical: 30 },
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#000" },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#b40000ff" },
});
