import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as H } from "react-native-responsive-screen";

const StatCard = ({ icon, title, value }) => {
  return (
    <View
      style={{
        width: "48%",
        backgroundColor: "rgb(33, 119, 231)",
        borderRadius: 15,
        padding: H("2%"),
        marginBottom: H("2%"),
      }}
    >
      <Icon name={icon} size={24} color="#fff" />

      <Text style={{ color: "#fff", marginTop: H("1%"), fontSize: 12 }}>
        {title}
      </Text>

      <View
        style={{
          height: 6,
          backgroundColor: "rgba(159,155,155,0.4)",
          borderRadius: 10,
          marginTop: H("1%"),
        }}
      >
        <View
          style={{
            height: 6,
            width: `${value}%`,
            backgroundColor: "#000",
          }}
        />
      </View>

      <Text style={{ color: "#fff", fontSize: 10, textAlign: "right" }}>
        {value}%
      </Text>
    </View>
  );
};

export default StatCard;