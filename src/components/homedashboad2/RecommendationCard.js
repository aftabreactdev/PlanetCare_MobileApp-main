import React from 'react';
import { TouchableOpacity, Text, Image } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";

const RecommendationCard = ({ 
  onPress, 
  icon, 
  title, 
  description,
  titleStyle = {},
  descriptionStyle = {},
  iconStyle = {},
  containerStyle = {}
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["rgba(0, 11, 36, 0)", "rgba(0, 42, 138, 1)"]}
        style={[
          {
            height: H('7'),
            width: W('85%'),
            borderRadius: H('20'),
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
          },
          containerStyle
        ]}
      >
        {icon && (
          <Image
            source={icon}
            style={[
              { height: H('4%'), width: W('6%'), position: "absolute", left: 20 },
              iconStyle
            ]}
          />
        )}

        {title && (
          <Text style={[
            { color: "#fff", fontSize: 12, fontWeight: "600" },
            titleStyle
          ]}>
            {title}
          </Text>
        )}

        {description && (
          <Text style={[
            { color: "#fff", fontSize: 12, fontWeight: "300" },
            descriptionStyle
          ]}>
            {description}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RecommendationCard;