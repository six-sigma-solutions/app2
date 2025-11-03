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
    { code: "+93", country: "Afghanistan" },
    { code: "+355", country: "Albania" },
    { code: "+213", country: "Algeria" },
    { code: "+1-684", country: "American Samoa" },
    { code: "+376", country: "Andorra" },
    { code: "+244", country: "Angola" },
    { code: "+1-264", country: "Anguilla" },
    { code: "+1-268", country: "Antigua and Barbuda" },
    { code: "+54", country: "Argentina" },
    { code: "+374", country: "Armenia" },
    { code: "+297", country: "Aruba" },
    { code: "+61", country: "Australia" },
    { code: "+43", country: "Austria" },
    { code: "+994", country: "Azerbaijan" },
    { code: "+1-242", country: "Bahamas" },
    { code: "+973", country: "Bahrain" },
    { code: "+880", country: "Bangladesh" },
    { code: "+1-246", country: "Barbados" },
    { code: "+375", country: "Belarus" },
    { code: "+32", country: "Belgium" },
    { code: "+501", country: "Belize" },
    { code: "+229", country: "Benin" },
    { code: "+1441", country: "Bermuda" },
    { code: "+975", country: "Bhutan" },
    { code: "+591", country: "Bolivia" },
    { code: "+387", country: "Bosnia and Herzegovina" },
    { code: "+267", country: "Botswana" },
    { code: "+55", country: "Brazil" },
    { code: "+246", country: "British Indian Ocean Territory" },
    { code: "+673", country: "Brunei" },
    { code: "+359", country: "Bulgaria" },
    { code: "+226", country: "Burkina Faso" },
    { code: "+257", country: "Burundi" },
    { code: "+855", country: "Cambodia" },
    { code: "+237", country: "Cameroon" },
    { code: "+1", country: "Canada" },
    { code: "+238", country: "Cape Verde" },
    { code: "+1-345", country: "Cayman Islands" },
    { code: "+236", country: "Central African Republic" },
    { code: "+235", country: "Chad" },
    { code: "+56", country: "Chile" },
    { code: "+86", country: "China" },
    { code: "+57", country: "Colombia" },
    { code: "+269", country: "Comoros" },
    { code: "+682", country: "Cook Islands" },
    { code: "+506", country: "Costa Rica" },
    { code: "+385", country: "Croatia" },
    { code: "+53", country: "Cuba" },
    { code: "+599", country: "Curaçao" },
    { code: "+357", country: "Cyprus" },
    { code: "+420", country: "Czech Republic" },
    { code: "+45", country: "Denmark" },
    { code: "+253", country: "Djibouti" },
    { code: "+1-767", country: "Dominica" },
    { code: "+1-809", country: "Dominican Republic" },
    { code: "+593", country: "Ecuador" },
    { code: "+20", country: "Egypt" },
    { code: "+503", country: "El Salvador" },
    { code: "+240", country: "Equatorial Guinea" },
    { code: "+291", country: "Eritrea" },
    { code: "+372", country: "Estonia" },
    { code: "+251", country: "Ethiopia" },
    { code: "+500", country: "Falkland Islands (Malvinas)" },
    { code: "+298", country: "Faroe Islands" },
    { code: "+679", country: "Fiji" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+594", country: "French Guiana" },
    { code: "+689", country: "French Polynesia" },
    { code: "+241", country: "Gabon" },
    { code: "+220", country: "Gambia" },
    { code: "+995", country: "Georgia" },
    { code: "+49", country: "Germany" },
    { code: "+233", country: "Ghana" },
    { code: "+350", country: "Gibraltar" },
    { code: "+30", country: "Greece" },
    { code: "+299", country: "Greenland" },
    { code: "+1-473", country: "Grenada" },
    { code: "+590", country: "Guadeloupe" },
    { code: "+1-671", country: "Guam" },
    { code: "+502", country: "Guatemala" },
    { code: "+224", country: "Guinea" },
    { code: "+245", country: "Guinea-Bissau" },
    { code: "+592", country: "Guyana" },
    { code: "+509", country: "Haiti" },
    { code: "+504", country: "Honduras" },
    { code: "+36", country: "Hungary" },
    { code: "+354", country: "Iceland" },
    { code: "+91", country: "India" },
    { code: "+62", country: "Indonesia" },
    { code: "+98", country: "Iran (Islamic Republic of)" },
    { code: "+964", country: "Iraq" },
    { code: "+353", country: "Ireland" },
    { code: "+972", country: "Israel" },
    { code: "+39", country: "Italy" },
    { code: "+1-876", country: "Jamaica" },
    { code: "+81", country: "Japan" },
    { code: "+44", country: "United Kingdom" },
    { code: "+7", country: "Russia" },
    { code: "+251", country: "Ethiopia" }
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
                <Picker.Item key={c.code} label={`${c.country} (${c.code})`} value={c.code} />
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
