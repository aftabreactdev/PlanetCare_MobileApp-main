import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const Forgetpassword = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
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
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Forgot Password</Text>

        {/* Icon Section */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../assets/icons/lock.png")}
            style={styles.lockImage}
            resizeMode="contain"
          />

          <Text style={styles.questionMark}>?</Text>
        </View>

        {/* Info */}
        <Text style={styles.info}>Please enter your email address to</Text>
        <Text style={styles.info}>receive a verification code.</Text>

        {/* Input */}
        <View style={styles.inputRow}>
          <Icon name="envelope" size={18} color="#444" />
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Error */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.tryAnother}>Try another way</Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContainer: {
    paddingVertical: H("4%"),
    paddingHorizontal: W("6%"),
    alignItems: "center",
  },

  title: {
    fontSize: W("7%"),
    fontWeight: "900",
    color: "#000",
    marginBottom: H("3%"),
  },

  iconWrapper: {
    backgroundColor: "rgba(218, 228, 253, 1)",
    height: W("42%"),
    width: W("42%"),
    borderRadius: W("21%"),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: H("2%"),
    position: "relative",
  },

  lockImage: {
    height: "70%",
    width: "70%",
  },

  questionMark: {
    position: "absolute",
    right: W("6%"),
    bottom: H("1%"),
    backgroundColor: "rgba(103, 111, 116, 1)",
    color: "#fff",
    height: W("8%"),
    width: W("8%"),
    borderRadius: W("4%"),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: W("4%"),
  },

  info: {
    fontSize: W("4%"),
    fontFamily: "Poppins-Regular",
    color: "#666",
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: H("4%"),
    borderBottomWidth: 1,
    borderColor: "#d1d1d1",
    paddingVertical: H("1%"),
    width: W("80%"),
    gap: W("2%"),
  },

  input: {
    flex: 1,
    fontSize: W("4%"),
    color: "#000",
  },

  error: {
    color: "red",
    marginTop: H("1%"),
    fontSize: W("3.5%"),
    textAlign: "center",
  },

  tryAnother: {
    color: "rgba(0,153,255,1)",
    fontSize: W("4%"),
    textDecorationLine: "underline",
    marginTop: H("2%"),
  },

  button: {
    marginTop: H("4%"),
    backgroundColor: "#FFD700",
    paddingVertical: H("1.8%"),
    width: W("60%"),
    borderRadius: 10,
    alignItems: "center",

    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    fontSize: W("4.5%"),
    fontWeight: "bold",
    color: "#000",
  },
});
