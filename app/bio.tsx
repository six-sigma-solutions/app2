// Bio.tsx (or Bio.jsx)
import React, { useMemo, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import AutoScrollView from '../components/AutoScrollView';

const NAVY = '#000080';

type Member = {
  name: string;
  image: any;         // require(...) for local or { uri: string } for remote
  slogan: string;
  link: string;
};

const founder = {
  name: 'Dr.V.Chellapondy',
  image: require("../assets/sir.png"),
  link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  slogan: "My job is - changing people's life.",
};

const members: Member[] = [
  {
    name: 'S.Vasu',
    image: require("../assets/vasu.jpg"),
    slogan: 'My Health is My Wealth.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'R.K.Selvamani',
    image: require("../assets/person23.jpg"),
    slogan: 'My World - My Children.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'C.Arvind',
    image: require("../assets/aravind.jpg"),
    slogan: 'I want to became Entrepreneur.',
    link: 'https://arvindc.herbalife.com/en-us/u',
  },
 
  {
    name: 'Dr.K.P.Kosygan',
    image: require("../assets/kosy.jpg"),
    slogan: "I'm Forever a Student.",
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Dhanush A V',
      image: require("../assets/dhanush.jpg"),
    slogan: 'My Healthy weight loss journey starts Now.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Kishore K',
    image: require("../assets/kisore.jpg"),
    slogan: 'Slim, Fit, and full of Energy.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Jeganraj A',
      image: require("../assets/jega2.png"),
    slogan: 'Healthy living happy living.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Sathish M',
      image: require("../assets/sathish.jpg"),
    slogan: 'Choosing health and happiness every day.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Ilayaraju C',
     image: require("../assets/raju.jpg"),
    slogan: 'Small steps lead to big changes.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'Baskar U',
     image: require("../assets/baskar.jpg"),
    slogan: 'Positive changes lead to powerful results.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },

  // Examples with placeholders via remote URLs:
  {
    name: 'X X X X',
    image: { uri: 'https://placehold.co/100x100/EFEFEFF/grey?text=Member' },
    slogan: 'My wellness journey begins Now.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'X X X X',
    image: { uri: 'https://placehold.co/100x100/EFEFEFF/grey?text=Member' },
    slogan: 'My wellness journey begins Now.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'X X X X',
    image: { uri: 'https://placehold.co/100x100/EFEFEFF/grey?text=Member' },
    slogan: 'My wellness journey begins Now.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  {
    name: 'X X X X',
    image: { uri: 'https://placehold.co/100x100/EFEFEFF/grey?text=Member' },
    slogan: 'My wellness journey begins Now.',
    link: 'https://cpdian.goherbalife.com/Catalog/Home/Index/en-IN/',
  },
  // ...add the rest of your “X X X X” entries similarly
];

function PointingIcon() {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, { toValue: 5, duration: 600, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, { toValue: 0, duration: 600, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.7, duration: 600, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [translateY, opacity]);

  return (
    <Animated.Text
      style={[styles.pointingIcon, { transform: [{ translateY }], opacity }]}
      accessible={false}
    >
      👆
    </Animated.Text>
  );
}

function TeamCard({ member }: { member: Member }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 1.03, useNativeDriver: true, friction: 6, tension: 90 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6, tension: 90 }).start();
  };

  const open = () => Linking.openURL(member.link).catch(() => {});

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <View style={styles.profileRow}>
        <Image source={member.image} style={styles.avatar} resizeMode="cover" />
        <Text style={styles.memberName}>{member.name}</Text>
      </View>

      {/* Clickable slogan area at the bottom */}
      <Pressable
        onPress={open}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.linkArea}
        android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      >
        <Text style={styles.sloganText}>{member.slogan}</Text>
        <PointingIcon />
      </Pressable>
    </Animated.View>
  );
}

