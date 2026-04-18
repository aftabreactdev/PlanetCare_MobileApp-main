import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import CircularProgress from "./CircularProgress";

const ProgressSection = ({
  streakImage,
  progress = 70,          // percentage (0–100)
  goal = 100,
  current = 70,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Image */}
      <Image
        source={
          streakImage
            ? { uri: streakImage }
            : require("../../assets/images/streak.png")
        }
        style={styles.image}
        resizeMode="contain"
      />

      {/* Right Progress */}
      <CircularProgress
        progress={progress}
        goal={goal}
        current={current}
      />
    </View>
  );
};

export default ProgressSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: W("5%"),
    marginTop: H("4%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: W("35%"),
    height: H("6%"),
  },
});