import React, { useEffect, useState } from "react";
import { Linking ,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import PopupModal from "../../components/PopupModal";
import AutoScrollView from "../../components/AutoScrollView";

// Data for the bullet points to make the code cleaner
const solutions = [
  "Solutions for Every Stage of Your Health & Wealth Journey.",
  "DM Made Easy, Health & Wealth Made Possible.",
  "Smart Choices for DM, Smarter Future in Health & Wealth.",
  "From Today’s Money to Tomorrow’s Wealth & Wellness.",
  "Empowering You Every Day with Money, Health, and Wealth.",
];

// NEW: Data for the Philosophy section
const philosophyPoints = [
  "Your Partner in DM, Health, and Wealth for Life.",
  "Every Stage, Every Step , Health & Wealth Solutions.",
  "DM Balance Your Life. Build Your Health. Grow Your Wealth.",
  "Small Income Wins, Big Health & Wealth Gains.",
  "Simplify with DM. Strengthen Health. Secure Wealth.",
  "Master Your Day, Master Your Health, Master Your Well-being.",
  "Turn Daily Financial Actions into a Lifetime of Health and Wealth.",
  "Live Well-Live Wealthy-Every Single Day.",
];

export default function HomeScreen() {
  const router = useRouter();

  // popup state
  const [showPopup, setShowPopup] = useState(false);

  const video = React.useRef<Video>(null);
  // State to track if the image is grayscale or color
  const [isGrayscale, setIsGrayscale] = useState(true);

  // --- Preload & MaskedView first-render fix ---
  const [assetsReady, setAssetsReady] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Asset.loadAsync([
          require("../../assets/bg-mask.png"),
          require("../../assets/budhha-video6.mp4"),
          require("../../assets/budhha-video6.mp4"),
        ]);
      } catch (e) {
        // ignore – still try to render
      } finally {
        if (!mounted) return;
        setAssetsReady(true);
        // Force one extra composition pass (Android MaskedView quirk)
        requestAnimationFrame(() => setRerenderKey((k) => k + 1));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-show popup when Home mounts
  useEffect(() => {
    // small timeout so the screen has a chance to mount UI first
    const t = setTimeout(() => setShowPopup(true), 80);
    return () => clearTimeout(t);
  }, []);
  // --- end fix ---

  // AutoScrollView will handle scrolling to top on focus

  return (
    <>
      <PopupModal
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        title={"Welcome to DM "}
        // pass a Text node so we can style the popup message white
        message={
          <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '600', textAlign: 'center', lineHeight: 34 }}>
            "For the betterment of all people across the world — Especially those driving innovation in the Global IT Community."
          </Text>
        }
        buttonText={"Get in →"}
      />
       <AutoScrollView style={styles.container}>    

      {/* Top banner: DM - Daily Message (45deg gradient) */}
      <LinearGradient
        colors={["#cedb1c", "#79d8d8"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.topBanner}
      >
        <View style={styles.bannerInner}>
          <Text style={styles.bannerTitle}>DM - Daily Message</Text>
          <Text style={styles.bannerSubtitle}>Health and Wellness</Text>
          <Text style={styles.bannerSubtitle}>The World Premium Healthy and Happy Community.</Text>

        </View>
      </LinearGradient>

 
      {/* ========== HERO SECTION (FIXED) ========== */}
      <View style={styles.heroSection}>
        {/* Masked Buddha */}
        {assetsReady ? (
          <MaskedView
            key={rerenderKey}
            style={styles.maskedViewStyle}
            maskElement={
              <View
                style={styles.maskContainer}
                renderToHardwareTextureAndroid
                collapsable={false}
              >
                <Image
                  source={require("../../assets/bg-mask.png")}
                  style={styles.maskImage}
                />
              </View>
            }
          >
            {/* Put the hardware hint on a View, not TouchableOpacity */}
            <View renderToHardwareTextureAndroid>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsGrayscale(!isGrayscale)}
              >
                <Video
                  ref={video}
                  style={styles.buddhaImage}
                   resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
            isMuted
                  source={
                    isGrayscale
                      ? require("../../assets/budhha-video6.mp4")
                      : require("../../assets/budhha-video6.mp4")

                      
                  }
           
                  
                 
                />
              </TouchableOpacity>
            </View>
          </MaskedView>
        ) : (
          // Placeholder occupies space while assets preload
          <View style={styles.maskedViewStyle}>
            <Video
              source={require("../../assets/budhha-video6.mp4")}
              style={styles.buddhaImage}
            />
          </View>
        )}

        {/* The hero text content now follows the masked image */}
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroRed}>D</Text>
            <Text style={styles.money}>M</Text>
          </Text>
          <Text style={styles.heroSub}>Health & Wealth. </Text>
          <Text style={styles.heroSubtitle}>Independent for Entire life.</Text>
          <Text style={styles.heroDesc}>
            DM stands for discipline, unity and independence.
          </Text>
          <Text style={styles.heroDesc}>
          Together, we are shaping a future of health, wealth, and limitless opportunities.
          </Text>
          <Text style={styles.heroDesc}>
            With DM, every step forward is a step towards economic freedom, and a
            life without limits.
          </Text>
          <Text style={styles.heroDesc}>
            Welcome to <Text style={styles.span}>DM! </Text>
          </Text>
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.seeWorkBtn}
              onPress={() => router.push("/(tabs)/about/overview")}
            >
              <Text style={styles.btnText}>See our work</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/health")}>
              <Text style={styles.getStartedBtn}>Get started →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ========== "WALK WITH YOU" CARD ========== */}
      <View style={styles.cardSection}>
        <View style={styles.videoCardContainer}>
          <Image
            
            style={styles.videoBackground}
            source={require("../../assets/gif7.png")}
            
            />
        </View>
      </View>

      {/* ========== SOLUTIONS SECTION ========== */}
      <View style={styles.solutionsSection}>
        <Text style={styles.sectionTitle}>
          Solutions for every stage of DM
        </Text>
        {solutions.map((item, index) => (
          <View key={index} style={styles.bulletItem}>
            <Text style={styles.bulletCheck}>✓</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* ========== SOLUTIONS GRID ========== */}
      <View style={styles.solutionsGrid}>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionCardTitle}>
            Vision & Mission is your <Text style={styles.redText}>Future</Text>
          </Text>
          <Image
            source={require("../../assets/phone1.png")}
            style={styles.solutionCardImage}
          />
        </View>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionCardTitle}>
           Vision & Mission is your  <Text style={styles.redText}>        Future Generation</Text>
          </Text>
          <Image
            source={require("../../assets/phone2.png")}
            style={styles.solutionCardImage}
          />
        </View>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionCardTitle}>
           Vision & Mission is your <Text style={styles.redText}> Generation After Generations </Text>
          </Text>
          <Image
            source={require("../../assets/phone3.png")}
            style={styles.solutionCardImage}
          />
        </View>
      </View>

      {/* ========== "WEALTH THAT GROWS" CARD ========== */}
      <View style={styles.cardSection}>
        <ImageBackground
          source={require("../../assets/home4.png")}
          style={styles.wealthCard}
          imageStyle={{ borderRadius: 20 }}
        />
      </View>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <View style={styles.philosophySectionWrapper}>
        <View style={styles.philosophyCard}>
          <Text style={styles.sectionTitle}>The DM Philosophy</Text>
          {philosophyPoints.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletCheck}>✓</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ========== CORE TEAM SECTION ========== */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>Core Team</Text>
        <View style={styles.founderCard}>
          <Image
            source={require("../../assets/sir.png")}
            style={styles.founderImage}
          />
          <Text style={[styles.teamMemberName, styles.founderName]}>
            Dr.V.Chellapondy
          </Text>
          
        </View>
        <View style={styles.teamGrid}>
          <View style={styles.teamMemberCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/120" }}
              style={styles.teamMemberImage}
            />
            <Text style={styles.teamMemberName}>S.Vasu</Text>
            
          </View>
          <View style={styles.teamMemberCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/120" }}
              style={styles.teamMemberImage}
            />
            <Text style={styles.teamMemberName}>Dr. KP Kosygan</Text>
          
          </View>
          <View style={styles.teamMemberCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/120" }}
              style={styles.teamMemberImage}
            />
            <Text style={styles.teamMemberName}>R.K.Selvamani</Text>
            
          </View>
        </View>
      </View>

            {/* ========== FOOTER ========== */}
      <View style={styles.footer}>
        <View style={styles.footerBannerContainer}>
          <Image
            source={require("../../assets/footer1.jpg")}
            style={styles.footerBannerImage}
          />
          <TouchableOpacity
            style={styles.footerBannerButton}
            onPress={() => router.push("/contact")}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnText, styles.footerbtn]}>Say Hello</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContent}>
          <View style={styles.footerLeftColumn}>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              activeOpacity={0.7}
            >
              <Image
                source={require("../../assets/DailyMoney.png")}
                style={styles.footerLogo}
                
              />
            </TouchableOpacity>
            <Text style={styles.footerLogoText}></Text>
            <Text style={styles.footerAddress}>
              Six Sigma Solutions, NKC Towers 1st Floor, Opp to Government
              Engineering College, Salem-636011. TamilNadu, India.
            </Text>
            <Text style={styles.footerCopyright}>
              © 2025. All rights reserved.
            </Text>
          </View>
           
          <View style={styles.footerRightColumn}>
            
            
            <View style={styles.footerLinkSection}>
              <Text style={styles.footerLinkTitle}>Company</Text>
              
              <TouchableOpacity onPress={() => router.push("/home")}>
                <Text style={styles.footerLink}>Home </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/health")}>
                <Text style={styles.footerLink}>Health </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/wealth")}>
                <Text style={styles.footerLink}>Wealth </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/family")}>
                <Text style={styles.footerLink}>Family </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/about/overview")}>
                <Text style={styles.footerLink}>About </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/mylife/entrepreneur")}
              >
                <Text style={styles.footerLink}>My Life </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerLinkSection}>
              <Text style={styles.footerLinkTitle}>Connect </Text>
              <TouchableOpacity
                style={styles.socialLinkItem}
                onPress={() => Linking.openURL("https://x.com/dailymsghealthy")}
              >
                <FontAwesome6
                  name="x-twitter"
                  size={22}
                  color="#949090"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialLinkItem}
                onPress={() =>
                  Linking.openURL(
                    "https://www.facebook.com/Daily.Message.Healthy"
                  )
                }
              >
                <FontAwesome6
                  name="facebook"
                  size={22}
                  color="#949090"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialLinkItem}
                onPress={() =>
                  Linking.openURL(
                    "https://www.instagram.com/daily_message_healthy/")
                }
              >
                <FontAwesome6
                  name="instagram"
                  size={22}
                  color="#949090"
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  </AutoScrollView>
    </>
  );
}


