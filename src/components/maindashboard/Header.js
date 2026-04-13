import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


const Header = () => {

  const currentHour = new Date().getHours();

  const isMorning = currentHour < 12;

  const greetingText = isMorning ? "Good Morning" : "Good Evening";

  const backgroundImage = isMorning
    ? require("../../assets/images/morning.jpg")
    : require("../../assets/images/evening.png");

  // ✅ Icon color logic
  const iconColor = isMorning ? "black" : "white";

    const navigation = useNavigation();
  

  return (
    <View
      style={{
        width: W("100%"),
        height: H("35%"),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Image
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      />

      {/* Icons */}
      <View
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate("NotificationItem")}>
          <Icon
            name="notifications"
            size={24}
            color={iconColor}
          />
        </TouchableOpacity>

       <TouchableOpacity>

         <Image
          source={require("../../assets/images/profile.png")}
          style={{ width: 36, height: 36, borderRadius: 18 }}
        />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={{ position: "absolute", bottom: 20, left: 20 }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>
          {greetingText}
        </Text>
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          Raja Haider
        </Text>
      </View>
    </View>
  );
};

export default Header;