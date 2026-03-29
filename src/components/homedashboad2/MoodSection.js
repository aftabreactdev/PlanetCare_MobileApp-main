import React from 'react';
import { View, Text, Image } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const MoodSection = ({ 
  moodImage, 
  moodText,
  containerStyle = {},
  imageStyle = {},
  textStyle = {}
}) => {
  return (
    <View style={[{ alignItems: "center", marginVertical: 20 }, containerStyle]}>
      <Image
        source={moodImage}
        style={[{ height: H('21%'), width: W('37%') }, imageStyle]}
      />
      <Text style={[
        { color: "#fff", marginTop: 10, fontSize: 16, fontWeight: "600" },
        textStyle
      ]}>
        {moodText}
      </Text>
    </View>
  );
};

export default MoodSection;