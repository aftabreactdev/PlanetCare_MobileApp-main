import React from 'react';
import { TouchableOpacity, Text, View, Image } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";

const GradientCard = ({
  onPress,
  colors = ["rgba(143, 0, 255, 0.5)", "rgba(0, 42, 138, 1)"],
  leftIcon,
  leftIconStyle = { height: H('3%'), width: W('6%') },
  secondaryIcon,
  secondaryIconStyle = { height: H('4%'), width: W('7%') },
  title,
  titleStyle = {},
  subtitle,
  subtitleStyle = {},
  time,
  date,
  rightContent,
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
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
        {leftIcon && (
          <Image
            source={leftIcon}
            style={[leftIconStyle, { position: "absolute", left: 20 }]}
          />
        )}

        {secondaryIcon && (
          <Image
            source={secondaryIcon}
            style={[secondaryIconStyle, { position: "absolute", left: 50 }]}
          />
        )}

        {title && (
          <Text style={[{ color: "#fff", fontSize: 12, fontWeight: "600" }, titleStyle]}>
            {title}
          </Text>
        )}

        {subtitle && (
          <Text style={[{ color: "#fff", fontSize: 12, fontWeight: "300" }, subtitleStyle]}>
            {subtitle}
          </Text>
        )}

        {rightContent ? (
          rightContent
        ) : (
          (time || date) && (
            <View style={{ position: "absolute", right: 10, flexDirection: "column", alignItems: "center" }}>
              {time && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "300" }}>{time}</Text>}
              {date && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "300", left: 20 }}>{date}</Text>}
            </View>
          )
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientCard;