import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

import StatsSection from "../../components/Profile/StatSection";
import QuickAccess from "../../components/Profile/QuickAccess";
import RecentActivity from "../../components/Profile/RecentActivity";

const ProfileScreen = () => {
  return (
    <LinearGradient colors={["#cbd5f5", "#60a5fa"]} style={{ flex: 1 }}>
      <ScrollView>

        <Text style={{ textAlign: "center", marginTop: H("5%"), fontSize: 16, fontWeight: "600" }}>
          Profile
        </Text>

        <View style={{ alignSelf: "center", marginTop: H("5%") }}>
          <Image
            source={require("../../assets/images/pf.png")}
            style={{ height: H("20%"), width: W("40%"), borderRadius: 100 }}
          />
        </View>

        <Text style={{ textAlign: "center", marginTop: H("2%"), fontSize: 18, fontWeight: "bold" }}>
          Nauman Tariq
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#0095ff",
            alignSelf: "center",
            paddingVertical: H("1%"),
            paddingHorizontal: W("6%"),
            borderRadius: 25,
            marginTop: H("1%"),
          }}
        >
          <Text style={{ color: "#fff" }}>Edit Profile</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 14, marginTop: H("5%"), marginLeft: W("5%"), fontWeight: "bold" }}>
          Profile Stats
        </Text>

        <StatsSection />
        <QuickAccess />
        <RecentActivity />

        <View style={{ height: H("5%") }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;