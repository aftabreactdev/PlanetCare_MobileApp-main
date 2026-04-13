import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width: screenWidth } = Dimensions.get("window");

const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  color,
  label,
  bgColor = "#e5e7eb",
}) => {
  // Ensure size is responsive if not explicitly provided
  const responsiveSize = size || screenWidth * 0.1;
  const responsiveStrokeWidth = strokeWidth || screenWidth * 0.02;
  
  const radius = (responsiveSize - responsiveStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={styles.container}>
      <Svg width={responsiveSize} height={responsiveSize}>
        {/* Background circle */}
        <Circle
          stroke={bgColor}
          fill="none"
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          strokeWidth={responsiveStrokeWidth}
        />

        {/* Progress circle */}
        <Circle
          stroke={color}
          fill="none"
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          strokeWidth={responsiveStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          rotation="-90"
          origin={`${responsiveSize / 2}, ${responsiveSize / 2}`}
        />
      </Svg>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default function App() {
  // Responsive sizes based on screen width
  const circleSize = screenWidth * 0.095;
  const strokeWidthVal = screenWidth * 0.018;
  const labelFontSize = screenWidth * 0.028;
  const labelMarginTop = screenWidth * 0.02;
  const gap = screenWidth * 0.018;

  return (
    <View style={[styles.wrapper, { gap: gap }]}>
      <CircularProgress
        size={circleSize}
        strokeWidth={strokeWidthVal}
        progress={50}
        color="rgba(0, 78, 196, 1)"
        bgColor="rgba(224, 224, 224, 1)"
        label="Journaling"
      />

      <CircularProgress
        size={circleSize}
        strokeWidth={strokeWidthVal}
        progress={70}
        color="rgba(0, 11, 36, 1)"
        bgColor="rgba(224, 224, 224, 1)"
        label="Check-in"
      />

      <CircularProgress
        size={circleSize}
        strokeWidth={strokeWidthVal}
        progress={70}
        color="rgba(224, 224, 224, 1)"
        bgColor="rgba(102, 181, 255, 1)"
        label="Intentions"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // gap is now dynamically set in the component
    marginHorizontal: screenWidth * 0.02,
  },
  container: {
    alignItems: "center",
    // Pixel perfect: remove any default spacing
    padding: 0,
    margin: 0,
  },
  label: {
    marginTop: screenWidth * 0.02,
    color: "white",
    fontSize: screenWidth * 0.028,
    // Pixel perfect fixes
    includeFontPadding: false,
    textAlign: "center",
    ...Platform.select({
      android: {
        textAlignVertical: "center",
      },
    }),
    // Allow text to scale but not too small
    adjustsFontSizeToFit: true,
    minimumFontScale: 0.8,
  },
});