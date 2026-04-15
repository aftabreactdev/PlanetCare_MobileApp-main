import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const Login1 = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";

    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Minimum 6 characters required";

    return "";
  };

  const handleEmailChange = (t) => {
    setEmail(t);
    setEmailError(validateEmail(t));
  };

  const handlePasswordChange = (t) => {
    setPassword(t);
    setPasswordError(validatePassword(t));
  };

  const isFormValid =
    email && password && !validateEmail(email) && !validatePassword(password);

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailErr = validateEmail(trimmedEmail);
    const passErr = validatePassword(trimmedPassword);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) {
      Alert.alert("Error", emailErr || passErr);
      return;
    }

    Alert.alert("Success", "Login Successful!");
    props.navigation.navigate("MainTabs", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={styles.background}
      />

      {/* Radial overlay */}
      <RadialGradient
        colors={[
          "rgba(143, 0, 255, 1)",
          "rgba(143, 0, 250, 0.6)",
          "rgba(160, 80, 220, 0.2)",
          "rgba(200, 120, 255, 0.0)",
        ]}
        stops={[0.1, 0.6, 0.9, 1]}
        center={[200, 200]}
        radius={200}
        style={styles.gradient}
      />

      {/* Header */}
      <Text style={styles.mainTitle}>Login</Text>
      <Text style={styles.subtitle}>Hi Welcome back,</Text>
      <Text style={styles.subtitle2}>you’ve been</Text>
      <Text style={styles.subtitleItalic}>missed</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <View
            style={[
              styles.inputRow,
              { borderColor: emailError ? "red" : "#ccc" },
            ]}
          >
            <Icon name="envelope" size={12} />
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        {/* Password */}
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <Text style={styles.label}>Password</Text>

          <View
            style={[
              styles.inputRow,
              { borderColor: passwordError ? "red" : "#ccc" },
            ]}
          >
            <Icon name="lock" size={14} />
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Icon name={showPassword ? "eye-slash" : "eye"} size={14} />
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ForgotPassword")}
          style={styles.forgotBtn}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handleLogin}
          style={[
            styles.loginBtnWrapper,
            { opacity: isFormValid ? 1 : 0.5 },
          ]}
        >
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerWrapper}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or login with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social login */}
      <View style={styles.socialWrapper}>
        <TouchableOpacity onPress={() => Alert.alert("Google login", "Coming soon!")}>
          <Image
            source={require("../../assets/icons/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert("Facebook login", "Coming soon!")}>
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert("Apple login", "Coming soon!")}>
          <Image
            source={require("../../assets/icons/apple.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text style={styles.footerLink}>sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login1;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { height: H("100%"), width: W("100%") },
  gradient: {
    position: "absolute",
    top: H("15%"),
    alignSelf: "center",
    width: W("100%"),
    height: H("45%"),
    borderRadius: H("20%"),
  },

  mainTitle: {
    color: "white",
    position: "absolute",
    top: H("15%"),
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    position: "absolute",
    top: H("25%"),
    fontSize: 25,
    alignSelf: "center",
  },
  subtitle2: {
    color: "white",
    position: "absolute",
    top: H("29%"),
    fontSize: 25,
    alignSelf: "center",
  },
  subtitleItalic: {
    color: "white",
    position: "absolute",
    top: H("33%"),
    fontSize: 25,
    alignSelf: "center",
    fontStyle: "italic",
  },

  card: {
    backgroundColor: "white",
    height: H("70%"),
    width: W("100%"),
    alignSelf: "center",
    position: "absolute",
    top: H("40%"),
    borderRadius: 30,
    paddingTop: 20,
  },
  cardTitle: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "900",
  },

  inputContainer: { marginTop: 10, paddingHorizontal: 20 },
  label: { fontWeight: "bold" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginTop: 5,
  },
  input: { flex: 1, marginLeft: 10 },
  errorText: { color: "red", fontSize: 11, marginTop: 3 },

  forgotBtn: {
    marginTop: 10,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  forgotText: { color: "#0099ff", fontSize: 12 },

  loginBtnWrapper: {
    marginTop: 10,
    alignSelf: "center",
  },
  loginBtn: {
    backgroundColor: "gold",
    height: H("5%"),
    width: W("70%"),
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontWeight: "bold",
  },

  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    position: "absolute",
    top: H("85%"),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(217,217,217,1)",
    marginHorizontal: 10,
  },
  dividerText: { color: "gray", fontSize: 12 },

  socialWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    position: "absolute",
    top: H("90%"),
    alignSelf: "center",
  },
  socialIcon: { height: 20, width: 20 },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 20,
  },
  footerText: { color: "gray", opacity: 0.7 },
  footerLink: {
    color: "rgba(0,153,255,1)",
    fontSize: 11,
    textDecorationLine: "underline",
  },
});