// ========== STYLESHEET ==========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  redText: { color: "#b71c1c" },
  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    alignItems: "center",
  },
  maskedViewStyle: {
    height: 400,
    width: "100%",
    marginBottom: -15,
  },
  maskContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maskImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buddhaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  heroTitle: {
    fontSize: 50,
    fontWeight: "400",
    textAlign: "left",
  },
  heroRed: { color: "#d32a2a" },
  money: { color: "#817676" },
  heroSub: { fontSize: 28, marginTop: 10, textAlign: "left" },
  heroSubtitle: {
    color: "green",
    fontSize: 18,
    marginTop: 5,
    textAlign: "left",
  },
  heroDesc: {
    fontSize: 16,
    color: "#7c7272",
    textAlign: "left",
    marginTop: 15,
    lineHeight: 24,
  },
  span: { color: "#d32a2a" },
  heroActions: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  seeWorkBtn: {
    backgroundColor: "#b71c1c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  getStartedBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0b0a0a",
    marginTop: 12,
  },
  // Card Sections
  cardSection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  videoCardContainer: {
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  videoBackground: {
   height:"100%",
   width:"100%",
  },
  philosophyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 30,
  },
  // Solutions Section
  solutionsSection: {
    padding: 20,
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "400",
    color: "#d32a2a",
    marginBottom: 20,
    textAlign: "left",
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  bulletCheck: {
    color: "#d32a2a",
    fontSize: 16,
    marginRight: 10,
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    flex: 1,
  },
  // Solutions Grid
  solutionsGrid: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  solutionCard: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
    overflow: "hidden",
    height:430,
    
  },
  solutionCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  solutionCardImage: {
    width: "100%",
    height: 368,
    resizeMode: "contain",

  },
  // Wealth Grows Card
  wealthCard: {
    height: 370,
    justifyContent: "center",
    alignItems: "center",
  },
  // Philosophy Section
  philosophySectionWrapper: {
    padding: 20,
  },
  // Core Team Section
  teamSection: {
    padding: 20,
    alignItems: "center",
  },
  teamTitle: {
    fontSize: 28,
    fontWeight: "400",
    marginBottom: 30,
    textAlign: "center",
  },
  founderCard: {
    alignItems: "center",
    marginBottom: 40,
  },
  founderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  founderName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  founderRole: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  teamMemberRole: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teamMemberCard: {
    alignItems: "center",
    width: "45%",
    margin: 5,
  },
  teamMemberImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  // CTA Section
  ctaSection: {
    backgroundColor: "#f8f9fa",
    padding: 30,
    alignItems: "center",
    marginVertical: 20,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  ctaButtons: {
    width: "100%",
  },
  ctaButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 15,
  },
  ctaButtonPrimary: {
    backgroundColor: "#e63946",
  },
  ctaButtonTextPrimary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ctaButtonSecondary: {
    borderWidth: 2,
    borderColor: "#e63946",
  },
  ctaButtonTextSecondary: {
    color: "#e63946",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Footer
  footer: {
    backgroundColor: "#000",
    padding: 10,
  },
  footerBannerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  footerBannerImage: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 20,
  },
  topBanner: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  bannerInner: { maxWidth: '100%' },
  bannerTitle: { fontSize: 22, fontWeight: '700', color: '#0f172a' ,textAlign:'center'},
  bannerSubtitle: { fontSize: 18, marginTop: 4, color: '#0f172a',textAlign:'center' },
  bannerBody: { fontSize: 16, marginTop: 8, color: '#0f172a', lineHeight: 22 },
  bannerText: {
    fontSize: 20,
    color: '#0f172a',
    lineHeight: 32,
    fontWeight: '600',
    
  },
  footerBannerButton: {
    backgroundColor: "#d32a2a",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  footerbtn: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  footerContent: {
    flexDirection: "row",
    gap: 1,
    alignItems: "flex-start",
  },
  footerLeftColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  footerRightColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 25,
  },
  footerLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginLeft:35,
  },
  footerLogoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -25,
    marginLeft:36,
    
  },
  footerAddress: {
    color: "#bdbdbd",
    marginTop: 1,
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 12,
  },
  footerCopyright: {
    color: "#888",
    marginTop: 20,
    fontSize: 12,
  },
  footerLinkSection: {
    alignItems: "flex-start",
  },
  footerLinkTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    
  },
  footerLink: {
    color: "#949090",
    fontSize: 14,
    marginBottom: 10,
   
  },
  socialLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  socialIcon: {
    marginRight: 8,
  },
});