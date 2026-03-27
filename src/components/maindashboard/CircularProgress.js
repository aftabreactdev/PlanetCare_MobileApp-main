import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  color,
  label,
  bgColor = "#e5e7eb", // default background ring
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke={bgColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.wrapper}>
      <CircularProgress
        size={40}
        strokeWidth={8}
        progress={50}
        color="rgba(0, 78, 196, 1)"
        bgColor="rgba(224, 224, 224, 1)"
        label="Journaling"
      />

      <CircularProgress
        size={40}
        strokeWidth={8}
        progress={70}
        color="rgba(0, 11, 36, 1)"
        bgColor="rgba(224, 224, 224, 1)"
        label="Check-in"
      />

      <CircularProgress
        size={40}
        strokeWidth={8}
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
    gap: 7,
    
  },
  container: {
    alignItems: "center",
    
  },
  label: {
    marginTop: 8,
    color: "white",
    fontSize: 8,
  },
});