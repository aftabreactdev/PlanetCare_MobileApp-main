import React from 'react';
import { View , TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";


const COLORS = {
  white: "#FFFFFF",
  black: "#111111",
  gray: "#7A7A7A",
  lightGray: "#D9D9D9",
  border: "#D9D9D9",
  error: "#E53935",
  success: "#2E7D32",
  primary: "rgba(143, 0, 255, 1)",
  yellow: "rgba(255, 215, 0, 1)",
  blue: "rgba(0, 153, 255, 1)",
  placeholder: "#9A9A9A",
};


export default function AuthButton({ screen }) {
      const navigation = useNavigation();

  return (
   
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Entypo name="cross" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      
  );
}

const styles = StyleSheet.create({
     headerRow: {
    position: "absolute",
    top: H("5%"),
    left: 0,
    right: 0,
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: W("5%"),
  },
})