export default function Bio() {
  const { width } = Dimensions.get('window');
  const isTablet = width <= 992 && width > 768;
  const isMobile = width <= 768;
  const isTiny = width <= 480;

  const containerPad = useMemo(() => (isTiny ? 10 : 20), [isTiny]);

  const openFounder = () => Linking.openURL(founder.link).catch(() => {});

  return (
    <SafeAreaView style={styles.safe}>
      <AutoScrollView
        contentContainerStyle={[styles.page, { padding: containerPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerWrap}>
          <Text
            style={[
              styles.headerText,
              isMobile && { fontSize: 20, marginHorizontal: 10, paddingVertical: 15 },
              isTablet && { marginHorizontal: 40 },
            ]}
          >
            Choose your Path, Travel with us, Lead a Healthy-Happy-Wealthy-Heaven Life.
          </Text>
        </View>

        {/* Founder */}
        <View style={styles.founderSection}>
          <View
            style={[
              styles.founderProfile,
              isMobile && { flexDirection: 'column', gap: 10 },
            ]}
          >
            <Image source={founder.image} style={styles.founderAvatar} resizeMode="cover" />
            <Text style={[styles.founderName, isMobile && { fontSize: 28 }]}>
              {founder.name}
            </Text>
          </View>

          <View style={styles.hr} />

          <Pressable onPress={openFounder} style={styles.founderLink} android_ripple={{ color: 'rgba(255,255,255,0.2)' }}>
            <Text style={[styles.founderSlogan, isMobile && { fontSize: 18 }]}>
              {founder.slogan}
            </Text>
            <PointingIcon />
          </Pressable>
        </View>

        {/* Team Grid */}
        <View
          style={[
            styles.teamWrap,
            isTablet && { gap: 25 },
            isMobile && { gap: 20 },
          ]}
        >
          {members.map((m, idx) => (
            <TeamCard member={m} key={`${m.name}-${idx}`} />
          ))}
        </View>

        {/* Footer Card */}
        <View style={styles.footerCard}>
          <View style={styles.footerLogoWrap}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/dgay8ba3o/image/upload/v1761126944/DailyMoney_wzp9zh.png' }}
              style={styles.footerLogo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.footerTitle}></Text>
          <Text style={styles.footerSubtitle}>Independent for Entire Life</Text>
        </View>
      </AutoScrollView>
    </SafeAreaView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
  },
  android: { elevation: 6 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f7' },
  page: { gap: 16 },
  headerWrap: { alignItems: 'center' },
  headerText: {
    color: 'rgb(1,255,1)',
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#040464',
    borderRadius: 5,
    marginHorizontal: 190,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontWeight: '600',
  },

  founderSection: { alignItems: 'center', marginBottom: 30 },
  founderProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  founderAvatar: {
    width: 150, height: 150, borderRadius: 75,
    borderWidth: 4, borderColor: '#fff',
    ...cardShadow,
  },
  founderName: { fontSize: 32, color: '#333', fontWeight: '700' },
  hr: {
    width: '60%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  founderLink: { position: 'relative', paddingBottom: 35, alignItems: 'center' },
  founderSlogan: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff',
    backgroundColor: NAVY,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 5,
    textAlign: 'center',
  },

  teamWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 40,
  },
  card: {
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 70, // space for bottom link
    borderRadius: 10,
    maxWidth: 420,
    width: '90%',
    position: 'relative',
    ...cardShadow,
  },
  profileRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
    width: '100%',
  },
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center' },
  memberName: { fontSize: 24, color: '#333', fontWeight: '700', textAlign: 'center' },

  linkArea: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 25,
    alignItems: 'center',
  },
  sloganText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: NAVY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pointingIcon: {
    position: 'absolute',
    bottom: -22,
    fontSize: 22,
    alignSelf: 'center',
  },

  footerCard: {
    marginTop: 24,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    marginBottom: 40,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '92%',
    ...cardShadow,
  },
  footerLogoWrap: { width: 120, height: 50, marginBottom: 8 },
 
  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    alignSelf:"center",
    resizeMode: "contain",
    paddingRight:10,
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", marginTop:-10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});