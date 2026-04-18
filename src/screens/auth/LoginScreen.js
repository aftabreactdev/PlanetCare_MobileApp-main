import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#7A7A7A",
  lightGray: "#D9D9D9",
  border: "#D9D9D9",
  error: "#E53935",
  success: "#2E7D32",
  yellow: "rgba(255, 215, 0, 1)",
  blue: "rgba(0, 153, 255, 1)",
  placeholder: "#9A9A9A",
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

const InputField = ({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touchedField,
  secureTextEntry = false,
  toggleSecure = null,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) => {
  const showError = touchedField && !!error;
  const showSuccess = touchedField && !error && value.trim() !== "";

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.labelText}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          showError ? styles.inputError : null,
          showSuccess ? styles.inputSuccess : null,
        ]}
      >
        <FontAwesome name={icon} size={14} color={COLORS.black} />

        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />

        {toggleSecure ? (
          <TouchableOpacity activeOpacity={0.8} onPress={toggleSecure}>
            <FontAwesome
              name={secureTextEntry ? "eye" : "eye-slash"}
              size={14}
              color="#888"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <ErrorMessage message={showError ? error : ""} />
    </View>
  );
};

const Login1 = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [ui, setUi] = useState({
    showPassword: false,
    isLoading: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    const value = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return "Please enter your email address";
    if (!emailRegex.test(value)) return "Enter a valid email address";

    return "";
  };

  const validatePassword = (password) => {
    const value = password.trim();

    if (!value) return "Please enter your password";
    if (value.length < 6) return "Password must be at least 6 characters";

    return "";
  };

  const setFieldTouched = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validateSingleField = (field, updatedForm = form) => {
    let message = "";

    switch (field) {
      case "email":
        message = validateEmail(updatedForm.email);
        break;
      case "password":
        message = validatePassword(updatedForm.password);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const handleInputChange = (field, value) => {
    const updatedForm = {
      ...form,
      [field]: value,
    };

    setForm(updatedForm);

    if (touched[field]) {
      validateSingleField(field, updatedForm);
    }
  };

  const handleBlur = (field) => {
    setFieldTouched(field);
    validateSingleField(field);
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
    });

    return Object.values(newErrors).every((item) => item === "");
  };

  const handleLogin = async () => {
    const isValid = validateForm();

    if (!isValid) {
      Alert.alert(
        "Incomplete Information",
        "Please fix the highlighted fields before continuing."
      );
      return;
    }

    try {
      setUi((prev) => ({
        ...prev,
        isLoading: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("MainTabs", {
              screen: "Home",
            }),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setUi((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const isButtonEnabled =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    !validateEmail(form.email) &&
    !validatePassword(form.password);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Splashbackground.jpg")}
          style={styles.backgroundImage}
        />

        <RadialGradient
          colors={[
            "rgba(143, 0, 255, 1)",
            "rgba(143, 0, 250, 0.6)",
            "rgba(160, 80, 220, 0.2)",
            "rgba(200, 120, 255, 0)",
          ]}
          stops={[0.1, 0.6, 0.9, 1]}
          center={[W("50%"), H("25%")]}
          radius={W("55%")}
          style={styles.gradient}
        />

        <Text style={styles.mainTitle}>Login</Text>

        <Text style={styles.subTitle}>Hi welcome back,</Text>
        <Text style={styles.subTitleSecond}>you’ve been</Text>
        <Text style={styles.subTitleItalic}>missed</Text>

        <View style={styles.formCard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.formContent}
          >
            <Text style={styles.cardTitle}>Login</Text>

            <InputField
              icon="envelope"
              label="Email"
              placeholder="example@gmail.com"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touchedField={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              icon="lock"
              label="Password"
              placeholder="********"
              value={form.password}
              onChangeText={(text) => handleInputChange("password", text)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touchedField={touched.password}
              secureTextEntry={!ui.showPassword}
              toggleSecure={() =>
                setUi((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!isButtonEnabled || ui.isLoading}
              onPress={handleLogin}
              style={[
                styles.loginButton,
                !isButtonEnabled || ui.isLoading ? styles.buttonDisabled : null,
              ]}
            >
              {ui.isLoading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Google login", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Facebook login", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Apple login", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/apple.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login1;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: W("100%"),
    height: H("100%"),
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    top: H("15%"),
    alignSelf: "center",
    width: W("100%"),
    height: H("45%"),
    borderRadius: H("20%"),
  },
  mainTitle: {
    position: "absolute",
    top: H("12%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("9%"),
    fontWeight: "700",
    textAlign: "center",
  },
  subTitle: {
    position: "absolute",
    top: H("22%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("6%"),
    textAlign: "center",
  },
  subTitleSecond: {
    position: "absolute",
    top: H("26%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("6%"),
    textAlign: "center",
  },
  subTitleItalic: {
    position: "absolute",
    top: H("30%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("6%"),
    textAlign: "center",
    fontStyle: "italic",
  },
  formCard: {
    position: "absolute",
    top: H("40%"),
    width: W("100%"),
    height: H("60%"),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  formContent: {
    paddingTop: H("3%"),
    paddingBottom: H("5%"),
    paddingHorizontal: W("8%"),
  },
  cardTitle: {
    fontSize: W("6.5%"),
    alignSelf: "center",
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: H("2%"),
  },
  fieldBlock: {
    marginBottom: H("2%"),
  },
  labelText: {
    fontWeight: "700",
    color: COLORS.black,
    fontSize: W("3.7%"),
    marginBottom: H("0.8%"),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.2,
    borderBottomColor: COLORS.border,
    minHeight: H("5.8%"),
  },
  textInput: {
    flex: 1,
    marginLeft: W("2.5%"),
    color: COLORS.black,
    fontSize: W("3.7%"),
    paddingVertical: Platform.OS === "ios" ? H("1.4%") : H("0.8%"),
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
    marginTop: H("0.6%"),
  },
  errorText: {
    color: COLORS.error,
    fontSize: W("3.1%"),
    marginLeft: 5,
    flex: 1,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: H("0.5%"),
  },
  forgotText: {
    color: COLORS.blue,
    fontSize: W("3.2%"),
    textDecorationLine: "underline",
  },
  loginButton: {
    alignSelf: "center",
    width: W("70%"),
    minHeight: H("5.8%"),
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
    marginTop: H("2%"),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: W("4%"),
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: H("4%"),
    marginBottom: H("2.5%"),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  dividerText: {
    marginHorizontal: W("3%"),
    color: COLORS.gray,
    fontSize: W("3.4%"),
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: W("6%"),
    marginBottom: H("3%"),
  },
  socialIcon: {
    width: W("6%"),
    height: W("6%"),
    minWidth: 20,
    minHeight: 20,
    resizeMode: "contain",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: H("1%"),
  },
  footerText: {
    color: COLORS.gray,
    fontSize: W("3.4%"),
    opacity: 0.9,
  },
  footerLink: {
    color: COLORS.blue,
    fontSize: W("3.4%"),
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});