import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#6B6B6B",
  lightGray: "#D9D9D9",
  border: "#D9D9D9",
  error: "#E53935",
  success: "#2E7D32",
  blue: "rgba(0, 153, 255, 1)",
  yellow: "rgba(255, 215, 0, 1)",
  placeholder: "#9A9A9A",
  circleBg: "rgba(218, 228, 253, 1)",
  badgeBg: "rgba(103, 111, 116, 1)",
};

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.errorContainer}>
      <FontAwesome name="warning" size={12} color={COLORS.error} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const EmailField = ({
  value,
  onChangeText,
  onBlur,
  error,
  touched,
}) => {
  const showError = touched && !!error;
  const showSuccess = touched && !error && value.trim() !== "";

  return (
    <View style={styles.fieldBlock}>
      <View
        style={[
          styles.inputWrapper,
          showError ? styles.inputError : null,
          showSuccess ? styles.inputSuccess : null,
        ]}
      >
        <FontAwesome name="envelope" size={14} color={COLORS.black} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder="example@gmail.com"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>

      <ErrorMessage message={showError ? error : ""} />
    </View>
  );
};

const Forgetpassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validateEmail = (value) => {
    const emailValue = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) return "Please enter your email address";
    if (!emailRegex.test(emailValue)) return "Enter a valid email address";

    return "";
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    if (touched) {
      setError(validateEmail(text));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSend = () => {
    const validationError = validateEmail(email);
    setTouched(true);
    setError(validationError);

    if (!validationError) {
      navigation.navigate("VerifyCode");
    }
  };

  const isButtonEnabled = email.trim() !== "" && !validateEmail(email);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
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
          <Text style={styles.title}>Forgot Password</Text>

          <View style={styles.iconCircle}>
            <Image
              source={require("../../assets/icons/lock.png")}
              style={styles.lockImage}
              resizeMode="contain"
            />
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>?</Text>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>
              Please enter an email address to
            </Text>
            <Text style={styles.infoText}>
              receive a verification code.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <EmailField
              value={email}
              onChangeText={handleEmailChange}
              onBlur={handleBlur}
              error={error}
              touched={touched}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.tryAnotherButton}>
            <Text style={styles.tryAnotherText}>Try another way</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.sendButton,
              !isButtonEnabled ? styles.sendButtonDisabled : null,
            ]}
            disabled={!isButtonEnabled}
            onPress={handleSend}
          >
            <Text style={styles.sendButtonText}>Send Code</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerRow: {
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
    paddingTop: H("12%"),
    paddingBottom: H("5%"),
    paddingHorizontal: W("6%"),
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: W("7%"),
    color: COLORS.black,
    textAlign: "center",
    marginBottom: H("4%"),
  },
  iconCircle: {
    width: W("42%"),
    height: W("42%"),
    maxWidth: 180,
    maxHeight: 180,
    borderRadius: 999,
    backgroundColor: COLORS.circleBg,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: H("4%"),
    position: "relative",
  },
  lockImage: {
    width: W("28%"),
    height: W("28%"),
    maxWidth: 120,
    maxHeight: 120,
  },
  questionBadge: {
    position: "absolute",
    bottom: H("1.5%"),
    right: W("8%"),
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.badgeBg,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  infoBlock: {
    marginBottom: H("4%"),
  },
  infoText: {
    textAlign: "center",
    fontSize: W("4%"),
    color: COLORS.gray,
    lineHeight: H("2.8%"),
  },
  inputSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: H("2%"),
  },
  fieldBlock: {
    width: W("80%"),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: H("5.8%"),
    borderBottomWidth: 1.2,
    borderBottomColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    marginLeft: W("2.5%"),
    color: COLORS.black,
    fontSize: W("3.7%"),
    paddingVertical: Platform.OS === "ios" ? H("1.2%") : H("0.7%"),
  },
  inputError: {
    borderBottomColor: COLORS.error,
  },
  inputSuccess: {
    borderBottomColor: COLORS.success,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: H("0.8%"),
  },
  errorText: {
    color: COLORS.error,
    fontSize: W("3.2%"),
    marginLeft: 5,
    flex: 1,
  },
  tryAnotherButton: {
    marginTop: H("2%"),
    alignSelf: "center",
  },
  tryAnotherText: {
    color: COLORS.blue,
    fontSize: W("3.5%"),
    textDecorationLine: "underline",
  },
  sendButton: {
    marginTop: H("3%"),
    alignSelf: "center",
    width: W("70%"),
    maxWidth: 260,
    minHeight: H("5.8%"),
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: W("4%"),
  },
});