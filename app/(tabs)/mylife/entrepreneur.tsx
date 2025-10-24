/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AutoScrollView from "../../../components/AutoScrollView";

export default function Entrepreneur() {
  const router = useRouter();

  return (
    <AutoScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Empowering You to Lead, Build, and Grow</Text>
        <Image
          source={require("../../../assets/entphead1.png")}
          style={styles.heroImage}
        />
      </View>

      {/* Rows - Image on top, text below */}
      {[
        {
          image: require("../../../assets/entp1.jpg"),
          text: `"I want to be my own boss."
"Freedom is my first goal, purpose is my next."
"Self-leadership is my success story."
"I want to build a life that reflects my values."`,
          bgColor: "#252525ff",
          textColor: "#fff",
        },
        {
          image: require("../../../assets/entp2.jpg"),
          text: `"I'm ready to start, build, and grow something of my own."
"I’m ready to take my first step toward independence."
"I’m ready to shape my own success."`,
          bgColor: "#b9b9b2ff",
          textColor: "#000",
        },
        {
          image: require("../../../assets/entp3.jpg"),
          text: `"Entrepreneurship is for freedom and financial independence."
"I choose independence over comfort."
"I’m ready to create my own future."
"I’m ready to launch my own vision."`,
          bgColor: "#a33b11ff",
          textColor: "#fff",
        },
        {
          image: require("../../../assets/entp4.jpg"),
          text: `"I'm looking for entrepreneurship to create opportunities."
"I’m drawn to entrepreneurship to make opportunities."
"I choose entrepreneurship to shape opportunities."`,
          bgColor: "#b3ece8c4",
          textColor: "#000",
        },
        {
          image: require("../../../assets/entp5.jpg"),
          text: `"Yes, I believe in building dreams into reality."
"I believe in making dreams come true through action."
"I’m committed to turning vision into reality."
"I believe that dreams are meant to be built, not just imagined."`,
          bgColor: "#34657cff",
          textColor: "#fff",
        },
        {
          image: require("../../../assets/entp6.jpg"),
          text: `"I want to lead instead of follow."
"I choose to lead rather than follow."
"I aim to set the direction, not just follow it."
"Leadership is my choice, not conformity."`,
          bgColor: "#3c3d2dff",
          textColor: "#ffffffff",
        },
        {
          image: require("../../../assets/entp7.jpg"),
          text: `"I am ready to take a risk for success."
"I’m willing to take chances for success."
"I’m ready to embrace challenges."
"I’m not afraid to take bold steps toward my goals."`,
          bgColor: "#dbf79cff",
          textColor: "#000000ff",
        },
        {
          image: require("../../../assets/entp8.jpg"),
          text: `"I have dreams of financial support and impact."
"I dream of creating wealth and making a difference."
"My goal is to build financial support and inspire change."
"My vision combines financial success with social impact."`,
          bgColor: "#dfdfdfff",
          textColor: "#000",
        },
      ].map((row, index) => (
        <View key={index} style={[styles.row, { backgroundColor: row.bgColor }]}>
          <Image source={row.image} style={styles.image} />
          <View style={styles.textBox}>
            <Text style={[styles.quote, { color: row.textColor }]}>{row.text}</Text>
          </View>
        </View>
      ))}

      {/* View More Button */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.push("/(tabs)/mylife/income")}
      >
        <Text style={styles.btnText}>Learn More</Text>
      </TouchableOpacity>

      {/* Footer */}
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
  container: { flex: 1, backgroundColor: "#fff" },

  heroSection: {
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "rebeccapurple",
    textAlign: "center",
    padding: 20,
    marginBottom: 12,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "green",
    resizeMode: "cover",
  },

  row: {
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 14,
  },

  image: {
    width: "95%",
    height: 350,
    borderRadius: 14,
    resizeMode: "cover",
    marginBottom: 12,
  },

  textBox: {
    width: "100%",
    paddingHorizontal: 12,
  },

  quote: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  btnPrimary: {
    backgroundColor: "#0f766e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    margin: 20,
  },
  btnText: {
    
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    
  },

 
  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, marginTop: -10, fontWeight: "700", color: "#fffb2c" },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});