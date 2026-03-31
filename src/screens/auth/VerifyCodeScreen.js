import React, { useState, useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const Emailverification = (props) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const inputs = useRef([]);

  //  Handle input change
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return; // allow only numbers

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError("");

    //  Move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  //  Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  //  Validate OTP
  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter complete 4-digit code");
      return;
    }

    props.navigation.navigate("NewPassword");
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
          <Text style={{ fontWeight: "900", fontSize: Math.min(25, W("7%")), marginTop: H("2%"), alignSelf: "center",bottom: H("10%") }}>
            Verify Your Email
          </Text>

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
              source={require("../../assets/icons/massage.png")}
              style={{
                height: Math.min(180, W("30%")),
                width: Math.min(180, W("50%")),
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </View>
<View style={{
              alignSelf: "center",

              bottom: H("8%"),
            }}>  


               <Text style={{ alignSelf: "center", marginTop: H("5%"), fontSize: Math.min(14, W("4%")) }}>
            Please enter the 4 digit code
          </Text>
          <Text style={{ alignSelf: "center", marginTop: H("0.5%"), fontSize: Math.min(14, W("4%")) }}>
            sent to example@gmail.com
          </Text>
              
              
              
              </View>

         

          {/* OTP Inputs */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: H("5%"),
              gap: Math.max(10, W("4%")),
              bottom: H("8%"),
            }}
          >
            {otp.map((digit, i) => (
              <View key={i} style={{ alignItems: "center" }}>
                <TextInput
                  ref={(ref) => (inputs.current[i] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  secureTextEntry={true} 
                  style={{
                    backgroundColor: "rgba(255, 249, 218, 1)",
                    fontSize: Math.min(30, W("8%")),
                    width: Math.min(45, W("12%")),
                    height: Math.min(55, H("7%")),
                    textAlign: "center",
                    fontWeight: "900",
                    borderRadius: 8,
                  }}
                />
                <View
                  style={{
                    width: Math.min(35, W("9%")),
                    height: 3,
                    backgroundColor: "rgba(255, 215, 0, 1)",
                    borderRadius: 2,
                    marginTop: H("0.5%"),
                  }}
                />
              </View>
            ))}
          </View>

          {/* Error */}
          {error ? (
            <Text style={{ color: "red", alignSelf: "center", marginTop: H("4%"), fontSize: Math.min(12, W("3.5%")) }}>
              {error}
            </Text>
          ) : null}

          {/* Resend */}
          <TouchableOpacity style={{ marginTop: H("4%"),top: H("7%") }}>
            <Text
              style={{
                color: "rgba(0, 153, 255, 1)",
                fontSize: Math.min(12, W("3.5%")),
                textDecorationLine: "underline",
                alignSelf: "center",
              }}
            >
              Resend Code
            </Text>
          </TouchableOpacity>

          {/* Verify */}
          <TouchableOpacity style={{ marginTop: H("3%"),top: H("7%") }} onPress={handleVerify}>
            <Text
              style={{
                backgroundColor: "rgba(255, 215, 0, 1)",
                height: Math.max(30, H("5%")),
                width: Math.min(200, W("70%")),
                borderRadius: 10,
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
                alignSelf: "center",
                fontSize: Math.min(15, W("4%")),
              }}
            >
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Emailverification;