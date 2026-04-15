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
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

// Reusable Form Field Component
const FormField = ({
  label,
  icon,
  children,
  error,
  wrapperStyle = {},
  labelSize = 12,
}) => (
  <View style={{ marginTop: H("2%") }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        width: W("75%"),
        marginBottom: H("0.5%"),
      }}
    >
      {icon}
      <Text
        style={{
          fontWeight: "bold",
          marginLeft: W("2%"),
          fontSize: Math.min(labelSize, W("3.8%")),
        }}
      >
        {label}
      </Text>
    </View>

    <View style={wrapperStyle}>{children}</View>

    {error ? (
      <Text
        style={{
          color: "red",
          fontSize: Math.min(11, W("3.2%")),
          alignSelf: "center",
          marginTop: H("0.3%"),
        }}
      >
        {error}
      </Text>
    ) : null}
  </View>
);

const CompanyAdmin = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // -------- Validation -------- //
  const validateFullName = (name) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters";
    return "";
  };

  const validateCompanyName = (name) => {
    if (!name.trim()) return "Company name is required";
    if (name.length < 2) return "Company name must be at least 2 characters";
    return "";
  };

  const validateCompanyEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email";
    return "";
  };

  const validateCompanySize = (size) => {
    if (!size.trim()) return "Company size is required";
    const regex = /^(\d+-\d+|\d+\+|\d+)$/;
    if (!regex.test(size)) return "Use formats: 50-200, 100+, 50";
    return "";
  };

  const validatePassword = (pwd) => {
    if (!pwd) return "Password is required";
    if (pwd.length < 6) return "Minimum 6 characters";
    if (!/(?=.*[A-Z])/.test(pwd)) return "Must contain uppercase letter";
    if (!/(?=.*[a-z])/.test(pwd)) return "Must contain lowercase letter";
    if (!/(?=.*[0-9])/.test(pwd)) return "Must contain a number";
    if (!/(?=.*[!@#$%^&*])/.test(pwd)) return "Must contain special character";
    return "";
  };

  const validateConfirmPassword = (pwd, cpwd) => {
    if (!cpwd) return "Confirm your password";
    if (pwd !== cpwd) return "Passwords do not match";
    return "";
  };

  const validateTerms = () => {
    if (!isChecked) return "You must agree to the terms";
    return "";
  };

  const handleSignUp = async () => {
    const newErrors = {
      fullName: validateFullName(fullName),
      companyName: validateCompanyName(companyName),
      companyEmail: validateCompanyEmail(companyEmail),
      companySize: validateCompanySize(companySize),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      terms: validateTerms(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) {
      const firstError = Object.values(newErrors).find((e) => e);
      Alert.alert("Validation Error", firstError);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);

    Alert.alert("Success", "Account created!", [
      { text: "OK", onPress: () => navigation.navigate("MoodSelection") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Background Layer */}
        <View style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Image
            source={require("../../assets/images/Splashbackground.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          <RadialGradient
            colors={[
              "rgba(143, 0, 255, 1)",
              "rgba(143, 0, 250, 0.6)",
              "rgba(160, 80, 220, 0.2)",
              "rgba(200, 120, 255, 0.0)",
            ]}
            stops={[0.1, 0.5, 0.7, 0.9]}
            center={[W("50%"), H("32%")]}
            radius={W("80%")}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
        </View>

        {/* Top Nav */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: W("5%"),
            marginTop: H("4%"),
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={W("7%")} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Roleselection")}>
            <Entypo name="cross" size={W("7%")} color="white" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: W("8%"),
            fontWeight: "bold",
            marginTop: H("5%"),
          }}
        >
          Create Account
        </Text>

        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: W("4%"),
            fontStyle: "italic",
            marginTop: H("1%"),
            textAlign: "center",
          }}
        >
          Set up your Company on Planet Care
        </Text>

        {/* Card */}
        <View
          style={{
            backgroundColor: "white",
            marginTop: H("16%"),
            paddingBottom: H("5%"),
            paddingTop: H("3%"),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Text
            style={{
              fontSize: W("7%"),
              alignSelf: "center",
              fontWeight: "900",
              marginBottom: H("2%"),
            }}
          >
            Sign Up
          </Text>

          {/* Full Name */}
          <FormField
            label="Full Name"
            icon={<Icon name="user" size={W("4%")} color="black" />}
            error={errors.fullName}
          >
            <TextInput
              placeholder="Daniel Park"
              value={fullName}
              onChangeText={(t) => {
                setFullName(t);
                setErrors((e) => ({ ...e, fullName: validateFullName(t) }));
              }}
              style={{
                width: W("75%"),
                alignSelf: "center",
                borderBottomWidth: 1,
                borderColor: errors.fullName ? "red" : "#ddd",
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
          </FormField>

          {/* Company Name */}
          <FormField
            label="Company Name"
            icon={<Icon name="building-o" size={W("4%")} color="black" />}
            error={errors.companyName}
          >
            <TextInput
              placeholder="Planet Care Inc."
              value={companyName}
              onChangeText={(t) => {
                setCompanyName(t);
                setErrors((e) => ({ ...e, companyName: validateCompanyName(t) }));
              }}
              style={{
                width: W("75%"),
                alignSelf: "center",
                borderBottomWidth: 1,
                borderColor: errors.companyName ? "red" : "#ddd",
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
          </FormField>

          {/* Email */}
          <FormField
            label="Company Email"
            icon={<Icon name="envelope" size={W("4%")} color="black" />}
            error={errors.companyEmail}
          >
            <TextInput
              placeholder="example@gmail.com"
              value={companyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(t) =>
                setErrors((e) => ({
                  ...e,
                  companyEmail: validateCompanyEmail(t),
                }))
              }
              style={{
                width: W("75%"),
                alignSelf: "center",
                borderBottomWidth: 1,
                borderColor: errors.companyEmail ? "red" : "#ddd",
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
          </FormField>

          {/* Size */}
          <FormField
            label="Company Size"
            icon={<Ionicons name="people" size={W("4%")} color="black" />}
            error={errors.companySize}
          >
            <TextInput
              placeholder="50-200"
              value={companySize}
              onChangeText={(t) =>
                setErrors((e) => ({
                  ...e,
                  companySize: validateCompanySize(t),
                }))
              }
              style={{
                width: W("75%"),
                alignSelf: "center",
                borderBottomWidth: 1,
                borderColor: errors.companySize ? "red" : "#ddd",
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
          </FormField>

          {/* Password */}
          <FormField
            label="Set Password"
            icon={<Icon name="lock" size={W("4%")} color="black" />}
            error={errors.password}
            wrapperStyle={{
              flexDirection: "row",
              alignItems: "center",
              width: W("75%"),
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: errors.password ? "red" : "#ddd",
            }}
          >
            <TextInput
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setErrors((e) => ({ ...e, password: validatePassword(t) }));
              }}
              style={{
                flex: 1,
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={W("4.5%")}
                color="#666"
              />
            </TouchableOpacity>
          </FormField>

          {/* Confirm Password */}
          <FormField
            label="Confirm Password"
            icon={<Icon name="lock" size={W("4%")} color="black" />}
            error={errors.confirmPassword}
            wrapperStyle={{
              flexDirection: "row",
              alignItems: "center",
              width: W("75%"),
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: errors.confirmPassword ? "red" : "#ddd",
            }}
          >
            <TextInput
              placeholder="Confirm password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                setErrors((e) => ({
                  ...e,
                  confirmPassword: validateConfirmPassword(password, t),
                }));
              }}
              style={{
                flex: 1,
                paddingVertical: H("1%"),
                fontSize: W("4%"),
              }}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? "eye-slash" : "eye"}
                size={W("4.5%")}
                color="#666"
              />
            </TouchableOpacity>
          </FormField>

          {/* Terms */}
          <TouchableOpacity
            onPress={() => setIsChecked((prev) => !prev)}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: H("2%"),
              alignItems: "center",
              width: W("75%"),
            }}
          >
            <View
              style={{
                width: W("5%"),
                height: W("5%"),
                borderWidth: 1.5,
                borderColor: errors.terms ? "red" : "#444",
                borderRadius: 6,
                marginRight: W("2%"),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isChecked ? "rgba(143,0,255,1)" : "transparent",
              }}
            >
              {isChecked && <Text style={{ color: "white" }}>✔</Text>}
            </View>

            <Text style={{ fontSize: W("3.8%") }}>Agree with </Text>
            <Text
              style={{
                color: "blue",
                textDecorationLine: "underline",
                fontSize: W("3.8%"),
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>

          {errors.terms ? (
            <Text
              style={{
                color: "red",
                alignSelf: "center",
                marginTop: H("0.5%"),
                fontSize: W("3.2%"),
              }}
            >
              {errors.terms}
            </Text>
          ) : null}

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            style={{
              alignSelf: "center",
              marginTop: H("3%"),
              backgroundColor: "rgba(255, 215, 0, 1)",
              height: H("5.5%"),
              width: W("60%"),
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={{ fontSize: W("4.5%"), fontWeight: "bold" }}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              width: W("60%"),
              alignSelf: "center",
              alignItems: "center",
              marginTop: H("3%"),
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
            <Text
              style={{
                marginHorizontal: W("2%"),
                color: "gray",
                fontSize: W("3.5%"),
              }}
            >
              or sign up with
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
          </View>

          {/* Social */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: H("2%"),
              gap: W("8%"),
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/google.png")}
                style={{ height: W("8%"), width: W("8%") }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/facebook.png")}
                style={{ height: W("8%"), width: W("8%") }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/apple.png")}
                style={{ height: W("8%"), width: W("8%") }}
              />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: H("3%"),
            }}
          >
            <Text style={{ color: "gray", fontSize: W("3.5%") }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
              <Text
                style={{
                  color: "rgba(0,153,255,1)",
                  marginLeft: 4,
                  textDecorationLine: "underline",
                  fontSize: W("3.5%"),
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompanyAdmin;
