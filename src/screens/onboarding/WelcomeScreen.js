import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import AuthButton from "../../components/AuthButton";

import images from "../../constants/images";

const Welcomescreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Background */}
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={{
          position: "absolute",
          width: W("100%"),
          height: H("100%"),
          resizeMode: "cover",
        }}
      />

      {/* Main Layout */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Top Illustration Section */}
     <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Image
    source={images.welcomeIllustration}
    style={{
      height: H("35%"),
      width: W("70%"),
      resizeMode: "contain",
    }}
  />
</View>

        {/* Bottom Card */}
        <View
          style={{
            width: W("100%"),
            minHeight: H("48%"),
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: W("7%"),
            paddingTop: H("4%"),
            paddingBottom: H("4%"),
          }}
        >
          {/* Title */}
          <Text
            style={{
              textAlign: "center",
              fontSize: H("5%"),
              lineHeight: H("6.2%"),
              color: "#111111",
              fontFamily: "Montserrat-Black",
              marginBottom: H("2%"),
              fontWeight:'bold'
            }}
          >
            Welcome to{"\n"}
            <Text
              style={{
                fontFamily: "Montserrat-Black",
                color: "#111111",
                letterSpacing: 1,
              }}
            >
              PLANET{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat-Black",
                color: "rgba(0,135,218,1)",
                letterSpacing: 1.2,
              }}
            >
              CARE
            </Text>
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: H("2.35%"),
              lineHeight: H("3.2%"),
              color: "#2F2F2F",
              fontStyle: "italic",
              textAlign: "center",
              fontWeight:'bold'
            }}
          >
            Your space for emotional
          </Text>

          <Text
            style={{
              fontSize: H("2.35%"),
              lineHeight: H("3.2%"),
              color: "#2F2F2F",
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: H("3.5%"),
              fontWeight:'bold'
            }}
          >
            wellbeing
          </Text>
           <AuthButton  screen="Role" />
        </View>
      </View>
    </View>
  );
};

export default Welcomescreen;