import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AutoScrollView from '../../components/AutoScrollView';


import { useRouter } from "expo-router";



export default function Family() {
   const router = useRouter();
  const steps = [
    {
      id: 1,
      img: require('../../assets/family1.png'),
      quote:
        '“ I have secured my family\'s health, education, and finances, and aim to ensure long - term security, growth, and happiness for future generations.”',
    },
    {
      id: 2,
      img: require('../../assets/family2.png'),
      quote:
        '“I’ve secured my family\'s well-being and plan to expand their opportunities, investing in their safety, education, and lifestyle.”',
    },
    {
      id: 3,
      img: require('../../assets/family3.png'),
      quote:
        '“I\'ve secured my children\'s future through education, savings, and guidance, aiming for long-term financial freedom.”',
    },
    {
      id: 4,
      img: require('../../assets/family4.png'),
      quote:
        '“I prioritize my family, ensuring their financial security and providing emotional support even after me.”',
    },
  ];

  return (
    <AutoScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
           Our family
        </Text>
        <Text style={styles.subtitle}>
          True prosperity comes from both good health and financial security. 
          With our transparent, collaborative approach, we bring your vision to life. 
          Guided by our three-phase methodology, we consistently deliver value and 
          adapt to change — building the best world:
        </Text>
        {/* Separate line for highlight text */}
        <View style={{ marginTop: 8 }}>
          <Text style={styles.highlightText}>Healthier, Happier, and Wealthier</Text>
        </View>
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
    lineHeight: 25, 
    fontWeight: "600", 
    justifyContent: "center",
    color: '#001f54',
    textAlign: 'justify',

  },
  highlightText: {
    backgroundColor: '#d4edda',
    color: 'green',
    paddingHorizontal: 8,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  highlightColumn: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    height: 240,
    borderRadius: 15,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '95%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
    fontWeight: "500", 
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

 
  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", marginTop:-10, color: "#fffb2c" },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});