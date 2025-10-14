import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router'; // Or use react-navigation

const images = [

    require("../assets/health-mob.png"),
    require("../assets/solution-img-4.png"),
    require("../assets/solution-img-3.png"),
    require("../assets/solution-modified2.jpg"),
];



export default function Solution() {
  const router = useRouter(); // navigation hook

  const handleCtaClick = () => {
    router.push('/gratitude'); // Navigate to Gratitude page
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Image Cards */}
      {images.map((img, index) => (
        <View key={index} style={styles.imageCard}>
          <Image source={img} style={styles.cardImage} resizeMode='stretch' />
        </View>
      ))}

      {/* CTA Button */}
      <TouchableOpacity style={styles.ctaButton} onPress={handleCtaClick}>
        <Text style={styles.ctaButtonText}>Click to Transform Your Life</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9fafb', paddingLeft:10 , paddingRight:10},
  content: { alignItems: 'center',  },

  /* Image Card */
  imageCard: { width: '100%', marginVertical: 30 },
  cardImage: {
    width: '99%',
    height: 500,
    borderRadius: 10,
  },

  /* CTA Button */
  ctaButton: {
    backgroundColor: '#ffcc00',
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