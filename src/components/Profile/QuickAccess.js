import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const QuickAccess = () => {
  const navigation = useNavigation();

  const items = [
    { icon: "person", title: "Edit Profile", screen: "ProfileScreen3" },
    { icon: "lock-closed", title: "Privacy Setting", screen: "PrivacyScreen" },
    { icon: "notifications", title: "Notification Settings", screen: "Notificationssetting" },
    { icon: "globe-outline", title: "Language & Accessibility", screen: "Language" },
  ];

  return (
    <View style={{ marginTop: H("3%") }}>
      <Text style={{ fontSize: 14, marginLeft: W("5%"), fontWeight: "bold" }}>
        Quick Access
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginHorizontal: W("4%"),
          marginTop: H("1.5%"),
        }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={{
              width: "48%",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 12,
              padding: H("1.5%"),
              marginBottom: H("1.5%"),
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#000",
            }}
          >
            <Icon name={item.icon} size={22} color="#000" />
            <Text style={{ fontSize: 12, marginTop: 5 }}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickAccess;