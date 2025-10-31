import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AutoScrollView from "../components/AutoScrollView";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Added for navigation

export default function Contact() {
  const router = useRouter(); // ✅ Router for back navigation

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    countryCode: "+91",
  });

  const [status, setStatus] = useState<null | { state: string; message?: string }>(null);

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+39", country: "Italy", flag: "🇮🇹" }, { code: "+40", country: "Romania", flag: "🇷🇴" }, { code: "+41", country: "Switzerland", flag: "🇨🇭" }, { code: "+43", country: "Austria", flag: "🇦🇹" }, { code: "+44", country: "United Kingdom", flag: "🇬🇧" }, { code: "+45", country: "Denmark", flag: "🇩🇰" }, { code: "+46", country: "Sweden", flag: "🇸🇪" }, { code: "+47", country: "Norway", flag: "🇳🇴" }, { code: "+48", country: "Poland", flag: "🇵🇱" }, { code: "+49", country: "Germany", flag: "🇩🇪" }, { code: "+52", country: "Mexico", flag: "🇲🇽" }, { code: "+53", country: "Cuba", flag: "🇨🇺" }, { code: "+54", country: "Argentina", flag: "🇦🇷" }, { code: "+55", country: "Brazil", flag: "🇧🇷" }, { code: "+56", country: "Chile", flag: "🇨🇱" }, { code: "+57", country: "Colombia", flag: "🇨🇴" }, { code: "+58", country: "Venezuela", flag: "🇻🇪" }, { code: "+60", country: "Malaysia", flag: "🇲🇾" }, { code: "+61", country: "Australia", flag: "🇦🇺" }, { code: "+62", country: "Indonesia", flag: "🇮🇩" }, { code: "+63", country: "Philippines", flag: "🇵🇭" }, { code: "+64", country: "New Zealand", flag: "🇳🇿" }, { code: "+65", country: "Singapore", flag: "🇸🇬" }, { code: "+66", country: "Thailand", flag: "🇹🇭" }, { code: "+81", country: "Japan", flag: "🇯🇵" }, { code: "+82", country: "South Korea", flag: "🇰🇷" }, { code: "+84", country: "Vietnam", flag: "🇻🇳" }, { code: "+86", country: "China", flag: "🇨🇳" }, { code: "+90", country: "Turkey", flag: "🇹🇷" }, { code: "+92", country: "Pakistan", flag: "🇵🇰" }, { code: "+93", country: "Afghanistan", flag: "🇦🇫" }, { code: "+94", country: "Sri Lanka", flag: "🇱🇰" }, { code: "+95", country: "Myanmar", flag: "🇲🇲" }, { code: "+98", country: "Iran", flag: "🇮🇷" }, { code: "+211", country: "South Sudan", flag: "🇸🇸" }, { code: "+212", country: "Morocco", flag: "🇲🇦" }, { code: "+213", country: "Algeria", flag: "🇩🇿" }, { code: "+216", country: "Tunisia", flag: "🇹🇳" }, { code: "+218", country: "Libya", flag: "🇱🇾" }, { code: "+220", country: "Gambia", flag: "🇬🇲" }, { code: "+221", country: "Senegal", flag: "🇸🇳" }, { code: "+222", country: "Mauritania", flag: "🇲🇷" }, { code: "+223", country: "Mali", flag: "🇲🇱" }, { code: "+224", country: "Guinea", flag: "🇬🇳" }, { code: "+225", country: "Ivory Coast", flag: "🇨🇮" }, { code: "+226", country: "Burkina Faso", flag: "🇧🇫" }, { code: "+227", country: "Niger", flag: "🇳🇪" }, { code: "+228", country: "Togo", flag: "🇹🇬" }, { code: "+229", country: "Benin", flag: "🇧🇯" }, { code: "+230", country: "Mauritius", flag: "🇲🇺" }, { code: "+231", country: "Liberia", flag: "🇱🇷" }, { code: "+232", country: "Sierra Leone", flag: "🇸🇱" }, { code: "+233", country: "Ghana", flag: "🇬🇭" }, { code: "+234", country: "Nigeria", flag: "🇳🇬" }, { code: "+235", country: "Chad", flag: "🇹🇩" }, { code: "+236", country: "Central African Republic", flag: "🇨🇫" }, { code: "+237", country: "Cameroon", flag: "🇨🇲" }, { code: "+238", country: "Cape Verde", flag: "🇨🇻" }, { code: "+239", country: "Sao Tome & Principe", flag: "🇸🇹" }, { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" }, { code: "+241", country: "Gabon", flag: "🇬🇦" }, { code: "+242", country: "Republic of Congo", flag: "🇨🇬" }, { code: "+243", country: "Democratic Republic of Congo", flag: "🇨🇩" }, { code: "+244", country: "Angola", flag: "🇦🇴" }, { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" }, { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" }, { code: "+247", country: "Ascension Island", flag: "🇦🇨" }, { code: "+248", country: "Seychelles", flag: "🇸🇨" }, { code: "+249", country: "Sudan", flag: "🇸🇩" }, { code: "+250", country: "Rwanda", flag: "🇷🇼" }, { code: "+251", country: "Ethiopia", flag: "🇪🇹" }, { code: "+252", country: "Somalia", flag: "🇸🇴" }, { code: "+253", country: "Djibouti", flag: "🇩🇯" }, { code: "+254", country: "Kenya", flag: "🇰🇪" }, { code: "+255", country: "Tanzania", flag: "🇹🇿" }, { code: "+256", country: "Uganda", flag: "🇺🇬" }, { code: "+257", country: "Burundi", flag: "🇧🇮" }, { code: "+258", country: "Mozambique", flag: "🇲🇿" }, { code: "+260", country: "Zambia", flag: "🇿🇲" }, { code: "+261", country: "Madagascar", flag: "🇲🇬" }, { code: "+262", country: "Réunion", flag: "🇷🇪" }, { code: "+263", country: "Zimbabwe", flag: "🇿🇼" }, { code: "+264", country: "Namibia", flag: "🇳🇦" }, { code: "+265", country: "Malawi", flag: "🇲🇼" }, { code: "+266", country: "Lesotho", flag: "🇱🇸" },
  ];

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert("Missing Info", "Please fill in your name, email, and message.".replace(/["']/g, ""));
      return;
    }

    const subject = encodeURIComponent("New Enquiry from Daily Money App");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.countryCode} ${form.phone}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
    );
    const mailtoUrl = `mailto:sixsigmaspvs@gmail.com?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl)
      .then(() => {
        setStatus({ state: "sent" });
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          countryCode: "+91",
        });
      })
      .catch(() => {
        setStatus({ state: "error", message: "Could not open mail app." });
      });
  };

  return (
    <AutoScrollView contentContainerStyle={styles.container}>
      {/* ✅ Close button (X icon) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome name="close" size={26} color="#0a66c2" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>📞 Contact Us</Text>
      <Text style={styles.subtitle}>Join Together! Journey Together!</Text>

      {/* --- Office Info --- */}
      <View style={styles.officeInfo}>
        <Text style={styles.heading}>🏢 Our Offices</Text>
        <Text style={styles.text}>
          SIX SIGMA SOLUTIONS,{"\n"}F-1, No 13, Breeze Enclave,{"\n"}Noombal Main Road, Chennai,{"\n"}Tamil Nadu-600077,
          India
        </Text>

        <Text style={styles.text}>
          SIX SIGMA SOLUTIONS,{"\n"}NKC Towers 1st Floor, Karuppur,
          Salem, TN-636011.{"\n"}
        </Text>

        <Text style={[styles.heading, { marginTop: 20 }]}>✉️ Email us</Text>
        <Text style={styles.link} onPress={() => Linking.openURL("mailto:support@dmhealthy.com")}>
          support@dmhealthy.com
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL("mailto:service@dmhealthy.com")}>
          service@dmhealthy.com
        </Text>

        <Text style={[styles.heading, { marginTop: 20 }]}>📞 Call us</Text>
        <Text style={styles.link} onPress={() => Linking.openURL("tel:+917904373255")}>
          +91 79043 73255
        </Text>

        <View style={styles.socials}>
          <TouchableOpacity onPress={() => Linking.openURL("https://x.com/dailymsghealthy")}>
            <FontAwesome name="twitter" size={22} color="#0a66c2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/Daily.Message.Healthy")}>
            <FontAwesome name="facebook" size={22} color="#1877f2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/daily_message_healthy/")}>
            <FontAwesome name="instagram" size={22} color="#e1306c" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("tel:+919884590009")}>
            <FontAwesome name="phone" size={22} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Contact Form --- */}
      <View style={styles.form}>
        <Text style={styles.heading}>💬 For Inquiries</Text>

        <TextInput
          placeholder="Your Name"
          style={styles.input}
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <TextInput
          placeholder="Your Email"
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />

        <View style={styles.phoneContainer}>
          <View style={styles.countryPicker}>
            <Picker
              selectedValue={form.countryCode}
              onValueChange={(value: string) => handleChange("countryCode", value)}
              style={{ flex: 1 }}
            >
              {countryCodes.map((c) => (
                <Picker.Item key={c.code} label={`${c.flag} ${c.country} (${c.code})`} value={c.code} />
              ))}
            </Picker>
          </View>

          <TextInput
            placeholder="Phone Number"
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />
        </View>

        <TextInput
          placeholder="Company (optional)"
          style={styles.input}
          value={form.company}
          onChangeText={(text) => handleChange("company", text)}
        />

        <TextInput
          placeholder="Your Message"
          style={[styles.input, { height: 120, textAlignVertical: "top" }]}
          multiline
          value={form.message}
          onChangeText={(text) => handleChange("message", text)}
        />

        <TouchableOpacity
          style={[styles.button, status?.state === "sending" && { backgroundColor: "#aaa" }]}
          onPress={handleSubmit}
          disabled={status?.state === "sending"}
        >
          <Text style={styles.buttonText}>
            {status?.state === "sending" ? "Sending..." : "Send Message"}
          </Text>
          <FontAwesome name="send" size={18} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {status?.state === "sent" && (
          <Text style={styles.success}>✅ Your enquiry has been sent successfully!</Text>
        )}
        {status?.state === "error" && (
          <Text style={styles.error}>
            ❌ Submission failed — {status.message || "please try again later."}
          </Text>
        )}
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fafafa",
    flexGrow: 1,
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  closeButton: {
    padding: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
    color: "#0a66c2",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#666",
    lineHeight: 22,
  },
  officeInfo: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 8,
  },
  link: {
    color: "#0a66c2",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  socials: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  form: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: Platform.OS === "ios" ? 14 : 12,
    marginBottom: 15,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    flex: 1,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a66c2",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#0a66c2",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
  },
});
