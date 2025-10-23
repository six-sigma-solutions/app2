import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AutoScrollView from "../../../components/AutoScrollView";
import { useRouter } from "expo-router";

export default function WomenEmpowerment() {
    const router = useRouter();

    return (
        <AutoScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerWrap}>
                <Text style={styles.headerText}>Women Empowerment - {"\n"} A Deeper Vision</Text>
            </View>

            {/* Hero Section */}
            <View style={styles.hero}>
                <Image
                    source={require("../../../assets/women-1.jpg")}
                    style={styles.heroImage}
                />
                <View style={styles.heroContent}>
                    <Text style={styles.heroTitle}>Empowered Women Empower Women</Text>
                    <Text style={styles.heroText}>
                        Empowered women create waves of change — inspiring others, strengthening communities,
                        and redefining leadership for a brighter tomorrow.
                    </Text>
                </View>
            </View>

            {/* Mission Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Empowered Women</Text>
                <View style={styles.points}>
                    <Text style={[styles.point, { color: "#e53935" }]}>
                        Womens empowerment is not just about equality — it is about unlocking the full potential of humanity.
                    </Text>
                    <Text style={[styles.point, { color: "#1976d2" }]}>
                        Womens empowerment is not a charity — it is justice, progress, and the future.
                    </Text>
                    <Text style={[styles.point, { color: "#2e7d32" }]}>
                        Empowerment means women stand <Text style={styles.highlight}>shoulder to shoulder</Text>, equal in strength and purpose.
                    </Text>
                </View>

                {/* Image Row */}
                <View style={styles.imageRow}>
                    <Image source={require("../../../assets/women-2.jpg")} style={styles.rowImage} />
                    <Image source={require("../../../assets/women-3.jpg")} style={styles.rowImage} />
                    <Image source={require("../../../assets/women-4.jpg")} style={styles.rowImage} />
                </View>
            </View>

            {/* Stats Section */}
            <View style={styles.stats}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>500K</Text>
                    <Text style={styles.statText}>Women Empowered</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>50+</Text>
                    <Text style={styles.statText}>Countries Reached</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>1K+</Text>
                    <Text style={styles.statText}>Local Initiatives</Text>
                </View>
            </View>

            {/* Programs Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Programs</Text>
                <View style={styles.programs}>
                    <View style={styles.program}>
                        <Text style={styles.programTitle}>Education</Text>
                        <Text style={styles.programText}>
                            Education, career development programs, and economic empowerment initiatives for women.
                        </Text>
                        <Image source={require("../../../assets/women-5.jpg")} style={styles.programImage} />
                    </View>

                    <View style={styles.program}>
                        <Text style={styles.programTitle}>Economic Empowerment</Text>
                        <Text style={styles.programText}>
                            Supporting women in entrepreneurship, employment, and financial independence.
                        </Text>
                        <Image source={require("../../../assets/em2.jpg")} style={styles.programImage} />
                    </View>

                    <View style={styles.program}>
                        <Text style={styles.programTitle}>Advocacy</Text>
                        <Text style={styles.programText}>
                            Promoting womens rights and gender equality through advocacy and community programs.
                        </Text>
                        <Image source={require("../../../assets/women-7.jpg")} style={styles.programImage} />
                    </View>
                </View>
            </View>

            {/* View More Button */}
            <View style={styles.viewMoreWrap}>
                <TouchableOpacity
                    style={styles.viewMoreBtn}
                    onPress={() => router.push("/(tabs)/mylife/students")}
                >
                    <Text style={styles.viewMoreText}>View More</Text>
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
    container: { flex: 1, backgroundColor: "#fafafa", padding: 10 },

    headerWrap: { marginVertical: 10 },
    headerText: { fontSize: 30, padding: 10, fontWeight: "700", textAlign: "center", color: "#800000" },

    hero: { flexDirection: "column", alignItems: "center", marginVertical: 20 },
    heroImage: { width: "100%", height: 250, borderRadius: 15, marginBottom: 15 },
    heroContent: { alignItems: "center", paddingHorizontal: 10 },
    heroTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10, textAlign: "center" },
    heroText: { fontSize: 16, color: "#555", textAlign: "center" },

    section: { marginVertical: 20 , marginBottom: 20},
    sectionTitle: { fontSize: 30, fontWeight: "700", textAlign: "center", marginBottom: 20 },
    points: { paddingHorizontal: 10 },
    point: { fontSize: 16, marginVertical: 8, textAlign: "center", fontWeight: "600" },
    highlight: { backgroundColor: "#ffd54f", borderRadius: 4, paddingHorizontal: 4 },

    imageRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10 },
    rowImage: { width: 150, height: 200, borderRadius: 10, margin: 5 },

    stats: { flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", backgroundColor: "#b20a2c", padding: 20, borderRadius: 10, marginVertical: 10 },
    statBox: { alignItems: "center", margin: 10 },
    statNumber: { fontSize: 24, fontWeight: "700", color: "#fff" },
    statText: { fontSize: 14, color: "#fff", textAlign: "center" },

    programs: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 15 },
    program: { width: 300, backgroundColor: "#fff", borderRadius: 10, padding: 10, margin: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    programTitle: { fontSize: 28, fontWeight: "700", color: "#b20a2c", marginBottom: 5 },
    programText: { fontSize: 18, color: "#555", marginBottom: 10, fontWeight: "700", },
    programImage: { width: "100%", height: 400, borderRadius: 8 },

    viewMoreWrap: { alignItems: "center", marginVertical: 20 },
    viewMoreBtn: { backgroundColor: "#0b3a55", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12 },
    viewMoreText: { color: "#fff", fontSize: 16, fontWeight: "600" },


  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: "#fffb2c", marginTop: -10 },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});