import React, { useState, useMemo } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  gold: "rgba(255, 215, 0, 1)",
  white: "#FFFFFF",
  gray: "#6E6E6E",
  dark: "#1C1C1E",
  background: "#F9F9F9",
};

const RoleSelection = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("Individual");

  const options = useMemo(
    () => [
      { label: "Individual", value: "Individual" },
      { label: "Community", value: "Community" },
      { label: "Organisation", value: "Organisation" },
    ],
    []
  );

  const handleNavigation = () => {
    navigation.navigate("AuthStack", {
      screen: selectedOption === "Individual" ? "Signup" : "CompanyAdmin",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={styles.backgroundImage}
      />

      {/* Header Card Section */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>How are you using</Text>
        <Text style={[styles.headerTitle, styles.headerAccent]}>
          Planet Care?
        </Text>

        {/* Role Options */}
        <View style={{ marginTop: H(2) }}>
          {options.map((option) => {
            const isSelected = selectedOption === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelectedOption(option.value)}
                style={({ pressed }) => [
                  styles.optionRow,
                  {
                    backgroundColor: pressed ? "#F1F1F1" : "transparent",
                  },
                ]}
              >
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: isSelected ? COLORS.gold : COLORS.gray,
                      shadowColor: isSelected ? COLORS.gold : "transparent",
                    },
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>

                <Text
                  style={[
                    styles.optionLabel,
                    {
                      color: isSelected ? COLORS.dark : COLORS.gray,
                      fontWeight: isSelected ? "700" : "500",
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity onPress={handleNavigation} style={styles.ctaWrapper}>
        <Image
          source={require("../../assets/images/yellow.png")}
          style={styles.ctaImage}
        />
      </TouchableOpacity>

      {/* Radial Glow */}
      <RadialGradient
        colors={[
          "rgba(143, 0, 255, 0.9)",
          "rgba(143, 0, 250, 0.6)",
          "rgba(160, 80, 220, 0.2)",
          "rgba(200, 120, 255, 0.0)",
        ]}
        stops={[0.1, 0.4, 0.8, 1]}
        center={[W(50), H(55)]}
        radius={W(65)}
        style={styles.radialGlow}
      />

      {/* Central Planet Image */}
      <Image
        source={require("../../assets/images/greenplante.png")}
        style={styles.planetImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: H(100),
    width: W(100),
    position: "absolute",
    resizeMode: "cover",
  },

  headerCard: {
    backgroundColor: COLORS.white,
    position: "absolute",
    height: H(42),
    width: W(100),
    borderBottomLeftRadius: H(3),
    borderBottomRightRadius: H(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    paddingTop: H(5),
  },

  headerTitle: {
    fontSize: H(3),
    fontWeight: "900",
    fontStyle: "italic",
    alignSelf: "center",
    color: COLORS.dark,
  },

  headerAccent: {
    marginTop: H(0.5),
    color: COLORS.dark,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: H(1.2),
    paddingHorizontal: W(10),
  },

  radioOuter: {
    width: H(2.5),
    height: H(2.5),
    borderRadius: H(1.25),
    borderWidth: 1.2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: W(4),
    backgroundColor: COLORS.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  radioInner: {
    width: H(1.3),
    height: H(1.3),
    borderRadius: H(0.65),
    backgroundColor: COLORS.gold,
  },

  optionLabel: {
    fontSize: H(2),
    letterSpacing: 0.3,
  },

  ctaWrapper: {
    position: "absolute",
    top: H(32),
    alignSelf: "center",
  },

  ctaImage: {
    height: H(6),
    width: W(14),
    resizeMode: "contain",
  },

  radialGlow: {
    position: "absolute",
    top: H(48),
    alignSelf: "center",
    width: W(100),
    height: W(100),
    borderRadius: W(50),
    opacity: 0.9,
  },

  planetImage: {
    height: H(55),
    width: W(70),
    position: "absolute",
    top: H(40),
    alignSelf: "center",
    resizeMode: "contain",
    zIndex: 2,
  },
});

export default RoleSelection;
