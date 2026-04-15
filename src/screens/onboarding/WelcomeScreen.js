import React, { useEffect, useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
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

const Welcomescreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={styles.backgroundImage}
      />

      {/* Gradient Overlay */}
      <RadialGradient
        colors={[
          "rgba(143, 0, 255, 1)",
          "rgba(143, 0, 250, 0.6)",
          "rgba(160, 80, 220, 0.2)",
          "rgba(200, 120, 255, 0.0)",
        ]}
        stops={[0.15, 0.45, 0.75, 1]}
        center={[W("50%"), H("35%")]}
        radius={W("65%")}
        style={StyleSheet.absoluteFill}
      />

      {/* Illustration */}
      <Animated.View style={[styles.illustrationContainer, { opacity: fadeAnim }]}>
        <Image source={images.welcomeIllustration} style={styles.illustration} />
      </Animated.View>

      {/* Foreground White Card */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            Welcome to{"\n"}PLANET{" "}
            <Text style={styles.highlight}>CARE</Text>
          </Text>

          <Text style={styles.subtitle}>Your space for emotional</Text>
          <Text style={[styles.subtitle, { marginTop: H("0.3%") }]}>
            wellbeing
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Role")}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          <Image
            source={require("../../assets/images/yellow.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: W("100%"),
    height: H("100%"),
    resizeMode: "cover",
  },
  illustrationContainer: {
    position: "absolute",
    top: H("8%"),
    alignSelf: "center",
    zIndex: 2,
  },
  illustration: {
    width: W("60%"),
    height: H("40%"),
    resizeMode: "contain",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: W("100%"),
    height: H("56%"),
    backgroundColor: "#FFF",
    borderTopLeftRadius: H("5%"),
    borderTopRightRadius: H("5%"),
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: H("5%"),
    paddingHorizontal: W("6%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  textBlock: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat-Black",
    fontSize: H("4.8%"),
    textAlign: "center",
    color: "#030303",
    lineHeight: H("5.5%"),
    marginBottom: H("2%"),
    letterSpacing: 0.5,
  },
  highlight: {
    color: "rgba(0,135,218,1)",
    fontWeight: "900",
  },
  subtitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: H("2.2%"),
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: H("4%"),
  },
  buttonImage: {
    width: W("15%"),
    height: H("7%"),
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default Welcomescreen;
