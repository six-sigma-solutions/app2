import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AuthHeader from "../components/AuthHeader";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { resetPassword } from "../lib/firebase";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
  Alert.alert("Error", "Please enter your email".replace(/["']/g, ""));
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
  Alert.alert("Success", "Password reset link sent to your email".replace(/["']/g, ""));
      router.push("/signin");
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? err.message
          : "Something went wrong. Please try again.";
  Alert.alert("Reset Failed", (errorMessage as string).replace(/["']/g, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
  <AuthHeader title={"Reset Password".replace(/["']/g, "")}/>
      </View>
      <FloatingLabelInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/signin")}
        style={{ marginTop: 16 }}
      >
        <Text style={styles.link}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001f3f",
    justifyContent: "center",
    padding: 20,
  },
  headerWrapper: {
    marginBottom: 40,
    marginTop: -65, // moves only the title upward
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
