import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const Mypromises = () => {
  const router = useRouter();

  const handleGetMove = () => {
    // Open external Herbalife link
    const url = "https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/";
    router.push({ pathname: url }); // works for internal routes
    // OR if you want to open in browser:
    // Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        {/* Image */}
        <Image
          source={require("../assets/rrr.jpg")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleGetMove}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>

    
    </ScrollView>
  );
};

export default Mypromises;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2cd915ff',
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 260,
  },
  button: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "#ffcc00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

});