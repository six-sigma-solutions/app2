import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AutoScrollView from '../../../components/AutoScrollView';
import { Link } from 'expo-router'; // or react-navigation if using that

const founder = {
  name: "Dr.V.Chellapondy ",
  role: "Founder & CEO",
  image: require('../../../assets/sir.png'), // Adjust your path
};

export default function FounderMsg() {
  return (
    <AutoScrollView style={styles.container}>
      <View style={styles.founderPageSection}>
        {/* Main Card */}
        <View style={styles.founderMessageCard}>
          {/* Header Section */}
          <View style={styles.cardHeaderBg}>
            <Text style={styles.headerTitle}>Founder&apos;s Message</Text>
            <Text style={styles.headerSubtitle}>A Note on Vision and Commitment</Text>
          </View>

          {/* Founder Profile */}
          <View style={styles.founderProfileArea}>
            <Image source={founder.image} style={styles.founderImage} />
            <Text style={styles.founderName}>{founder.name}</Text>
            <Text style={styles.founderRole}>{founder.role}</Text>
          </View>
          <View style={styles.messageSection}>
              <Image source={require('../../../assets/founder1.jpg')} style={styles.messageImage} />
            </View>

          {/* Message Content */}
      
            

            <View style={styles.messageSection}>
              <Image source={require('../../../assets/founder2.jpg')} style={styles.messageImage} />
            </View>
          

          {/* View More Button */}
          <View style={styles.viewMoreLinkMyLife}>
            <Link href="/(tabs)/about/president" asChild>
              <TouchableOpacity style={styles.viewMore}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer Section */}
          <View style={styles.cardFooterBg}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png' }}
              style={styles.footerLogo}
            />
            <Text style={styles.footerTitle2}></Text>
            <Text style={styles.footerSubtitle2}>Independent for Entire Life </Text>
          </View>
        </View>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  founderPageSection: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    minHeight: '100%',
    backgroundColor: '#f9fafb',
  },

  founderMessageCard: {
    width: "100%",
    alignSelf: 'center',
    backgroundColor: '#047871',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  /* Header */
  cardHeaderBg: {
    backgroundColor: '#047871',
    paddingVertical: 48,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#99f6e4',
    textAlign: 'center',
  },

  /* Founder Profile */
  founderProfileArea: {
    alignItems: 'center',
    marginTop: -44,
    paddingHorizontal: 24,
  },
  founderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: 25,
  },
  founderName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  founderRole: {
    fontSize: 20,
    textAlign:"center",
    fontWeight: '600',
    color: '#99f6e4',
  },

  /* Message Content */
  messageContent: {
    padding: 10,
    width:"100%",
  },
  messageQuote: {
    fontSize: 16,
    lineHeight: 26,
    color: '#fff',
    marginBottom: 32,
    paddingLeft: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    justifyContent:"flex-end",
  },
  signature: {
    color: '#00ecd9ff',
    fontSize: 18,
    fontWeight: '600',
  },
  messageSection: {
    marginVertical: 48,
    alignItems: 'center',
  },
  messageImage: {
    width: '100%',
    height: 440,
   
    objectFit:'cover',
    
    resizeMode: 'cover',
  },

  /* View More Button */
  viewMoreLinkMyLife: {
    alignItems: 'center',
    marginBottom: 24,
  },
  viewMore: {
    backgroundColor: '#d32a2a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* Footer */
  cardFooterBg: {
    backgroundColor: '#1f2937',
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  footerTitle2: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#facc15',
    marginTop: -50,
    textTransform: 'uppercase',
  },
  footerSubtitle2: {
    fontSize: 20,
    color: '#fde047',
    marginTop: 4,
  },
});