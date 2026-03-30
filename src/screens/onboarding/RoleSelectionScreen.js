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
        style={{ height: H('100%'), width: W('100%'), position: "absolute", resizeMode: "cover" }}
      />

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: H(40),
          width: W('100%'),
          alignSelf: "center",
          borderBottomLeftRadius: H('2.5%'),
          borderBottomRightRadius: H('2.5%'),
        }}
      >
        <Text
          style={{
            fontSize: H('3%'),
            fontWeight: "900",
            fontStyle: "italic",
            alignSelf: "center",
            marginTop: H('3%'),
          }}
        >
          How are you using
        </Text>

        <Text
          style={{
            fontSize: H('3%'),
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
              marginTop: H('1.5%'),
              marginLeft: W('10%'),
            }}
          >
            <View
              style={{
                width: H('2%'),
                height: H('2%'),
                borderRadius: H('1%'),
                borderWidth: 0.6,
                borderColor: "gray",
                backgroundColor:
                  selectedOption === option.value
                    ? "rgba(255, 215, 0, 1)"
                    : "white",
                justifyContent: "center",
                alignItems: "center",
                marginRight: W('4%'),
              }}
            >
              {selectedOption === option.value && (
                <View
                  style={{
                    width: H('1.3%'),
                    height: H('1.3%'),
                    borderRadius: H('0.65%'),
                    backgroundColor: "rgba(255, 215, 0, 1)",
                  }}
                />
              )}
            </View>

            <Text style={{ fontSize: H('2%') }}>{option.label}</Text>
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
          style={{ height: H('6%'), width: W('12%'), resizeMode: "contain" }}
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
        center={[W('50%'), H('55%')]}
        radius={W('60%')}
        style={{
          position: "absolute",
          top: H('50%'),
          alignSelf: "center",
          width: W('100%'),
          height: W('100%'),
          borderRadius: W('50%'),
          opacity: 0.9,
        }}
      />

      <Image
        source={require("../../assets/images/greenplante.png")}
        style={{
          height: H('55%'),
          width: W('70%'),
          position: "absolute",
          top: H('40%'),
          alignSelf: "center",
          zIndex: 2,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default RoleSelection;