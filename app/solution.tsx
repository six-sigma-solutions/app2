import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import AutoScrollView from '../components/AutoScrollView';
import { useRouter } from 'expo-router'; // Or use react-navigation

const images = [

    require("../assets/solution1.png"),
    require("../assets/solution2.png"),
    require("../assets/solution3.png"),

    
    require("../assets/solution-modified2.jpg"),
];



export default function Solution() {
  const router = useRouter(); // navigation hook

  const handleCtaClick = () => {
    router.push('/gratitude'); // Navigate to Gratitude page
  };

  return (
    <AutoScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Image Cards */}
      {images.map((img, index) => (
        <View key={index} style={styles.imageCard}>
          <Image
            source={img}
            style={
              index === 0
                ? [styles.cardImage, styles.cardImageSolution1]
                : index === 3
                ? [styles.cardImageModified]
                : styles.cardImage
            }
            resizeMode='stretch'
          />
        </View>
      ))}

      {/* CTA Button */}
      <TouchableOpacity style={styles.ctaButton} onPress={handleCtaClick}>
        <Text style={styles.ctaButtonText}>Click to Transform Your Life</Text>
      </TouchableOpacity>

    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9fafb', paddingLeft:10 , paddingRight:10},
  content: { alignItems: 'center',  },

  /* Image Card */
  imageCard: { width: '100%', marginVertical: 30 },
  cardImage: {
    width: '98%',
    height: 260,
    borderRadius: 10,
  },
  cardImageSolution1: {
    height: 200,
  },
  cardImageModified: {
    width: '100%',
    height: 400,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#0f766e',
    alignSelf: 'center',
  },

  /* CTA Button */
  ctaButton: {
    backgroundColor: '#ffcc00',
    marginBottom:70,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginVertical: 20,
    shadowColor: '#ffcc00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
});