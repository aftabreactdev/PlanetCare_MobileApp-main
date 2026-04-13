import React from "react";
import { View, Image, Dimensions, Platform } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import CircularProgress from "./CircularProgress";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProgressSection = () => {
  // Responsive sizing
  const marginHorizontal = screenWidth * 0.05;
  const marginTop = screenHeight * 0.05;
  
  // Responsive image dimensions
  const imageWidth = screenWidth * 0.34;
  const imageHeight = screenHeight * 0.06;
  
  // Calculate spacing between image and circular progress
  const justifyContent = "space-between";

  return (
    <View
      style={{
        marginHorizontal: marginHorizontal,
        marginTop: marginTop,
        flexDirection: "row",
        justifyContent: justifyContent,
        alignItems: "center",
        // Pixel perfect: ensure no extra spacing
        padding: 0,
      }}
    >
      <Image
        source={require("../../assets/images/streak.png")}
        style={{ 
          width: imageWidth, 
          height: imageHeight,
          // Pixel perfect: ensure image renders cleanly
          resizeMode: "contain",
          ...Platform.select({
            android: {
              borderWidth: 0,
            },
          }),
        }}
      />
      <CircularProgress />
    </View>
  );
};

export default ProgressSection;