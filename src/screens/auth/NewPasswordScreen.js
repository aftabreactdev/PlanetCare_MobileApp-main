import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#6B6B6B",
  error: "#E53935",
  yellow: "rgba(255,215,0,1)",
  border: "#D9D9D9",
  lightBg: "rgba(218,228,253,1)",
};

const InputField = ({
  label,
  value,
  onChangeText,
  secure,
  toggleSecure,
}) => {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter password"
          secureTextEntry={secure}
          style={styles.input}
        />

        <TouchableOpacity onPress={toggleSecure}>
          <Icon name={secure ? "eye" : "eye-slash"} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Newpassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const validate = () => {
    if (!password || !confirmPassword) {
      return "Please fill in both fields";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSave = () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    navigation.navigate("Login");
  };

  const isValid =
    password &&
    confirmPassword &&
    password.length >= 6 &&
    password === confirmPassword;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* TITLE */}
        <Text style={styles.title}>Create New Password</Text>

        {/* ICON */}
        <View style={styles.iconCircle}>
          <Image
            source={require("../../assets/icons/lock.png")}
            style={styles.icon}
          />
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <Text>Your new password must be different</Text>
          <Text>from previously used passwords</Text>
        </View>

        {/* INPUTS */}
        <InputField
          label="New Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          secure={!showPassword}
          toggleSecure={() => setShowPassword(!showPassword)}
        />

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError("");
          }}
          secure={!showConfirmPassword}
          toggleSecure={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />

        {/* ERROR */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={!isValid}
          style={[
            styles.button,
            !isValid && { opacity: 0.5 },
          ]}
        >
          <Text style={styles.buttonText}>Save Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Newpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: "absolute",
    top: H("5%"),
    left: W("5%"),
    zIndex: 10,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: W("6%"),
    paddingTop: H("10%"),
  },
  title: {
    fontSize: W("7%"),
    fontWeight: "800",
    marginBottom: H("3%"),
  },
  iconCircle: {
    width: W("40%"),
    height: W("40%"),
    borderRadius: 999,
    backgroundColor: COLORS.lightBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: H("3%"),
  },
  icon: {
    width: W("25%"),
    height: W("25%"),
  },
  info: {
    alignItems: "center",
    marginBottom: H("4%"),
  },
  fieldBlock: {
    width: W("70%"),
    marginBottom: H("2%"),
  },
  label: {
    marginBottom: H("0.5%"),
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: H("1%"),
  },
  error: {
    color: COLORS.error,
    marginTop: H("1%"),
  },
  button: {
    marginTop: H("3%"),
    width: W("70%"),
    height: H("6%"),
    backgroundColor: COLORS.yellow,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
  },
});