import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AutoScrollView from '../../../components/AutoScrollView';
import { Link } from 'expo-router'; // Or use react-navigation if needed

const president = {
  name: "XXXXXX",
  role: "President",
  image: { uri: "https://via.placeholder.com/150/0d9488/ffffff?text=President" },
};

export default function PresidentMsg() {
  return (
    <AutoScrollView style={styles.container}>
      {/* President Page Section */}
      <View style={styles.presidentPageSection}>
        <View style={styles.presidentMessageCard}>
          
          {/* Header */}
          <View style={styles.cardHeaderBg}>
            <Text style={styles.headerTitle}>President&apos;s Message</Text>
            <Text style={styles.headerSubtitle}>Leading with Vision and Commitment</Text>
          </View>

          {/* President Profile */}
          <View style={styles.presidentProfileArea}>
            <Image source={president.image} style={styles.presidentImage} />
            <Text style={styles.presidentName}>{president.name}</Text>
            <Text style={styles.presidentRole}>{president.role}</Text>
          </View>

          {/* Message Content */}
          <View style={styles.messageContent}>
            <Text style={styles.messageQuote}>
              It is my Honor to lead the DailyMoney community. We are dedicated to translating our Founder&apos;s Vision into tangible success for every individual. Our focus remains steadfast on the balance of Health, Wealth, and Family.
            </Text>

            <Text style={styles.messageParagraph}>
              As President, I oversee the strategic implementation of our programs and ensure that our solutions remain cutting-edge, ethical, and highly effective. We are committed to fostering an environment where growth is not only expected, but also supported by robust educational tools and a network of passionate associates.
            </Text>

            <Text style={styles.messageParagraph}>
              Our strength lies in our community. We encourage collaboration, continuous learning, and a proactive approach to life's challenges. I look forward to witnessing your transformation and celebrating your journey toward becoming Independent for Entire Life.
            </Text>

            {/* Signature */}
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureName}>{president.name}</Text>
              <Text style={styles.signatureTitle}>President, DM</Text>
            </View>
          </View>

          {/* View More Button */}
          <View style={styles.viewMoreLink}>
            <Link href="/(tabs)/about/vision" asChild>
              <TouchableOpacity style={styles.viewMoreBtn}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer */}
          <View style={styles.cardFooterBg}>
            <Image
              source={{ uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png" }}
              style={styles.footerLogo}
            />
            <Text style={styles.footerTitle2}></Text>
            <Text style={styles.footerSubtitle2}>Independent for Entire Life</Text>
          </View>
        </View>

      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  
  presidentPageSection: { paddingVertical: 40, paddingHorizontal: 16 },
  presidentMessageCard: {
    backgroundColor: '#047871',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
    marginBottom: 40,
  },

  cardHeaderBg: { backgroundColor: '#047871', paddingVertical: 40, alignItems: 'center' },
  headerTitle: { fontSize: 25, textAlign:"center", fontWeight: '800',  color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  headerSubtitle: { fontSize: 18, fontWeight: '500', color: '#99f6e4', textAlign: 'center' },

  presidentProfileArea: { alignItems: 'center', marginTop: -44, paddingHorizontal: 24 },
  presidentImage: { width: 160, height: 160, borderRadius: 80, borderWidth: 8, borderColor: '#fff', marginTop: 25 },
  presidentName: { fontSize: 28, fontWeight: '700', color: '#fff', marginTop: 16 },
  presidentRole: { fontSize: 20, fontWeight: '600', color: '#99f6e4' },

  messageContent: { padding: 32 },
  messageQuote: { fontSize: 16, color: '#fff', lineHeight: 26, marginBottom: 24, paddingLeft: 10, fontStyle: 'italic', textAlign: 'center' },
  messageParagraph: { fontSize: 16, color: '#fff', lineHeight: 26, marginBottom: 16 },
  
  signatureBlock: { marginTop: 24, alignItems: 'flex-end' },
  signatureName: { fontSize: 16, fontWeight: '700', color: '#fff' },
  signatureTitle: { fontSize: 14, color: '#fff' },

  viewMoreLink: { alignItems: 'center', marginVertical: 16 },
  viewMoreBtn: { backgroundColor: '#ff9900', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 50 },
  viewMoreText: { color: '#000', fontWeight: '700', fontSize: 16 },

  cardFooterBg: { backgroundColor: '#1f2937', paddingVertical: 24, alignItems: 'center' },
  footerLogo: { width: 60, height: 60, resizeMode: 'contain', marginBottom: 12 },
  footerTitle2: { fontSize: 28, fontWeight: '700', letterSpacing: 1, color: '#facc15', marginTop: -10, textTransform: 'uppercase' },
  footerSubtitle2: { fontSize: 18, color: '#fde047', marginTop: 4 },

  
});