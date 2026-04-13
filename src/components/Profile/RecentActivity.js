import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const RecentActivity = () => {
  const activities = [
    {
      title: "Reflecting on growth",
      description:
        "Today I felt a profound sense of connection to nature during my morning walk...",
      time: "7 hours ago",
    },
    {
      title: "Reflecting on growth",
      description:
        "Today I felt a profound sense of connection to nature during my morning walk...",
      time: "2 hours ago",
    },
  ];

  return (
    <View style={{ marginTop: H("3%"), marginBottom: H("5%") }}>
      <Text style={{ fontSize: 14, marginLeft: W("5%"), fontWeight: "bold" }}>
        Recent Activity
      </Text>

      {activities.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#1e293b",
            marginHorizontal: W("4%"),
            borderRadius: 12,
            padding: H("1.5%"),
            marginTop: H("1.5%"),
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>{item.title}</Text>

          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }} numberOfLines={2}>
            {item.description}
          </Text>

          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>
            {item.time}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "rgb(33,119,231)",
              paddingVertical: 6,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default RecentActivity;