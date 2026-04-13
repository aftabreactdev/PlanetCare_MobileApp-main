import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Header = () => {
  const currentHour = new Date().getHours();
  const isMorning = currentHour < 12;
  const greetingText = isMorning ? "Good Morning" : "Good Evening";

  const backgroundImage = isMorning
    ? require("../../assets/images/morning.jpg")
    : require("../../assets/images/evening.png");

  const iconColor = isMorning ? "black" : "white";
  const navigation = useNavigation();

  // Responsive sizing
  const headerHeight = screenHeight * 0.35;
  const iconTop = screenHeight * 0.05;
  const iconRight = screenWidth * 0.05;
  const iconSize = screenWidth * 0.06;
  const iconMarginRight = screenWidth * 0.04;
  const profileImageSize = screenWidth * 0.09;
  const profileBorderRadius = profileImageSize / 2;
  const greetingBottom = screenHeight * 0.03;
  const greetingLeft = screenWidth * 0.05;
  const greetingTextSize = screenWidth * 0.045;
  const nameTextSize = screenWidth * 0.06;

  return (
    <View
      style={{
        width: "100%",
        height: headerHeight,
        borderBottomLeftRadius: screenWidth * 0.05,
        borderBottomRightRadius: screenWidth * 0.05,
        overflow: "hidden",
        // Pixel perfect: prevent any background bleed
        backgroundColor: "#000",
      }}
    >
      {/* Background */}
      <Image
        source={backgroundImage}
        style={{ 
          width: "100%", 
          height: "100%",
          // Pixel perfect: ensure image covers properly
          resizeMode: "cover",
        }}
      />

      {/* Icons */}
      <View
        style={{
          position: "absolute",
          top: iconTop,
          right: iconRight,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity 
          style={{ marginRight: iconMarginRight }} 
          onPress={() => navigation.navigate("NotificationItem")}
          activeOpacity={0.7}
          // Pixel perfect: increase hit area
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name="notifications"
            size={iconSize}
            color={iconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/profile.png")}
            style={{ 
              width: profileImageSize, 
              height: profileImageSize, 
              borderRadius: profileBorderRadius,
              // Pixel perfect: ensure image renders cleanly
              borderWidth: Platform.OS === "android" ? 0 : undefined,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={{ 
        position: "absolute", 
        bottom: greetingBottom, 
        left: greetingLeft 
      }}>
        <Text 
          style={{ 
            color: "#fff", 
            fontSize: greetingTextSize,
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
        >
          {greetingText}
        </Text>
        <Text 
          style={{ 
            color: "#fff", 
            fontSize: nameTextSize, 
            fontWeight: "bold",
            marginTop: screenHeight * 0.005,
            includeFontPadding: false,
            ...Platform.select({
              android: {
                textAlignVertical: "center",
              },
            }),
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Raja Haider
        </Text>
      </View>
    </View>
  );
};

export default Header;