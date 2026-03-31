import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const Newpassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  // ✅ States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Validation
  const handleSave = () => {
    if (!password || !confirmPassword) {
      setError("Please fill both fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    props.navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: H("5%"), paddingHorizontal: W("5%") }}>
          {/* Heading */}
          <Text
            style={{
              fontWeight: "900",
              fontSize: Math.min(25, W("7%")),
              marginTop: H("2%"),
              alignSelf: "center",
              bottom: H("8%"),
            }}
          >
            Create New Password
          </Text>

          {/* Lock Circle */}
          <View
            style={{
              backgroundColor: "rgba(218, 228, 253, 1)",
              height: Math.min(160, W("40%")),
              width: Math.min(160, W("40%")),
              borderRadius: Math.min(80, W("20%")),
              marginTop: H("5%"),
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              bottom: H("10%"),
            }}
          >
            <Image
              source={require("../../assets/icons/lock.png")}
              style={{
                position: "absolute",
                height: Math.min(180, W("50%")),
                width: Math.min(180, W("50%")),
                alignSelf: "center",
                bottom: H("0%"),
              }}
              resizeMode="contain"
            />
            <Icon
              name="check"
              size={Math.min(14, W("4%"))}
              color="white"
              style={{
                backgroundColor: "rgba(103, 111, 116, 1)",
                height: Math.min(25, W("7%")),
                width: Math.min(25, W("7%")),
                borderRadius: Math.min(13, W("3.5%")),
                textAlign: "center",
                textAlignVertical: "center",
                position: "absolute",
                bottom: "27%",
                right: "25%",
              }}
            />
          </View>

          {/* Info */}
          <View style={{ alignItems: "center", marginTop: H("5%") ,bottom: H("10%")}}>
            <Text style={{ fontSize: Math.min(14, W("4%")) }}>Your new password must be</Text>
            <Text style={{ fontSize: Math.min(14, W("4%")), marginTop: H("0.3%") }}>different from previously</Text>
            <Text style={{ fontSize: Math.min(14, W("4%")), marginTop: H("0.3%") }}>used password</Text>
          </View>

          {/* Password */}
          <View style={{ alignItems: "center", marginTop: H("4%"),bottom: H("10%") }}>
            <Text style={{ right: W("12%"), fontSize: Math.min(14, W("4%")) }}>New Password</Text>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                width: W("55%"),
                borderColor: "rgba(217, 217, 217, 1)",
              }}
            >
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                style={{ flex: 1, fontSize: Math.min(13, W("3.5%")), paddingVertical: Platform.OS === "ios" ? H("0.8%") : H("0.5%") }}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye-slash" : "eye"} size={Math.min(13, W("3.5%"))} style={{ marginRight: W("2%") }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={{ alignItems: "center", marginTop: H("3%"),bottom: H("10%") }}>
            <Text style={{ right: W("12%"), fontSize: Math.min(14, W("4%")) }}>Confirm Password</Text>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                width: W("55%"),
                borderColor: "rgba(217, 217, 217, 1)",
              }}
            >
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError("");
                }}
                placeholder="Confirm password"
                secureTextEntry={!showconfirmPassword}
                style={{ flex: 1, fontSize: Math.min(13, W("3.5%")), paddingVertical: Platform.OS === "ios" ? H("0.8%") : H("0.5%") }}
              />

              <TouchableOpacity
                onPress={() => setShowconfirmPassword(!showconfirmPassword)}
              >
                <Icon name={showconfirmPassword ? "eye-slash" : "eye"} size={Math.min(13, W("3.5%"))} style={{ marginRight: W("2%") }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {error ? (
            <Text style={{ color: "red", alignSelf: "center", marginTop: H("2%"), fontSize: Math.min(12, W("3.5%")) }}>
              {error}
            </Text>
          ) : null}

          {/* Button */}
          <TouchableOpacity style={{ marginTop: H("4%") }} onPress={handleSave}>
            <Text
              style={{
                backgroundColor: "rgba(255, 236, 135, 1)",
                height: Math.max(30, H("5%")),
                width: Math.min(200, W("70%")),
                borderRadius: 10,
                textAlignVertical: "center",
                textAlign: "center",
                fontSize: Math.min(13, W("3.5%")),
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Save Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Newpassword;