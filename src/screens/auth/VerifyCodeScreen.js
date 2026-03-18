import React, { useState, useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

const Emailverification = (props) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const inputs = useRef([]);

  // ✅ Handle input change
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return; // allow only numbers

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError("");

    // 👉 Move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  // ✅ Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // ✅ Validate OTP
  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter complete 4-digit code");
      return;
    }

    props.navigation.navigate("NewPassword");
  };

  return (
    <View>
      <Text style={{ fontWeight: "900", fontSize: 25, marginTop: 20, alignSelf: "center" }}>
        Verify Your Email
      </Text>

      <View
        style={{
          backgroundColor: "rgba(218, 228, 253, 1)",
          height: 160,
          width: 160,
          borderRadius: 80,
          top: 30,
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../assets/icons/massage.png")}
          style={{
            position: "absolute",
            height: 120,
            width: 80,
            alignSelf: "center",
            top: 20,
          }}
        />
      </View>

      <Text style={{ alignSelf: "center", top: 40 }}>Please enter the 4 digit code</Text>
      <Text style={{ alignSelf: "center", top: 45 }}>sent to example@gmail.com</Text>

      {/* OTP Inputs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          top: 60,
          gap: 15,
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
              secureTextEntry={true} // ⭐ this makes stars
              style={{
                backgroundColor: "rgba(255, 249, 218, 1)",
                fontSize: 30,
                width: 45,
                height: 55,
                textAlign: "center",
                fontWeight: "900",
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 35,
                height: 3,
                backgroundColor: "rgba(255, 215, 0, 1)",
                borderRadius: 2,
              }}
            />
          </View>
        ))}
      </View>

      {/* ❌ Error */}
      {error ? (
        <Text style={{ color: "red", alignSelf: "center", marginTop: 80 }}>
          {error}
        </Text>
      ) : null}

      {/* Resend */}
      <TouchableOpacity>
        <Text
          style={{
            color: "rgba(0, 153, 255, 1)",
            fontSize: 12,
            textDecorationLine: "underline",
            position: "absolute",
            top: 200,
            alignSelf: "center",
          }}
        >
          Resend Code
        </Text>
      </TouchableOpacity>

      {/* Verify */}
      <TouchableOpacity style={{ top: 240 }} onPress={handleVerify}>
        <Text
          style={{
            backgroundColor: "rgba(255, 215, 0, 1)",
            height: 30,
            width: 200,
            borderRadius: 10,
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Emailverification;