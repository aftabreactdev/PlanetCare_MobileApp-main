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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reusable validation rules
  const validators = {
    fullName: (name) =>
      !name.trim()
        ? "Full name is required"
        : name.trim().length < 3
        ? "Minimum 3 characters"
        : name.trim().length > 50
        ? "Maximum 50 characters"
        : !/^[a-zA-Z\s]+$/.test(name.trim())
        ? "Only letters allowed"
        : "",

    email: (email) =>
      !email.trim()
        ? "Email is required"
        : !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email.trim())
        ? "Invalid email"
        : "",

    password: (pass) =>
      !pass
        ? "Password required"
        : pass.length < 6
        ? "Minimum 6 characters"
        : pass.length > 50
        ? "Maximum 50 characters"
        : "",

    confirmPassword: (val, original) =>
      !val
        ? "Please confirm password"
        : val !== original
        ? "Passwords do not match"
        : "",

    terms: (checked) => (!checked ? "You must accept Terms & Conditions" : ""),
  };

  // Reusable input component
  const InputField = ({
    label,
    icon,
    secure,
    toggleSecure,
    value,
    onChange,
    onBlur,
    error,
  }) => (
    <>
      <View style={styles.labelRow}>
        <FontAwesome name={icon} size={14} color="black" />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : "#D9D9D9" },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor="#989898"
          secureTextEntry={secure}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          autoCapitalize="none"
        />

        {toggleSecure && (
          <TouchableOpacity onPress={toggleSecure}>
            <FontAwesome
              name={secure ? "eye" : "eye-slash"}
              size={14}
              color="#666"
              style={{ marginRight: W("2%") }}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err = "";

    if (field === "confirmPassword") {
      err = validators.confirmPassword(form.confirmPassword, form.password);
    } else {
      err = validators[field](form[field]);
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validators.fullName(form.fullName),
      email: validators.email(form.email),
      password: validators.password(form.password),
      confirmPassword: validators.confirmPassword(
        form.confirmPassword,
        form.password
      ),
      terms: validators.terms(ui.isChecked),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the highlighted fields.");
      return;
    }

    setUi((prev) => ({ ...prev, isLoading: true }));

    setTimeout(() => {
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MoodSelection"),
        },
      ]);

      setUi((prev) => ({ ...prev, isLoading: false }));
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/Splashbackground.jpg")}
            style={styles.bgImage}
          />

          <RadialGradient
            colors={[
              "rgba(143,0,255,1)",
              "rgba(143,0,250,0.6)",
              "rgba(160,80,220,0.2)",
              "rgba(200,120,255,0)",
            ]}
            stops={[0.1, 0.5, 0.7, 0.9]}
            center={[W("50%"), H("35%")]}
            radius={W("80%")}
            style={styles.gradient}
          />

          {/* Header buttons */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill your information below or register with{"\n"}your social
            account
          </Text>

          {/* Card */}
          <View style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.cardTitle}>Sign Up</Text>

              {/* Full Name */}
              <InputField
                label="Full Name"
                icon="user"
                value={form.fullName}
                onChange={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    fullName: text,
                  }))
                }
                onBlur={() => handleBlur("fullName")}
                error={touched.fullName && errors.fullName}
              />

              {/* Email */}
              <InputField
                label="Email"
                icon="envelope"
                value={form.email}
                onChange={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    email: text,
                  }))
                }
                onBlur={() => handleBlur("email")}
                error={touched.email && errors.email}
              />

              {/* Password */}
              <InputField
                label="Password"
                icon="lock"
                secure={!ui.showPassword}
                toggleSecure={() =>
                  setUi((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                value={form.password}
                onChange={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    password: text,
                  }))
                }
                onBlur={() => handleBlur("password")}
                error={touched.password && errors.password}
              />

              {/* Confirm Password */}
              <InputField
                label="Confirm Password"
                icon="lock"
                secure={!ui.showConfirmPassword}
                toggleSecure={() =>
                  setUi((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
                value={form.confirmPassword}
                onChange={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                onBlur={() => handleBlur("confirmPassword")}
                error={touched.confirmPassword && errors.confirmPassword}
              />

              {/* Terms */}
              <View style={styles.termsRow}>
                <TouchableOpacity
                  onPress={() =>
                    setUi((prev) => ({
                      ...prev,
                      isChecked: !prev.isChecked,
                    }))
                  }
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: ui.isChecked
                        ? "rgba(143,0,255,1)"
                        : "transparent",
                      borderColor: errors.terms ? "red" : "#444",
                    },
                  ]}
                >
                  {ui.isChecked && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>

                <Text style={styles.termsText}>Agree with </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TermsConditions")}
                >
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              {errors.terms && (
                <Text style={styles.error}>{errors.terms}</Text>
              )}

              {/* Sign Up */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { opacity: ui.isLoading ? 0.7 : 1 },
                ]}
                onPress={handleSignUp}
                disabled={ui.isLoading}
              >
                {ui.isLoading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or sign up with</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Icons */}
              <View style={styles.socialRow}>
                {["google", "facebook", "apple"].map((icon, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Alert.alert(`${icon} Sign Up`, "Coming soon!")}
                  >
                    <Image
                      source={require(`../../assets/icons/${icon}.png`)}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.footerLink}> Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// -------------------- STYLES --------------------

const styles = StyleSheet.create({
  bgImage: {
    height: H("100%"),
    width: W("100%"),
    resizeMode: "cover",
    position: "absolute",
  },

  gradient: {
    position: "absolute",
    top: H("15%"),
    width: W("100%"),
    height: H("100%"),
  },

  topBar: {
    position: "absolute",
    top: H("3%"),
    width: W("100%"),
    paddingHorizontal: W("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    color: "white",
    position: "absolute",
    top: H("8%"),
    alignSelf: "center",
    fontSize: W("8%"),
    fontWeight: "bold",
  },

  subtitle: {
    color: "white",
    position: "absolute",
    top: H("14%"),
    alignSelf: "center",
    fontSize: W("4%"),
    fontStyle: "italic",
    textAlign: "center",
  },

  card: {
    backgroundColor: "white",
    height: H("75%"),
    width: W("100%"),
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: H("2%"),
  },

  cardTitle: {
    fontSize: W("7%"),
    alignSelf: "center",
    fontWeight: "900",
    marginBottom: H("1%"),
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    width: W("70%"),
    alignSelf: "center",
    marginTop: H("2%"),
  },

  label: {
    marginLeft: W("2%"),
    fontSize: W("4%"),
    fontWeight: "bold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: W("70%"),
    alignSelf: "center",
    borderBottomWidth: 1,
    marginTop: H("0.5%"),
  },

  input: {
    flex: 1,
    paddingVertical: H("1.2%"),
    fontSize: W("3.5%"),
  },

  error: {
    color: "red",
    width: W("70%"),
    alignSelf: "center",
    fontSize: W("3%"),
    marginTop: H("0.2%"),
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: W("75%"),
    alignSelf: "center",
    marginTop: H("2%"),
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: W("2%"),
  },

  checkmark: {
    color: "white",
    fontSize: 12,
  },

  termsText: {
    fontSize: W("3.5%"),
  },

  termsLink: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: W("3.5%"),
  },

  button: {
    backgroundColor: "rgba(255,215,0,1)",
    height: H("6%"),
    width: W("60%"),
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: H("3%"),
  },

  buttonText: {
    fontSize: W("4%"),
    fontWeight: "bold",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: W("60%"),
    alignSelf: "center",
    marginTop: H("2%"),
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },

  dividerText: {
    color: "gray",
    marginHorizontal: W("2%"),
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: W("5%"),
    marginTop: H("2%"),
  },

  socialIcon: {
    height: W("8%"),
    width: W("8%"),
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: H("2%"),
    marginBottom: H("2%"),
  },

  footerText: {
    color: "gray",
    fontSize: W("3.5%"),
  },

  footerLink: {
    color: "rgba(0,153,255,1)",
    textDecorationLine: "underline",
    fontSize: W("3.5%"),
  },
});

export default SignupScreen;
