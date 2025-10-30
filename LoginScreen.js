import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signIn } from "../firebase";

export default function SigninScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("Sign in error:", err);
      Alert.alert("Login failed", err.message || "Please check credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: { height: 48, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  button: { backgroundColor: "#2a74c6", height: 48, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  link: { marginTop: 12, color: "#2a74c6", textAlign: "center" },
});
