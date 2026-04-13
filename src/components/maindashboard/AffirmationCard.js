import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const AffirmationCard = () => {
  const navigation = useNavigation();

  // Responsive sizing based on screen width
  const marginHorizontal = screenWidth * 0.05; // 5% of screen width
  const marginTop = screenWidth * 0.05;
  const borderRadius = screenWidth * 0.03; // Responsive border radius
  const padding = screenWidth * 0.04;
  const titleFontSize = screenWidth * 0.045;
  const subtitleFontSize = screenWidth * 0.035;
  const subtitleMarginTop = screenWidth * 0.01;

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("HomeDashboad2")}
      activeOpacity={0.7}
      style={{
        // Pixel perfect: ensure touchable has no extra spacing
        marginHorizontal: marginHorizontal,
        marginTop: marginTop,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 78, 196, 1)",
          borderRadius: borderRadius,
          padding: padding,
          borderWidth: 1,
          borderColor: "white",
          // Pixel perfect fixes for Android
          ...Platform.select({
            android: {
              elevation: 0,
              borderWidth: 1,
            },
          }),
        }}
      >
        <Text 
          style={{ 
            color: "#fff", 
            fontWeight: "bold",
            fontSize: titleFontSize,
            // Pixel perfect: remove default font padding
            includeFontPadding: false,
            ...Platform.select({
              android: {
                textAlignVertical: "center",
              },
            }),
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.9}
        >
          Affirmation of the Day
        </Text>
        <Text 
          style={{ 
            color: "#E0E0E0", 
            marginTop: subtitleMarginTop,
            fontSize: subtitleFontSize,
            // Pixel perfect: remove default font padding
            includeFontPadding: false,
            ...Platform.select({
              android: {
                textAlignVertical: "center",
              },
            }),
          }}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          I am safe, I am growing
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AffirmationCard;