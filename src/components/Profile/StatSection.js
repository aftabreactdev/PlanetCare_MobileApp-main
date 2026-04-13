import React from "react";
import { View } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: W("4%"),
        marginTop: H("2%"),
      }}
    >
      <StatCard icon="moon" title="Sleep Quality" value={70} />
      <StatCard icon="water" title="Water Intake" value={90} />
      <StatCard icon="happy" title="Gratitude" value={85} />
      <StatCard icon="walk" title="Movement" value={50} />
    </View>
  );
};

export default StatsSection;