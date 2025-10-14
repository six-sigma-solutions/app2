import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';


import { useRouter } from "expo-router";



export default function Family() {
   const router = useRouter();
  const steps = [
    {
      id: 1,
      img: require('@/assets/familyz.jpg'),
      quote:
        '“I have secured my family\'s health, education, and finances, ensuring long-term security, growth, and happiness for future generations.”',
    },
    {
      id: 2,
      img: require('@/assets/dddd.jpg'),
      quote:
        '“I’ve secured my family\'s well-being and plan to expand their opportunities, investing in their safety, education, and lifestyle.”',
    },
    {
      id: 3,
      img: require('@/assets/gggg.jpg'),
      quote:
        '“I\'ve secured my children\'s future with education, savings, and guidance, aiming for long-term financial freedom.”',
    },
    {
      id: 4,
      img: require('@/assets/nnn.jpg'),
      quote:
        '“I prioritize my family, ensuring their financial security and emotional support for the long term.”',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
           Our family
        </Text>
        <Text style={styles.subtitle}>
          True prosperity comes from both good health and financial security.
          With our transparent, collaborative approach, we bring your vision to
          life. Guided by our three-phase methodology, we consistently deliver
          value and adapt to change — building a better world:{' '}
          <Text style={styles.highlightText}>
            Healthier, Happier, and Wealthier
          </Text>
        </Text>
      </View>

      {/* Family Steps */}
      {steps.map((step) => (
        <View key={step.id} style={styles.step}>
          <Image source={step.img} style={styles.imageTop} />
          <View style={styles.textContainer}>
            <Text style={styles.quote}>{step.quote}</Text>
          </View>
        </View>
      ))}

      {/* Blog Section */}
      <View style={styles.blogSection}>
        <Text style={styles.blogTitle}>From the Blog</Text>
        <Text style={styles.blogSubtitle}>
          Insights and updates from our team
        </Text>
        <TouchableOpacity
          style={styles.readMoreBtn}
          onPress={() => router.push("/(tabs)/mylife/entrepreneur")}
        >
          <Text style={styles.readMoreText}>Read More →</Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 35,
    color: '#d40000',
    textAlign: 'center',
    padding: 20,
    fontWeight: '700',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#001f54',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  highlightText: {
    backgroundColor: '#d4edda',
    color: 'green',
    paddingHorizontal: 8,
    borderRadius: 6,
    fontWeight: 'bold',
  },

  // ✅ Vertical Step Layout
  step: {
    flexDirection: 'column', // image top, text below
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  imageTop: {
    width: '90%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },

  blogSection: {
    padding: 20,
    alignItems: 'center',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  blogSubtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  readMoreBtn: {
    backgroundColor: '#d40000',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
  },

  footer: { alignItems: "center", paddingVertical: 30 },
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#000", padding: 10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#b40000ff" },
});