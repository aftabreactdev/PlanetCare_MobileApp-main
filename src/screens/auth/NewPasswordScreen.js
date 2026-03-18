import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <View>
      {/* Heading */}
      <Text
        style={{
          fontWeight: "900",
          fontSize: 25,
          marginTop: 20,
          alignSelf: "center",
        }}
      >
        Create New Password
      </Text>

      {/* Lock Circle */}
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
        <Icon
          name="check"
          size={14}
          color="white"
          style={{
            backgroundColor: "rgba(103, 111, 116, 1)",
            height: 25,
            width: 25,
            borderRadius: 13,
            textAlign: "center",
            textAlignVertical: "center",
            position: "absolute",
            top: 100,
            left: 90,
          }}
        />
      </View>

      {/* Info */}
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text>Your new password must be</Text>
        <Text>different from previously</Text>
        <Text>used password</Text>
      </View>

      {/* Password */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ right: 50 }}>New Password</Text>

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            width: 200,
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
            style={{ flex: 1 }}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={13} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ right: 50 }}>Confirm Password</Text>

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            width: 200,
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
            style={{ flex: 1 }}
          />

          <TouchableOpacity
            onPress={() => setShowconfirmPassword(!showconfirmPassword)}
          >
            <Icon name={showconfirmPassword ? "eye-slash" : "eye"} size={13} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ❌ Error Message */}
      {error ? (
        <Text style={{ color: "red", alignSelf: "center", marginTop: 15 }}>
          {error}
        </Text>
      ) : null}

      {/* Button */}
      <TouchableOpacity style={{ top: 30 }} onPress={handleSave}>
        <Text
          style={{
            backgroundColor: "rgba(255, 236, 135, 1)",
            height: 30,
            width: 200,
            borderRadius: 10,
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 13,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Save Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Newpassword;