import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/Ionicons";

const SignupScreen = (props) => {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // State for UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });
  
  // State for touched fields (to show errors only after user interaction)
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) {
      return "Full name is required";
    }
    if (name.trim().length < 3) {
      return "Full name must be at least 3 characters";
    }
    if (name.trim().length > 50) {
      return "Full name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Full name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (email.trim().length > 100) {
      return "Email must be less than 100 characters";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password.length > 50) {
      return "Password must be less than 50 characters";
    }
    
    // Optional: Strong password validation
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!strongPasswordRegex.test(password)) {
    //   return "Password must contain at least one uppercase, one lowercase, one number and one special character";
    // }
    
    return "";
  };

  const validateConfirmPassword = (confirmPwd, originalPwd) => {
    if (!confirmPwd) {
      return "Please confirm your password";
    }
    if (confirmPwd !== originalPwd) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateTerms = (checked) => {
    if (!checked) {
      return "You must agree to the Terms & Conditions";
    }
    return "";
  };

  // Handle field changes with validation
  const handleFullNameChange = (text) => {
    setFullName(text);
    if (touched.fullName) {
      setErrors({ ...errors, fullName: validateFullName(text) });
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(text) });
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (touched.password) {
      setErrors({ ...errors, password: validatePassword(text) });
    }
    // Also re-validate confirm password if it has been touched
    if (touched.confirmPassword && confirmPassword) {
      setErrors({ 
        ...errors, 
        confirmPassword: validateConfirmPassword(confirmPassword, text),
        password: validatePassword(text)
      });
    } else {
      setErrors({ ...errors, password: validatePassword(text) });
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (touched.confirmPassword) {
      setErrors({ 
        ...errors, 
        confirmPassword: validateConfirmPassword(text, password) 
      });
    }
  };

  const handleTermsChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (errors.terms) {
      setErrors({ ...errors, terms: validateTerms(newChecked) });
    }
  };

  const handleFieldBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate field on blur
    switch(field) {
      case 'fullName':
        setErrors({ ...errors, fullName: validateFullName(fullName) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(email) });
        break;
      case 'password':
        setErrors({ ...errors, password: validatePassword(password) });
        break;
      case 'confirmPassword':
        setErrors({ ...errors, confirmPassword: validateConfirmPassword(confirmPassword, password) });
        break;
    }
  };

  // Validate all fields before submission
  const validateForm = () => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    const termsError = validateTerms(isChecked);
    
    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      terms: termsError,
    });
    
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    return !fullNameError && !emailError && !passwordError && !confirmPasswordError && !termsError;
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would make your actual API call
        // const response = await api.signup({ fullName, email, password });
        
        console.log("Sign up successful", { fullName, email });
        
        // Show success message
        Alert.alert(
          "Success",
          "Account created successfully!",
          [
            {
              text: "OK",
              onPress: () => props.navigation.navigate('MoodSelection')
            }
          ]
        );
      } catch (error) {
        // Handle API errors
        Alert.alert(
          "Sign Up Failed",
          error.message || "An error occurred during sign up. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // Show validation error summary
      const errorMessages = Object.values(errors).filter(error => error !== "");
      if (errorMessages.length > 0) {
        Alert.alert(
          "Validation Error",
          errorMessages.join("\n")
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Image 
            source={require("../../assets/images/Splashbackground.jpg")}
            style={{ height: H("100%"), width: W("100%") }}
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
            center={[W("50%"), H("35%")]}
            radius={W("80%")}
            style={{
              position: "absolute",
              top: H("15%"),
              alignSelf: "center",
              width: W("100%"),
              height: H("100%"),
              borderRadius: H("20%"),
            }}
          />
          
          <View style={{ flexDirection: "row", position: "absolute", width: W("100%"), justifyContent: "space-between", paddingHorizontal: W("5%") }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icons name="arrow-back" size={Math.min(24, W("6%"))} color="white" style={{ top: H("3%") }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login1')}>
              <Entypo name="cross" size={Math.min(24, W("6%"))} color="white" style={{ top: H("3%") }} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "white",
              position: "absolute",
              top: H("8%"),
              alignSelf: "center",
              fontSize: Math.min(30, W("8%")),
              fontWeight: "bold",
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              color: "white",
              position: "absolute",
              top: H("14%"),
              alignSelf: "center",
              fontSize: Math.min(15, W("4%")),
              fontStyle: "italic",
              textAlign: "center",
              paddingHorizontal: W("5%"),
            }}
          >
            Fill your information below or register with{"\n"}your social account
          </Text>

          {/* White Form Card */}
          <View
            style={{
              backgroundColor: "white",
              height: H("75%"),
              width: W("100%"),
              position: "absolute",
              bottom: H("0%"),
              borderTopEndRadius: 30,
              borderTopStartRadius: 30,
              alignSelf: "center",
              paddingBottom: H("0%"),
            }}
          >
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: H("0%") }}
            >
              <Text
                style={{
                  fontSize: Math.min(25, W("7%")),
                  alignSelf: "center",
                  fontWeight: "900",
                  marginTop: H("3%"),
                }}
              >
                Sign Up
              </Text>

              {/* Full Name Input */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: H("2%"),
                  alignSelf: "center",
                  width: W("70%"),
                }}
              >
                <Icon name="user" size={Math.min(14, W("4%"))} color="black" />
                <Text style={{ fontWeight: "bold", marginLeft: W("2%"), fontSize: Math.min(14, W("4%")) }}>Full Name</Text>
              </View>
              <TextInput
                style={{
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: errors.fullName && touched.fullName ? "red" : "rgba(217, 217, 217, 1)",
                  width: W("70%"),
                  fontSize: Math.min(13, W("3.5%")),
                  bottom: H("0.5%"),
                  paddingVertical: Platform.OS === "ios" ? H("1%") : H("0.5%"),
                }}
                placeholder="Daniel Park"
                value={fullName}
                onChangeText={handleFullNameChange}
                onBlur={() => handleFieldBlur('fullName')}
              />
              {errors.fullName && touched.fullName && (
                <Text style={{ color: "red", fontSize: Math.min(11, W("3%")), alignSelf: "center", marginTop: H("0.5%"), width: W("70%") }}>
                  {errors.fullName}
                </Text>
              )}

              {/* Email Input */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: H("2%"),
                  alignSelf: "center",
                  width: W("70%"),
                }}
              >
                <Icon name="envelope" size={Math.min(14, W("4%"))} color="black" />
                <Text style={{ fontWeight: "bold", marginLeft: W("2%"), fontSize: Math.min(14, W("4%")) }}>Email</Text>
              </View>
              <TextInput
                style={{
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: errors.email && touched.email ? "red" : "rgba(217, 217, 217, 1)",
                  width: W("70%"),
                  fontSize: Math.min(13, W("3.5%")),
                  bottom: H("0.5%"),
                  paddingVertical: Platform.OS === "ios" ? H("1%") : H("0.5%"),
                }}
                placeholder="example@gmail.com"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={() => handleFieldBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && touched.email && (
                <Text style={{ color: "red", fontSize: Math.min(11, W("3%")), alignSelf: "center", marginTop: H("0.5%"), width: W("70%") }}>
                  {errors.email}
                </Text>
              )}

              {/* Password Input */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: H("2%"),
                  alignSelf: "center",
                  width: W("70%"),
                }}
              >
                <Icon name="lock" size={Math.min(14, W("4%"))} color="black" />
                <Text style={{ fontWeight: "bold", marginLeft: W("2%"), fontSize: Math.min(14, W("4%")) }}>Password</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: errors.password && touched.password ? "red" : "rgba(217, 217, 217, 1)",
                  width: W("70%"),
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    paddingHorizontal: W("2%"),
                    paddingVertical: Platform.OS === "ios" ? H("1.5%") : H("0.8%"),
                    fontSize: Math.min(13, W("3.5%")),
                  }}
                  placeholder="Enter password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                  onBlur={() => handleFieldBlur('password')}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? "eye-slash" : "eye"}
                    size={Math.min(13, W("3.5%"))}
                    color="#888"
                    style={{ marginRight: W("2%") }}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={{ color: "red", fontSize: Math.min(11, W("3%")), alignSelf: "center", marginTop: H("0.5%"), width: W("70%") }}>
                  {errors.password}
                </Text>
              )}

              {/* Confirm Password Input */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: H("2%"),
                  alignSelf: "center",
                  width: W("70%"),
                }}
              >
                <Icon name="lock" size={Math.min(14, W("4%"))} color="black" />
                <Text style={{ fontWeight: "bold", marginLeft: W("2%"), fontSize: Math.min(14, W("4%")) }}>
                  Confirm Password
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: errors.confirmPassword && touched.confirmPassword ? "red" : "rgba(217, 217, 217, 1)",
                  width: W("70%"),
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    paddingHorizontal: W("3%"),
                    paddingVertical: Platform.OS === "ios" ? H("1.5%") : H("0.8%"),
                    fontSize: Math.min(13, W("3.5%")),
                  }}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  onBlur={() => handleFieldBlur('confirmPassword')}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? "eye-slash" : "eye"}
                    size={Math.min(13, W("3.5%"))}
                    color="#888"
                    style={{ marginRight: W("2%") }}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={{ color: "red", fontSize: Math.min(11, W("3%")), alignSelf: "center", marginTop: H("0.5%"), width: W("70%") }}>
                  {errors.confirmPassword}
                </Text>
              )}

              {/* Terms and Conditions */}
              <View style={{
                flexDirection: "row",
                left: W("10%"),
                top: H("1%"),
                alignItems: "center",
                flexWrap: "wrap",
                width: W("80%"),
              }}>
                <TouchableOpacity
                  onPress={handleTermsChange}
                  style={{
                    width: W("5%"),
                    height: W("5%"),
                    minWidth: 18,
                    minHeight: 18,
                    borderWidth: 1.5,
                    borderColor: errors.terms ? "red" : "#555",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: W("2%"),
                    borderRadius: 4,
                    backgroundColor: isChecked ? "rgba(143, 0, 255, 1)" : "transparent",
                  }}
                >
                  {isChecked && (
                    <Text style={{ fontSize: Math.min(12, W("3.5%")), color: "white" }}>✓</Text>
                  )}
                </TouchableOpacity>
                <Text style={{ fontSize: Math.min(13, W("3.5%")) }}>Agree with </Text>
                <TouchableOpacity onPress={() => {
                  // Navigate to Terms & Conditions screen
                  props.navigation.navigate('TermsConditions');
                }}>
                  <Text style={{ color: "blue", textDecorationLine: "underline", fontSize: Math.min(13, W("3.5%")) }}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.terms && (
                <Text style={{ color: "red", fontSize: Math.min(11, W("3%")), left: W("10%"), marginTop: H("0.5%") }}>
                  {errors.terms}
                </Text>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginTop: H("3%"),
                  backgroundColor: "rgba(255, 215, 0, 1)",
                  height: Math.max(40, H("6%")),
                  width: W("60%"),
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: isLoading ? 0.7 : 1,
                }}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={{ fontSize: Math.min(14, W("4%")), fontWeight: "bold" }}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: H("2%"),
                  width: W("60%"),
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "rgba(217, 217, 217, 1)",
                    marginHorizontal: W("2%"),
                  }}
                />
                <Text style={{ color: "gray", fontSize: Math.min(12, W("3.5%")) }}>or sign up with</Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "rgba(217, 217, 217, 1)",
                    marginHorizontal: W("2%"),
                  }}
                />
              </View>

              {/* Social Icons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: Math.max(10, W("5%")),
                  marginTop: H("2%"),
                }}
              >
                <TouchableOpacity onPress={() => {
                  // Handle Google sign up
                  Alert.alert("Google Sign Up", "Coming soon!");
                }}>
                  <Image
                    source={require("../../assets/icons/google.png")}
                    style={{ height: Math.max(20, W("5%")), width: Math.max(20, W("5%")) }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  // Handle Facebook sign up
                  Alert.alert("Facebook Sign Up", "Coming soon!");
                }}>
                  <Image
                    source={require("../../assets/icons/facebook.png")}
                    style={{ height: Math.max(20, W("5%")), width: Math.max(20, W("5%")) }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  // Handle Apple sign up
                  Alert.alert("Apple Sign Up", "Coming soon!");
                }}>
                  <Image
                    source={require("../../assets/icons/apple.png")}
                    style={{ height: Math.max(20, W("5%")), width: Math.max(20, W("5%")) }}
                  />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: H("2%"),
                  marginBottom: H("2%"),
                }}
              >
                <Text style={{ color: "gray", fontSize: Math.min(12, W("3.5%")) }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: "rgba(0, 153, 255, 1)",
                      fontSize: Math.min(12, W("3.5%")),
                      textDecorationLine: "underline",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;