import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const Newpassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return Math.min(strength, 4);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError("");
    setPasswordStrength(calculateStrength(text));
  };

  const getStrengthColor = () => {
    const colors = ["#E5E7EB", "#FF6B6B", "#FFA500", "#FFD700", "#4CD964"];
    return colors[passwordStrength];
  };

  const getStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    return texts[passwordStrength];
  };

  const validatePassword = () => {
    if (!password || !confirmPassword) {
      setError("Please fill both fields");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Optional: Add more validation
    if (!/[A-Z]/.test(password)) {
      setError("Password should contain at least one uppercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password should contain at least one number");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setError("");
      props.navigation.navigate("Login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create New Password</Text>

        {/* Lock Circle with Checkmark */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../assets/icons/lock.png")}
            style={styles.lockImage}
            resizeMode="contain"
          />
          <View style={styles.checkBadge}>
            <Icon name="check" size={W("4%")} color="#FFFFFF" />
          </View>
        </View>

        {/* Info Text */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Your new password must be</Text>
          <Text style={styles.infoText}>different from previously</Text>
          <Text style={styles.infoText}>used password</Text>
        </View>

        {/* New Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter new password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              style={styles.input}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={W("4%")}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBarContainer}>
                {[1, 2, 3, 4].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          level <= passwordStrength
                            ? getStrengthColor()
                            : "#E5E7EB",
                      },
                    ]}
                  />
                ))}
              </View>
              <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                {getStrengthText()}
              </Text>
            </View>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError("");
              }}
              placeholder="Confirm your password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showConfirmPassword ? "eye-slash" : "eye"}
                size={W("4%")}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Match Indicator */}
          {confirmPassword.length > 0 && password.length > 0 && (
            <View style={styles.matchContainer}>
              <Icon
                name={password === confirmPassword ? "check-circle" : "exclamation-circle"}
                size={W("3.5%")}
                color={password === confirmPassword ? "#4CD964" : "#FF3B30"}
              />
              <Text
                style={[
                  styles.matchText,
                  { color: password === confirmPassword ? "#4CD964" : "#FF3B30" },
                ]}
              >
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </Text>
            </View>
          )}
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Password</Text>
          )}
        </TouchableOpacity>

        {/* Additional Info */}
        <Text style={styles.footerText}>
          By saving, you agree to our Terms of Service
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Newpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: W("6%"),
    paddingTop: H("2%"),
    paddingBottom: H("4%"),
    alignItems: "center",
  },

  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: H("2%"),
  },

  backButton: {
    padding: W("2%"),
  },

  backArrow: {
    fontSize: W("7%"),
    fontWeight: "500",
    color: "#333",
  },

  title: {
    fontSize: W("7%"),
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    marginBottom: H("3%"),
    letterSpacing: -0.5,
  },

  iconWrapper: {
    backgroundColor: "rgba(218, 228, 253, 0.8)",
    height: W("35%"),
    width: W("35%"),
    borderRadius: W("17.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: H("2%"),
    position: "relative",
  },

  lockImage: {
    height: "60%",
    width: "60%",
  },

  checkBadge: {
    position: "absolute",
    bottom: H("0.5%"),
    right: W("5%"),
    backgroundColor: "#4CD964",
    height: W("8%"),
    width: W("8%"),
    borderRadius: W("4%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  infoContainer: {
    alignItems: "center",
    marginTop: H("3%"),
    marginBottom: H("2%"),
  },

  infoText: {
    fontSize: W("4%"),
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    lineHeight: H("2.5%"),
  },

  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: H("3%"),
  },

  inputLabel: {
    fontSize: W("4%"),
    fontWeight: "500",
    color: "#333333",
    alignSelf: "flex-start",
    marginLeft: W("8%"),
    marginBottom: H("0.5%"),
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    width: W("80%"),
    borderColor: "#E5E7EB",
    paddingVertical: Platform.OS === "ios" ? H("0.8%") : H("0.5%"),
  },

  input: {
    flex: 1,
    fontSize: W("4%"),
    color: "#000000",
    paddingVertical: 0,
  },

  eyeIcon: {
    paddingHorizontal: W("2%"),
  },

  strengthContainer: {
    width: W("80%"),
    marginTop: H("1%"),
    alignItems: "flex-start",
  },

  strengthBarContainer: {
    flexDirection: "row",
    gap: W("1%"),
    width: "100%",
    marginBottom: H("0.5%"),
  },

  strengthBar: {
    flex: 1,
    height: H("0.5%"),
    borderRadius: 2,
  },

  strengthText: {
    fontSize: W("3%"),
    fontWeight: "500",
    marginTop: H("0.3%"),
  },

  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: W("1.5%"),
    width: W("80%"),
    marginTop: H("1%"),
  },

  matchText: {
    fontSize: W("3.2%"),
    fontWeight: "500",
  },

  error: {
    color: "#FF3B30",
    fontSize: W("3.5%"),
    textAlign: "center",
    marginTop: H("2%"),
    fontWeight: "500",
  },

  saveButton: {
    marginTop: H("5%"),
    backgroundColor: "#FFD700",
    paddingVertical: H("1.8%"),
    width: W("65%"),
    borderRadius: W("4%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  saveButtonDisabled: {
    backgroundColor: "#F5E6A3",
    opacity: 0.8,
    shadowOpacity: 0,
    elevation: 0,
  },

  saveButtonText: {
    fontSize: W("4.5%"),
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },

  footerText: {
    fontSize: W("3%"),
    color: "#999999",
    textAlign: "center",
    marginTop: H("3%"),
  },
});