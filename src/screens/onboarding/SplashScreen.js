import React, { memo } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import images from "../../constants/images";
import colors from "../../constants/colors";

const Splashscreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}

      {/* Background */}
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={styles.backgroundImage}
      />

      {/* Overlay */}
      <RadialGradient
        colors={[
          "rgba(173, 216, 255, 1)",
          "rgba(102, 181, 255, 1)",
          "rgba(0, 78, 196, 0.8)",
          "rgba(0, 11, 36, 0.3)",
        ]}
        stops={[0.1, 0.3, 0.7, 1]}
        center={[W("50%"), H("35%")]}
        radius={W("80%")}
        style={styles.gradient}
      />

      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.topSpace} />

        <View style={styles.centerSection}>
          <Image source={images.splashLogo} style={styles.logo} />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Emotional Wellness,</Text>
            <Text style={styles.title}>One Check-In at a Time</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Welcome")}
          style={styles.buttonWrapper}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: H("6%"),
    paddingHorizontal: W("6%"),
  },
  topSpace: {
    height: H("4%"),
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: W("65%"),
    height: H("32%"),
    resizeMode: "contain",
    marginBottom: H("3%"),
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: W("4%"),
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: H("2.8%"),
    fontFamily: "Poppins-Bold",
    fontWeight: "600",
    lineHeight: H("3.8%"),
  },
  buttonWrapper: {
    width: W("60%"),
    minWidth: 200,
    maxWidth: 300,
    marginBottom: H("2%"),
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: H("1.9%"),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: H("6%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.backgroundDark,
    fontWeight: "700",
    fontSize: H("2.2%"),
    textAlign: "center",
  },
});