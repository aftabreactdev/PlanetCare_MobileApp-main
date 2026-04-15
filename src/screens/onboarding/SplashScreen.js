import React, { useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Background Image */}
      <Image source={images.Splashbackground} style={styles.backgroundImage} />

      {/* Gradient Overlay */}
      <RadialGradient
        colors={[
          "rgba(173, 216, 255, 1)",
          "rgba(102, 181, 255, 0.9)",
          "rgba(0, 78, 196, 0.75)",
          "rgba(0, 11, 36, 0.3)",
        ]}
        stops={[0.1, 0.35, 0.7, 1]}
        center={[W("50%"), H("35%")]}
        radius={W("80%")}
        style={StyleSheet.absoluteFill}
      />

      {/* Main Content */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Image source={images.splashLogo} style={styles.logo} />

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Emotional Wellness,</Text>
          <Text style={styles.mainText}>One Check-In at a Time</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Welcome")}
          style={styles.buttonWrapper}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    width: W("100%"),
    height: H("100%"),
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: H("8%"),
  },

  logo: {
    width: W("65%"),
    height: H("45%"),
    resizeMode: "contain",
    marginTop: H("10%"),
  },

  textContainer: {
    alignItems: "center",
  },

  mainText: {
    color: "#FFFFFF",
    fontSize: H("2.8%"),
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    lineHeight: H("3.6%"),
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  buttonWrapper: {
    width: W("60%"),
    minWidth: 220,
    maxWidth: 320,
  },

  button: {
    backgroundColor: colors.secondary,
    paddingVertical: H("1.8%"),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: H("6%"),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.28,
        shadowRadius: 4.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  buttonText: {
    color: colors.backgroundDark,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    fontSize: H("2.2%"),
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default Splashscreen;
