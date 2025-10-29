import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import AutoScrollView from "../components/AutoScrollView";
import { useRouter } from "expo-router";

const Gratitude: React.FC = () => {
  const router = useRouter();

  // Animation for fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  return (
    <AutoScrollView style={styles.container}>
      <ImageBackground
        source={require("../assets/universe.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <Animated.View
          style={[
            styles.contentWrapper,
            { opacity: fadeAnim, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.card}>
            <Text style={styles.title}>
              THANKS TO{"\n"}THE UNIVERSE
            </Text>

            <View style={styles.textContainer}>
              <Text style={styles.paragraph}>
                Today, I express my gratitude to my parents, my ancestors, and to this Universe.
              </Text>

              <Text style={styles.paragraph}>
                From this moment, my family and I choose to give first priority to health and to live a joyful and prosperous life.
              </Text>

              <Text style={styles.paragraph}>
                I thank the Universe for blessing us with health, wealth, happiness, our children&apos;s future, abundance, opportunities to travel, and above all, virtue (good karma).
              </Text>

              <Text style={styles.paragraph}>
                Together with the millions of people around the world benefiting, from today we too begin our journey —
              </Text>

              <Text style={styles.highlight}>
                Guided by the wisdom, discipline and spirit of the world&apos;s greatest Legends.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/promise")}
            >
              <Text style={styles.buttonText}>NEED MORE</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ImageBackground>
    </AutoScrollView>
  );
};

export default Gratitude;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 204, 0, 0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    maxWidth: 900,
    width: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffcc00",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    marginBottom: 35,
  },
  paragraph: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  highlight: {
    color: "#ffcc00",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffcc00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: "#ffcc00",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    letterSpacing: 1,
  },
});