import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const RoleSelection = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("Individual");

  const options = [
    { label: "Individual", value: "Individual" },
    { label: "Community", value: "Community" },
    { label: "Organisation", value: "Organisation" },
  ];

  const handleNavigation = () => {
    navigation.navigate("AuthStack", {
      screen:
        selectedOption === "Individual" ? "Signup" : "CompanyAdmin",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: H(40),
          width: "100%",
          alignSelf: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            fontStyle: "italic",
            alignSelf: "center",
            marginTop: 25,
          }}
        >
          How are you using
        </Text>

        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            fontStyle: "italic",
            alignSelf: "center",
          }}
        >
          Planet Care?
        </Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setSelectedOption(option.value)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginLeft: 40,
            }}
          >
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 7.5,
                borderWidth: 0.6,
                borderColor: "gray",
                backgroundColor:
                  selectedOption === option.value
                    ? "rgba(255, 215, 0, 1)"
                    : "white",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              {selectedOption === option.value && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 215, 0, 1)",
                  }}
                />
              )}
            </View>

            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          position: "absolute",
          top: H(30),
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../assets/images/yellow.png")}
          style={{ height: 50, width: 50 }}
        />
      </TouchableOpacity>

      <RadialGradient
        colors={[
          "rgba(143, 0, 255, 1)",
          "rgba(143, 0, 250, 0.6)",
          "rgba(160, 80, 220, 0.2)",
          "rgba(200, 120, 255, 0.0)",
        ]}
        stops={[0.1, 0.4, 0.8, 1]}
        center={[200, 200]}
        radius={200}
        style={{
          position: "absolute",
          top: 450,
          alignSelf: "center",
          width: 400,
          height: 400,
          borderRadius: 200,
          opacity: 0.9,
        }}
      />

      <Image
        source={require("../../assets/images/greenplante.png")}
        style={{
          height: 250,
          width: 250,
          position: "absolute",
          top: 300,
          alignSelf: "center",
          zIndex: 2,
        }}
      />
    </View>
  );
};

export default RoleSelection;