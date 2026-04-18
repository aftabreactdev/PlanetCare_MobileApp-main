import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#777777",
  lightGray: "rgba(217, 217, 217, 1)",
  border: "#D9D9D9",
  danger: "#E53935",
  primary: "rgba(143, 0, 255, 1)",
  yellow: "rgba(255, 215, 0, 1)",
  blue: "rgba(0, 153, 255, 1)",
};

const SignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ui, setUi] = useState({
    showPassword: false,
    showConfirmPassword: false,
    isChecked: false,
    isLoading: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateFullName = (name) => {
    const value = name.trim();
    if (!value) return "Full name is required";
    if (value.length < 3) return "Full name must be at least 3 characters";
    if (value.length > 50) return "Full name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return "Full name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    const value = email.trim();
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    if (value.length > 100) return "Email must be less than 100 characters";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 50) return "Password must be less than 50 characters";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateTerms = (checked) => {
    return checked ? "" : "You must agree to the Terms & Conditions";
  };

  const updateField = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    if (touched[field]) {
      validateSingleField(field, updatedForm);
    }

    if (field === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(
          updatedForm.confirmPassword,
          updatedForm.password
        ),
      }));
    }
  };

  const validateSingleField = (field, currentForm = form) => {
    let message = "";

    switch (field) {
      case "fullName":
        message = validateFullName(currentForm.fullName);
        break;
      case "email":
        message = validateEmail(currentForm.email);
        break;
      case "password":
        message = validatePassword(currentForm.password);
        break;
      case "confirmPassword":
        message = validateConfirmPassword(
          currentForm.confirmPassword,
          currentForm.password
        );
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
    return message;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateSingleField(field);
  };

  const toggleTerms = () => {
    const newValue = !ui.isChecked;
    setUi((prev) => ({ ...prev, isChecked: newValue }));
    setErrors((prev) => ({ ...prev, terms: validateTerms(newValue) }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.confirmPassword,
        form.password
      ),
      terms: validateTerms(ui.isChecked),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    return Object.values(newErrors).every((item) => item === "");
  };

  const handleSignUp = async () => {
    const isValid = validateForm();

    if (!isValid) {
      const errorMessages = Object.values({
        fullName: validateFullName(form.fullName),
        email: validateEmail(form.email),
        password: validatePassword(form.password),
        confirmPassword: validateConfirmPassword(
          form.confirmPassword,
          form.password
        ),
        terms: validateTerms(ui.isChecked),
      }).filter(Boolean);

      Alert.alert("Validation Error", errorMessages.join("\n"));
      return;
    }

    try {
      setUi((prev) => ({ ...prev, isLoading: true }));

      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MoodSelection"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Sign Up Failed",
        error?.message || "An error occurred during sign up. Please try again."
      );
    } finally {
      setUi((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const renderInput = ({
    icon,
    label,
    value,
    onChangeText,
    onBlur,
    placeholder,
    error,
    touchedField,
    secureTextEntry = false,
    toggleSecure,
    keyboardType = "default",
    autoCapitalize = "sentences",
  }) => (
    <View style={styles.inputBlock}>
      <View style={styles.labelRow}>
        <Icon name={icon} size={14} color={COLORS.black} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View
        style={[
          styles.inputWrapper,
          error && touchedField ? styles.inputWrapperError : null,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9A9A9A"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {typeof toggleSecure === "function" && (
          <TouchableOpacity onPress={toggleSecure} activeOpacity={0.7}>
            <Icon
              name={secureTextEntry ? "eye" : "eye-slash"}
              size={15}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && touchedField ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
          stops={[0.1, 0.5, 0.7, 0.9]}
          center={[W("50%"), H("35%")]}
          radius={W("80%")}
          style={styles.gradient}
        />

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login1")}
            activeOpacity={0.8}
          >
            <Entypo name="cross" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill your information below or register with{"\n"}your social account
        </Text>

        <View style={styles.formCard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.formHeading}>Sign Up</Text>

            {renderInput({
              icon: "user",
              label: "Full Name",
              value: form.fullName,
              onChangeText: (text) => updateField("fullName", text),
              onBlur: () => handleBlur("fullName"),
              placeholder: "Daniel Park",
              error: errors.fullName,
              touchedField: touched.fullName,
            })}

            {renderInput({
              icon: "envelope",
              label: "Email",
              value: form.email,
              onChangeText: (text) => updateField("email", text),
              onBlur: () => handleBlur("email"),
              placeholder: "example@gmail.com",
              error: errors.email,
              touchedField: touched.email,
              keyboardType: "email-address",
              autoCapitalize: "none",
            })}

            {renderInput({
              icon: "lock",
              label: "Password",
              value: form.password,
              onChangeText: (text) => updateField("password", text),
              onBlur: () => handleBlur("password"),
              placeholder: "Enter password",
              error: errors.password,
              touchedField: touched.password,
              secureTextEntry: !ui.showPassword,
              toggleSecure: () =>
                setUi((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                })),
            })}

            {renderInput({
              icon: "lock",
              label: "Confirm Password",
              value: form.confirmPassword,
              onChangeText: (text) => updateField("confirmPassword", text),
              onBlur: () => handleBlur("confirmPassword"),
              placeholder: "Confirm password",
              error: errors.confirmPassword,
              touchedField: touched.confirmPassword,
              secureTextEntry: !ui.showConfirmPassword,
              toggleSecure: () =>
                setUi((prev) => ({
                  ...prev,
                  showConfirmPassword: !prev.showConfirmPassword,
                })),
            })}

            <View style={styles.termsRow}>
              <TouchableOpacity
                onPress={toggleTerms}
                activeOpacity={0.8}
                style={[
                  styles.checkbox,
                  ui.isChecked ? styles.checkboxChecked : null,
                  errors.terms ? styles.checkboxError : null,
                ]}
              >
                {ui.isChecked ? <Text style={styles.checkmark}>✓</Text> : null}
              </TouchableOpacity>

              <Text style={styles.termsText}>Agree with </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("TermsConditions")}
                activeOpacity={0.8}
              >
                <Text style={styles.termsLink}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>

            {errors.terms ? <Text style={styles.termsError}>{errors.terms}</Text> : null}

            <TouchableOpacity
              style={[styles.signUpButton, ui.isLoading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={ui.isLoading}
              activeOpacity={0.8}
            >
              {ui.isLoading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Google Sign Up", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Facebook Sign Up", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert("Apple Sign Up", "Coming soon!")}
              >
                <Image
                  source={require("../../assets/icons/apple.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.8}
              >
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
    height: H("100%"),
    borderRadius: H("20%"),
  },
  headerActions: {
    position: "absolute",
    top: H("5%"),
    width: W("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: W("5%"),
    zIndex: 5,
  },
  title: {
    position: "absolute",
    top: H("10%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("7%"),
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    position: "absolute",
    top: H("16%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("3.8%"),
    textAlign: "center",
    paddingHorizontal: W("8%"),
    lineHeight: H("2.8%"),
  },
  formCard: {
    position: "absolute",
    bottom: 0,
    width: W("100%"),
    height: H("74%"),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  formScrollContent: {
    paddingTop: H("3%"),
    paddingBottom: H("4%"),
    paddingHorizontal: W("8%"),
  },
  formHeading: {
    fontSize: W("6%"),
    fontWeight: "800",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: H("2%"),
  },
  inputBlock: {
    marginBottom: H("1.8%"),
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: H("0.7%"),
  },
  label: {
    marginLeft: W("2%"),
    fontSize: W("3.8%"),
    fontWeight: "700",
    color: COLORS.black,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    minHeight: H("5.5%"),
  },
  inputWrapperError: {
    borderColor: COLORS.danger,
  },
  input: {
    flex: 1,
    fontSize: W("3.7%"),
    color: COLORS.black,
    paddingVertical: Platform.OS === "ios" ? H("1.4%") : H("0.9%"),
    paddingRight: W("2%"),
  },
  errorText: {
    color: COLORS.danger,
    fontSize: W("3%"),
    marginTop: H("0.6%"),
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: H("1%"),
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#555",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: W("2%"),
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxError: {
    borderColor: COLORS.danger,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  termsText: {
    fontSize: W("3.5%"),
    color: COLORS.black,
  },
  termsLink: {
    fontSize: W("3.5%"),
    color: COLORS.blue,
    textDecorationLine: "underline",
  },
  termsError: {
    color: COLORS.danger,
    fontSize: W("3%"),
    marginTop: H("0.7%"),
  },
  signUpButton: {
    marginTop: H("3%"),
    alignSelf: "center",
    width: W("65%"),
    minHeight: H("6%"),
    backgroundColor: COLORS.yellow,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  signUpButtonText: {
    fontSize: W("4%"),
    fontWeight: "700",
    color: COLORS.black,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: H("2.5%"),
    marginBottom: H("2%"),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  dividerText: {
    marginHorizontal: W("3%"),
    fontSize: W("3.4%"),
    color: COLORS.gray,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: W("6%"),
    marginBottom: H("2.5%"),
  },
  socialIcon: {
    width: W("6%"),
    height: W("6%"),
    minWidth: 22,
    minHeight: 22,
    resizeMode: "contain",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footerText: {
    color: COLORS.gray,
    fontSize: W("3.4%"),
  },
  footerLink: {
    color: COLORS.blue,
    fontSize: W("3.4%"),
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});