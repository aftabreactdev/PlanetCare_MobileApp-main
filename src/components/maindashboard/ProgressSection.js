import React from "react";
import { View, Image } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import CircularProgress from "./CircularProgress";

const ProgressSection = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/streak.png")}
        style={{ width: W(34), height: H(6) }}
      />
      <CircularProgress />
    </View>
  );
};

export default ProgressSection;