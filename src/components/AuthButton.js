import React from 'react';
import { View , TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


export default function AuthButton({ screen }) {
      const navigation = useNavigation();

  return (
    <View>
 <TouchableOpacity
            onPress={() => navigation.navigate(screen)}
            activeOpacity={0.85}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/yellow.png")}
              style={{
                height: H("8%"),
                width: W("16%"),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
    </View>
      
  );
}

