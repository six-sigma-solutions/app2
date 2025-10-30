import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from "react-native";
import AutoScrollView from '../../../components/AutoScrollView';
import { useRouter } from "expo-router";

interface VisionSection {
  img: ImageSourcePropType;
  points: string[];
}

const Visionmission: React.FC = () => {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 520,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  const sections: VisionSection[] = [
    {
      img: require("../../../assets/vision11.jpg"),
      points: [
        "Transforming the way the world lives — healthier in body, happier in heart, and richer in spirit.",
        "To inspire a world where well-being, joy, and prosperity thrive together.",
      ],
    },
    {
      img: require("../../../assets/vision2.png"),
      points: [
        "To nurture global wellness and wealth through mindful living and empowered growth.",
        "To harmonize body, mind, and prosperity through conscious, nature-powered living.",
      ],
    },
    {
      img: require("../../../assets/vision3.jpeg"),
      points: [
        "A world of harmony — where health, happiness, and wealth coexist in balance.",
        "To redefine success by aligning well-being, joy, happiness, and financial growth.",
      ],
    },
    {
      img: require("../../../assets/vision4.jpg"),
      points: [
        "To create a global movement that connects well-being with wealth-building for a better tomorrow.",
        "Empower every individual to live healthier, happier, and more abundant lives through balance and purpose.",
      ],
    },
  ];

  const galleryImages: ImageSourcePropType[] = [
    require("../../../assets/test1a.jpg"),
    require("../../../assets/test22.jpg"),
    require("../../../assets/test3.jpg"),
    require("../../../assets/test4.jpg"),
  ];

  // arrow animations per gallery item (avoid calling hooks inside map)
  const arrowAnims = useRef(galleryImages.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    arrowAnims.forEach((anim) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 15, duration: 800, useNativeDriver: true }),
          Animated.timing(anim, { toValue: -15, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    });
  }, [arrowAnims]);

  return (
    <AutoScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>DM Vision & Mission</Text>

      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Image
          source={require("../../../assets/vision1.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <Animated.View
          style={[
            styles.heroOverlay,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          <Text style={styles.heroHeading}>
            Improving the world&apos;s health, happiness, and prosperity{"\n"}deliver
            with precision.
          </Text>
          <Text style={styles.heroParagraph}>
            A brighter world — healthy in spirit, joyful in living, and abundant
            in growth.{"\n"}Living in flow with nature — where wellness
            nourishes wealth and joy sustains growth.{"\n"}Building a future
            where vitality, happiness, and financial independance flow as one.{"\n"}
            To enrich every life with balance, energy, and prosperity.
          </Text>
        </Animated.View>
      </View>

      {/* Vision Sections - Image Top, Text Bottom */}
      {sections.map((section, index) => (
        <View key={index} style={styles.visionBlock}>
          {/* Image on Top */}
          <Image source={section.img} style={styles.sectionImage} />

          {/* Text Below */}
          <View style={styles.visionText}>
            {section.points.map((point, i) => (
              <View key={i} style={styles.visionPoint}>
                <Text style={styles.tick}>✔</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* 4-Image Gallery */}
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Core Values</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryContainer}
        >
          {galleryImages.map((img, idx) => (
            <View key={idx} style={styles.galleryItem}>
              <Image source={img} style={styles.galleryImage} resizeMode="cover" />
              <Animated.Text
                style={[
                  styles.arrow,
                  {
                    transform: [{ translateX: arrowAnims[idx] }],
                  },
                ]}
              >
                →
              </Animated.Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/solution")}
        >
          <Text style={styles.actionText}>Solution</Text>
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
};

export default Visionmission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    padding: 20,
    fontWeight: "900",
    color: "#f10a0a",
    marginVertical: 20,
  },
  heroCard: {
    position: "relative",
    marginHorizontal: 10,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  heroImage: {
    width: "100%",
    height: 450,
    opacity: 0.7,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  heroHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  heroParagraph: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 22,
  },
  visionBlock: {
    marginVertical: 30,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  sectionImage: {
    width: "95%",
    height: 184,
    borderRadius: 16,
    marginBottom: 15,
  },
  visionText: {
    width: "98%",
  },
  visionPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tick: {
    color: "red",
    fontSize: 16,
    marginRight: 6,
  },
  pointText: {
    flex: 1,
    fontWeight: "700",
    fontSize: 14,
    color: "#111",
    lineHeight: 22,
    textAlign: "justify",
  },
  gallerySection: {
    alignItems: "center",
    paddingVertical: 30,
  },

  galleryItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  arrow: {
    fontSize: 60,
    color: "#0cf938ff",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  galleryTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f10a0a",
    marginBottom: 20,
  },
  galleryContainer: {
    flexDirection: "row",
    gap: 15,
    paddingLeft: 75,
    paddingRight: 75,
    paddingHorizontal: 10,
  },
  galleryImage: {
    width: 250,
    height: 350,
    borderRadius: 16,
    padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 12,
  },
  buttonSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  actionButton: {
    backgroundColor: "#f10a0a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#f10a0a",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },


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
