import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const Forgetpassword = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // ✅ Validate Email
  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSend = () => {
    if (validateEmail()) {
      props.navigation.navigate("VerifyCode");
    }
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
          {/* Title */}
          <Text
            style={{
              fontWeight: "900",
              fontSize: Math.min(25, W("7%")),
              marginTop: H("2%"),
              alignSelf: "center",
              bottom: H("14%"),
            }}
          >
            Forgot Password
          </Text>

          {/* Icon */}
          <View
            style={{
              backgroundColor: "rgba(218, 228, 253, 1)",
              height: Math.min(180, W("45%")),
              width: Math.min(180, W("45%")),
              borderRadius: Math.min(90, W("22.5%")),
              marginTop: H("5%"),
              alignSelf: "center",
              bottom: H("10%"),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/lock.png")}
              style={{
                height: Math.min(140, W("45%")),
                width: Math.min(140, W("45%")),
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                backgroundColor: "rgba(103, 111, 116, 1)",
                color: "white",
                height: Math.min(28, W("7%")),
                width: Math.min(28, W("7%")),
                borderRadius: Math.min(14, W("3.5%")),
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
                fontSize: Math.min(16, W("4.5%")),
                position: "absolute",
                bottom: H("6%"),
                right: W("14%"),
              }}
            >
              ?
            </Text>
          </View >
          <View
            style={{
              bottom: H("10%"),
            }}
          >
            {/* Info Text */}
            <Text style={{ alignSelf: "center", marginTop: H("5%"), fontSize: Math.min(15, W("4%")),fontFamily: "Poppins-Regular", }}>
              Please enter an email address to
            </Text>
            <Text style={{ alignSelf: "center", marginTop: H("0.5%"), fontSize: Math.min(15, W("4%")),fontFamily: "Poppins-Regular", }}>
              receive a verification code.
            </Text>
          </View>


          {/* Email Input */}
          <View
            style={{
              flexDirection: "row",
              marginTop: H("5%"),
              alignSelf: "center",
              gap: W("2%"),
              width: W("80%"),
              justifyContent: "center",
              bottom: H("10%"),
            }}
          >
            <Icon name="envelope" size={Math.min(12, W("3.5%"))} color="black" style={{ top: H("1%") }} />

            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(""); // clear error while typing
              }}
              placeholder="example@gmail.com"
              style={{
                borderBottomWidth: 1,
                borderColor: "rgba(217, 217, 217, 1)",
                width: W("60%"),
                fontSize: Math.min(13, W("3.5%")),
                paddingVertical: Platform.OS === "ios" ? H("0.5%") : H("0.3%"),
              }}
            />
          </View>

          {/*  Error Message */}
          {error ? (
            <Text style={{ color: "red", marginTop: H("2%"), alignSelf: "center", fontSize: Math.min(12, W("3.5%")) }}>
              {error}
            </Text>
          ) : null}

          {/* Try Another Way */}
          <TouchableOpacity style={{ marginTop: H("3%") }}>
            <Text
              style={{
                color: "rgba(0, 153, 255, 1)",
                fontSize: Math.min(12, W("3.5%")),
                textDecorationLine: "underline",
                alignSelf: "center",
              }}
            >
              Try another way
            </Text>
          </TouchableOpacity>

          {/* Button */}
          <TouchableOpacity
            style={{ marginTop: H("3%") }}
            onPress={handleSend}
          >
            <Text
              style={{
                backgroundColor: "rgba(255, 215, 0, 1)",
                height: Math.max(30, H("5%")),
                width: Math.min(200, W("70%")),
                borderRadius: 10,
                textAlignVertical: "center",
                textAlign: "center",
                fontSize: Math.min(15, W("4%")),
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Send Code
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forgetpassword;