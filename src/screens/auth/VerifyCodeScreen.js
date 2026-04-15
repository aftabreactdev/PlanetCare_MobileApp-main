import React, { useState, useRef, useEffect } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const Emailverification = (props) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [email, setEmail] = useState("example@gmail.com"); // Dynamic email from route params

  const inputs = useRef([]);
  let timerRef = useRef(null);

  // Get email from navigation params if available
  useEffect(() => {
    const routeEmail = props.route?.params?.email;
    if (routeEmail) {
      setEmail(routeEmail);
    }
  }, [props.route?.params?.email]);

  // Countdown timer for resend code
  useEffect(() => {
    if (resendCountdown > 0) {
      timerRef.current = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendCountdown]);

  // Handle input change
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return; // allow only numbers

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError("");

    // Move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }

    // Auto-submit when all digits are filled
    if (text && index === 3 && newOtp.every((digit) => digit !== "")) {
      handleVerify();
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Handle paste event for OTP
  const handlePaste = (text, index) => {
    if (text.length === 4 && /^\d{4}$/.test(text)) {
      const newOtp = text.split("");
      setOtp(newOtp);
      setError("");
      // Auto-submit after paste
      setTimeout(() => handleVerify(), 100);
      // Focus last input
      if (inputs.current[3]) {
        inputs.current[3].focus();
      }
    }
  };

  // Validate OTP
  const handleVerify = async () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter complete 4-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate API call for OTP verification
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // For demo purposes, any 4-digit code works
      // In real app, verify with backend
      console.log("Verifying OTP:", otp.join(""));
      props.navigation.navigate("NewPassword", { email });
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend verification code
  const handleResend = async () => {
    if (resendCountdown > 0) return;

    setResendCountdown(30); // 30 seconds cooldown
    setError("");

    // Simulate API call for resend
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Code Sent", `A new verification code has been sent to ${email}`);
      // Reset OTP inputs
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
      setResendCountdown(0);
    }
  };

  // Handle edit email
  const handleEditEmail = () => {
    props.navigation.goBack();
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify Your Email</Text>

        {/* Icon Section */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../assets/icons/massage.png")}
            style={styles.messageImage}
            resizeMode="contain"
          />
          <View style={styles.badgeDot} />
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>Please enter the 4 digit code</Text>
        <View style={styles.emailRow}>
          <Text style={styles.emailText}>sent to {email}</Text>
          <TouchableOpacity onPress={handleEditEmail}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, i) => (
            <View key={i} style={styles.otpInputWrapper}>
              <TextInput
                ref={(ref) => (inputs.current[i] = ref)}
                value={digit}
                onChangeText={(text) => handleChange(text, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                onPaste={(e) => {
                  const pastedText = e.nativeEvent.text;
                  handlePaste(pastedText, i);
                }}
                keyboardType="number-pad"
                maxLength={1}
                secureTextEntry={false}
                style={[styles.otpInput, digit && styles.otpInputFilled]}
                selectionColor="#FFD700"
                editable={!isVerifying}
              />
              <View style={[styles.otpUnderline, digit && styles.otpUnderlineFilled]} />
            </View>
          ))}
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Resend Code */}
        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResend}
          disabled={resendCountdown > 0 || isVerifying}
        >
          <Text
            style={[
              styles.resendText,
              (resendCountdown > 0 || isVerifying) && styles.resendTextDisabled,
            ]}
          >
            {resendCountdown > 0 ? `Resend Code (${resendCountdown}s)` : "Resend Code"}
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, (otp.some((digit) => digit === "") || isVerifying) && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={otp.some((digit) => digit === "") || isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Emailverification;

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

  messageImage: {
    height: "60%",
    width: "60%",
  },

  badgeDot: {
    position: "absolute",
    bottom: H("1%"),
    right: W("3%"),
    width: W("4%"),
    height: W("4%"),
    borderRadius: W("2%"),
    backgroundColor: "#4CD964",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  infoText: {
    fontSize: W("4%"),
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    marginTop: H("2%"),
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: W("2%"),
    marginTop: H("0.5%"),
  },

  emailText: {
    fontSize: W("4%"),
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
  },

  editLink: {
    fontSize: W("3.8%"),
    fontWeight: "600",
    color: "#007AFF",
    textDecorationLine: "underline",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: W("4%"),
    marginTop: H("5%"),
    marginBottom: H("2%"),
  },

  otpInputWrapper: {
    alignItems: "center",
  },

  otpInput: {
    backgroundColor: "#FFFFFF",
    fontSize: W("8%"),
    width: W("14%"),
    height: W("16%"),
    textAlign: "center",
    fontWeight: "700",
    color: "#000000",
    borderRadius: W("3%"),
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    padding: 0,
  },

  otpInputFilled: {
    borderColor: "#FFD700",
    backgroundColor: "#FFFDF5",
  },

  otpUnderline: {
    width: W("8%"),
    height: 3,
    backgroundColor: "#E5E7EB",
    borderRadius: 1.5,
    marginTop: H("0.8%"),
  },

  otpUnderlineFilled: {
    backgroundColor: "#FFD700",
  },

  error: {
    color: "#FF3B30",
    fontSize: W("3.5%"),
    textAlign: "center",
    marginTop: H("1.5%"),
    fontWeight: "500",
  },

  resendContainer: {
    marginTop: H("3%"),
  },

  resendText: {
    color: "#007AFF",
    fontSize: W("4%"),
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  resendTextDisabled: {
    color: "#A0A0A0",
    textDecorationLine: "none",
  },

  verifyButton: {
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

  verifyButtonDisabled: {
    backgroundColor: "#F5E6A3",
    opacity: 0.8,
    shadowOpacity: 0,
    elevation: 0,
  },

  verifyButtonText: {
    fontSize: W("4.5%"),
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
});