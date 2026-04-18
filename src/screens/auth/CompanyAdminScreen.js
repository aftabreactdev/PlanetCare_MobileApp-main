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
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
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
  primary: "rgba(143, 0, 255, 1)",
  yellow: "rgba(255, 215, 0, 1)",
  blue: "rgba(0, 153, 255, 1)",
  placeholder: "#9A9A9A",
};

const CompanyAdmin = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    companyEmail: "",
    companySize: "",
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
    companyName: "",
    companyEmail: "",
    companySize: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    companyName: false,
    companyEmail: false,
    companySize: false,
    password: false,
    confirmPassword: false,
  });

  const validateFullName = (name) => {
    const value = name.trim();

    if (!value) return "Please enter your full name";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return "Only letters and spaces are allowed";
    }

    return "";
  };

  const validateCompanyName = (name) => {
    const value = name.trim();

    if (!value) return "Please enter your company name";
    if (value.length < 2) return "Company name must be at least 2 characters";
    if (value.length > 80) return "Company name must be less than 80 characters";

    return "";
  };

  const validateCompanyEmail = (email) => {
    const value = email.trim();

    if (!value) return "Please enter your company email address";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Enter a valid email address";
    }

    return "";
  };

  const validateCompanySize = (size) => {
    const value = size.trim();

    if (!value) return "Please enter your company size";

    const sizeRegex = /^(\d+-\d+|\d+\+|\d+)$/;
    if (!sizeRegex.test(value)) {
      return "Use a format like 50, 50-200, or 100+";
    }

    return "";
  };

  const validatePassword = (pwd) => {
    if (!pwd) return "Please enter your password";
    if (pwd.length < 6) return "Password must be at least 6 characters";
    if (!/(?=.*[A-Z])/.test(pwd)) {
      return "Password must include at least one uppercase letter";
    }
    if (!/(?=.*[a-z])/.test(pwd)) {
      return "Password must include at least one lowercase letter";
    }
    if (!/(?=.*[0-9])/.test(pwd)) {
      return "Password must include at least one number";
    }
    if (!/(?=.*[!@#$%^&*])/.test(pwd)) {
      return "Password must include one special character";
    }

    return "";
  };

  const validateConfirmPassword = (pwd, confirmPwd) => {
    if (!confirmPwd) return "Please confirm your password";
    if (pwd !== confirmPwd) return "Passwords do not match";
    return "";
  };

  const validateTerms = (checked) => {
    return checked ? "" : "Please accept the Terms & Conditions";
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
      case "fullName":
        message = validateFullName(updatedForm.fullName);
        break;
      case "companyName":
        message = validateCompanyName(updatedForm.companyName);
        break;
      case "companyEmail":
        message = validateCompanyEmail(updatedForm.companyEmail);
        break;
      case "companySize":
        message = validateCompanySize(updatedForm.companySize);
        break;
      case "password":
        message = validatePassword(updatedForm.password);
        break;
      case "confirmPassword":
        message = validateConfirmPassword(
          updatedForm.password,
          updatedForm.confirmPassword
        );
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

    if (field === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(
          updatedForm.password,
          updatedForm.confirmPassword
        ),
      }));
    }
  };

  const handleBlur = (field) => {
    setFieldTouched(field);
    validateSingleField(field);
  };

  const handleTermsChange = () => {
    const nextChecked = !ui.isChecked;

    setUi((prev) => ({
      ...prev,
      isChecked: nextChecked,
    }));

    setErrors((prev) => ({
      ...prev,
      terms: validateTerms(nextChecked),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      companyName: validateCompanyName(form.companyName),
      companyEmail: validateCompanyEmail(form.companyEmail),
      companySize: validateCompanySize(form.companySize),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
      terms: validateTerms(ui.isChecked),
    };

    setErrors(newErrors);

    setTouched({
      fullName: true,
      companyName: true,
      companyEmail: true,
      companySize: true,
      password: true,
      confirmPassword: true,
    });

    return Object.values(newErrors).every((item) => item === "");
  };

  const handleSignUp = async () => {
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
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setUi((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={14} color={COLORS.error} />
        <Text style={styles.errorText}>{message}</Text>
      </View>
    );
  };

  const InputField = ({
    iconFamily = "fontawesome",
    icon,
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    touchedField,
    keyboardType = "default",
    autoCapitalize = "sentences",
    secureTextEntry = false,
    toggleSecure = null,
  }) => {
    const showError = touchedField && !!error;
    const showSuccess = touchedField && !error && value.trim() !== "";

    return (
      <View style={styles.fieldBlock}>
        <View style={styles.labelRow}>
          {iconFamily === "ionicons" ? (
            <Ionicons name={icon} size={14} color={COLORS.black} />
          ) : (
            <FontAwesome name={icon} size={14} color={COLORS.black} />
          )}
          <Text style={styles.labelText}>{label}</Text>
        </View>

        <View
          style={[
            styles.inputWrapper,
            showError ? styles.inputError : null,
            showSuccess ? styles.inputSuccess : null,
          ]}
        >
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
                size={15}
                color="#888"
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <ErrorMessage message={showError ? error : ""} />
      </View>
    );
  };

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
          stops={[0.1, 0.5, 0.7, 0.9]}
          center={[W("50%"), H("35%")]}
          radius={W("80%")}
          style={styles.gradient}
        />

        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
          >
            <Entypo name="cross" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.mainTitle}>Create Account</Text>

        <Text style={styles.subTitle}>
          Set up your Company on{"\n"}Planet Care
        </Text>

        <View style={styles.formCard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.formContent}
          >
            <Text style={styles.cardTitle}>Sign Up</Text>

            <InputField
              icon="user"
              label="Full Name"
              placeholder="Daniel Park"
              value={form.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touchedField={touched.fullName}
            />

            <InputField
              icon="building-o"
              label="Company Name"
              placeholder="Planet Care Inc."
              value={form.companyName}
              onChangeText={(text) => handleInputChange("companyName", text)}
              onBlur={() => handleBlur("companyName")}
              error={errors.companyName}
              touchedField={touched.companyName}
            />

            <InputField
              icon="envelope"
              label="Company Email"
              placeholder="example@gmail.com"
              value={form.companyEmail}
              onChangeText={(text) => handleInputChange("companyEmail", text)}
              onBlur={() => handleBlur("companyEmail")}
              error={errors.companyEmail}
              touchedField={touched.companyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              iconFamily="ionicons"
              icon="people"
              label="Company Size"
              placeholder="50-200"
              value={form.companySize}
              onChangeText={(text) => handleInputChange("companySize", text)}
              onBlur={() => handleBlur("companySize")}
              error={errors.companySize}
              touchedField={touched.companySize}
            />

            <InputField
              icon="lock"
              label="Set Password"
              placeholder="Enter password"
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

            <InputField
              icon="lock"
              label="Confirm Password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touchedField={touched.confirmPassword}
              secureTextEntry={!ui.showConfirmPassword}
              toggleSecure={() =>
                setUi((prev) => ({
                  ...prev,
                  showConfirmPassword: !prev.showConfirmPassword,
                }))
              }
            />

            <View style={styles.termsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleTermsChange}
                style={[
                  styles.checkbox,
                  ui.isChecked ? styles.checkboxChecked : null,
                  errors.terms ? styles.checkboxError : null,
                ]}
              >
                {ui.isChecked ? <Text style={styles.checkmark}>✓</Text> : null}
              </TouchableOpacity>

              <Text style={styles.termsText}>I agree with </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("TermsConditions")}
              >
                <Text style={styles.termsLink}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>

            <ErrorMessage message={errors.terms} />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSignUp}
              disabled={ui.isLoading}
              style={[
                styles.signUpButton,
                ui.isLoading ? styles.buttonDisabled : null,
              ]}
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
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require("../../assets/icons/apple.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login1")}
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

export default CompanyAdmin;

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
    top: H("0%"),
    alignSelf: "center",
    width: W("100%"),
    height: H("60%"),
    borderRadius: 0,
  },
  headerRow: {
    position: "absolute",
    top: H("5%"),
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: W("5%"),
  },
  mainTitle: {
    position: "absolute",
    top: H("8%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("7%"),
    fontWeight: "700",
    textAlign: "center",
    zIndex: 10,
  },
  subTitle: {
    position: "absolute",
    top: H("14%"),
    alignSelf: "center",
    color: COLORS.white,
    fontSize: W("3.8%"),
    textAlign: "center",
    lineHeight: H("2.8%"),
    paddingHorizontal: W("8%"),
    zIndex: 10,
  },
  formCard: {
    marginTop: H("22%"),
    width: W("100%"),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: H("5%"),
    minHeight: H("78%"),
  },
  formContent: {
    paddingTop: H("3%"),
    paddingBottom: H("4%"),
    paddingHorizontal: W("8%"),
  },
  cardTitle: {
    fontSize: W("6.3%"),
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.black,
    marginBottom: H("2%"),
  },
  fieldBlock: {
    marginBottom: H("1.8%"),
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: H("0.7%"),
  },
  labelText: {
    marginLeft: W("2%"),
    fontSize: W("3.7%"),
    fontWeight: "700",
    color: COLORS.black,
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
    fontSize: W("3.7%"),
    color: COLORS.black,
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
    marginLeft: 4,
    flex: 1,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: H("0.8%"),
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
    borderColor: COLORS.error,
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
    fontWeight: "600",
  },
  signUpButton: {
    alignSelf: "center",
    width: W("65%"),
    minHeight: H("6%"),
    marginTop: H("3%"),
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
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
    color: COLORS.gray,
    fontSize: W("3.4%"),
    textAlign: "center",
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