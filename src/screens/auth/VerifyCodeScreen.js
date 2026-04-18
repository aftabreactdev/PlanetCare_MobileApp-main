import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#6B6B6B",
  error: "#E53935",
  blue: "rgba(0,153,255,1)",
  yellow: "rgba(255,215,0,1)",
  lightBg: "rgba(218,228,253,1)",
  otpBg: "rgba(255,249,218,1)",
  otpUnderline: "rgba(255,215,0,1)",
};

const OtpInputBox = ({
  value,
  inputRef,
  onChangeText,
  onKeyPress,
}) => {
  return (
    <View style={styles.otpBox}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        keyboardType="number-pad"
        maxLength={1}
        secureTextEntry
        style={styles.otpInput}
        textAlign="center"
      />
      <View style={styles.otpUnderline} />
    </View>
  );
};

const Emailverification = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError("");

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete 4-digit verification code");
      return;
    }

    setError("");
    navigation.navigate("NewPassword");
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    inputs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Verify Your Email</Text>

          <View style={styles.iconCircle}>
            <Image
              source={require("../../assets/icons/massage.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoWrapper}>
            <Text style={styles.infoText}>
              Please enter the 4-digit code
            </Text>
            <Text style={styles.infoText}>
              sent to example@gmail.com
            </Text>
          </View>

          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <OtpInputBox
                key={index}
                value={digit}
                inputRef={(ref) => {
                  inputs.current[index] = ref;
                }}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleResend}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleVerify}
            style={styles.verifyButton}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Emailverification;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: "absolute",
    top: H("5%"),
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: W("5%"),
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: H("0.5%"),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: W("6%"),
    paddingTop: H("12%"),
    paddingBottom: H("6%"),
  },
  title: {
    fontSize: W("7%"),
    fontWeight: "800",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: H("4%"),
  },
  iconCircle: {
    width: W("40%"),
    height: W("40%"),
    maxWidth: 170,
    maxHeight: 170,
    borderRadius: 999,
    backgroundColor: COLORS.lightBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: H("4%"),
  },
  iconImage: {
    width: W("24%"),
    height: W("24%"),
    maxWidth: 110,
    maxHeight: 110,
  },
  infoWrapper: {
    marginBottom: H("4%"),
  },
  infoText: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: W("4%"),
    lineHeight: H("2.8%"),
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: W("4%"),
    marginBottom: H("2%"),
  },
  otpBox: {
    alignItems: "center",
  },
  otpInput: {
    width: W("12%"),
    height: H("7%"),
    minWidth: 42,
    minHeight: 52,
    backgroundColor: COLORS.otpBg,
    borderRadius: 10,
    fontSize: W("6%"),
    fontWeight: "900",
    color: COLORS.black,
  },
  otpUnderline: {
    width: W("9%"),
    minWidth: 30,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.otpUnderline,
    marginTop: H("0.7%"),
  },
  errorText: {
    color: COLORS.error,
    fontSize: W("3.4%"),
    textAlign: "center",
    marginTop: H("1%"),
  },
  resendButton: {
    marginTop: H("3%"),
  },
  resendText: {
    color: COLORS.blue,
    fontSize: W("3.5%"),
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  verifyButton: {
    marginTop: H("3%"),
    width: W("70%"),
    maxWidth: 260,
    height: H("6%"),
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonText: {
    color: COLORS.black,
    fontSize: W("4%"),
    fontWeight: "700",
  },
});