import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <View>
      {/* Title */}
      <Text
        style={{
          fontWeight: "900",
          fontSize: 25,
          marginTop: 20,
          alignSelf: "center",
        }}
      >
        Forgot Password
      </Text>

      {/* Icon */}
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
          source={require("../../assets/icons/lock.png")}
          style={{
            position: "absolute",
            height: 120,
            width: 120,
            alignSelf: "center",
            top: 20,
          }}
        />
        <Text
          style={{
            backgroundColor: "rgba(103, 111, 116, 1)",
            color: "white",
            height: 25,
            width: 25,
            borderRadius: 13,
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            fontSize: 15,
            top: 100,
            left: 90,
          }}
        >
          ?
        </Text>
      </View>

      {/* Info Text */}
      <Text style={{ alignSelf: "center", top: 40, fontSize: 15 }}>
        Please enter an email address to
      </Text>
      <Text style={{ alignSelf: "center", top: 45, fontSize: 15 }}>
        receive a verification code.
      </Text>

      {/* Email Input */}
      <View
        style={{
          flexDirection: "row",
          top: 65,
          left: 70,
          gap: 10,
        }}
      >
        <Icon name="envelope" size={12} color="black" style={{ top: 10 }} />

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
            width: 250,
            fontSize: 13,
          }}
        />
      </View>

      {/* ❌ Error Message */}
      {error ? (
        <Text style={{ color: "red", marginTop: 70, alignSelf: "center" }}>
          {error}
        </Text>
      ) : null}

      {/* Try Another Way */}
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
          Try another way
        </Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity
        style={{ top: 240 }}
        onPress={handleSend}
      >
        <Text
          style={{
            backgroundColor: "rgba(255, 215, 0, 1)",
            height: 30,
            width: 200,
            borderRadius: 10,
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Send Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Forgetpassword;