import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const Profilesetup2 = (props) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = [
    require("../../assets/images/a.png"),
    require("../../assets/images/b.png"),
    require("../../assets/images/c.png"),
    require("../../assets/images/d.png"),
    require("../../assets/images/f.png"),
    require("../../assets/images/h.png"),
    require("../../assets/images/i.png"),
    require("../../assets/images/j.png"),
    require("../../assets/images/k.png"),
  ];

  // Avatar size calculation
  const avatarSize = (width - 60) / 3; // 20px margin on each side + 10px between items

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ marginTop: 20, marginLeft: 15 }}
        >
          <Icons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>

        {/* Header */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Profile Setup
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginTop: 5,
            fontWeight: "500",
          }}
        >
          Upload profile photo
        </Text>

        {/* Profile Placeholder */}
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <View
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedAvatar !== null ? (
              <Image
                source={avatars[selectedAvatar]}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                }}
              />
            ) : (
              <Icons name="person" size={60} color="#BDBDBD" />
            )}
          </View>

          <Text style={{ marginTop: 10, color: "gray", fontSize: 13 }}>
            Edit profile photo
          </Text>
        </View>

        {/* Subtitle */}
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "gray",
            fontSize: 13,
          }}
        >
          Upload profile photo or select avatar
        </Text>

        {/* Avatar Grid 3x3 */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {avatars.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedAvatar(index)}
              style={{
                width: avatarSize,
                height: avatarSize,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                borderRadius: avatarSize / 2,
                borderWidth: selectedAvatar === index ? 3 : 0,
                borderColor: "#FFD700",
              }}
            >
              <Image
                source={item}
                style={{
                  width: avatarSize - 10,
                  height: avatarSize - 10,
                  borderRadius: (avatarSize - 10) / 2,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity
       onPress={() => props.navigation.replace("MainTabs")}
        style={{
          backgroundColor: "#FFD600",
          margin: 20,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profilesetup2;