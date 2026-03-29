import React from 'react';
import { TouchableOpacity, Text, View, Image } from "react-native";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";

const ActivityItem = ({
  onPress,
  leftIcon,
  secondaryIcon,
  title,
  subtitle,
  time,
  date,
  titleStyle = {},
  subtitleStyle = {},
  leftIconStyle = {},
  secondaryIconStyle = {},
  containerStyle = {},
  timeStyle = {},
  dateStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["rgba(143, 0, 255, 0.5)", "rgba(0, 42, 138, 1)"]}
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
            style={[
              { height: H('3%'), width: W('6%'), position: "absolute", left: 20 },
              leftIconStyle
            ]}
          />
        )}

        {secondaryIcon && (
          <Image
            source={secondaryIcon}
            style={[
              { height: H('4%'), width: W('7%'), position: "absolute", left: 50 },
              secondaryIconStyle
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

        {subtitle && (
          <Text style={[
            { color: "#fff", fontSize: 12, fontWeight: "300" },
            subtitleStyle
          ]}>
            {subtitle}
          </Text>
        )}

        {(time || date) && (
          <View style={{ position: "absolute", right: 10, flexDirection: "column", alignItems: "center" }}>
            {time && (
              <Text style={[
                { color: "#fff", fontSize: 12, fontWeight: "300" },
                timeStyle
              ]}>
                {time}
              </Text>
            )}
            {date && (
              <Text style={[
                { color: "#fff", fontSize: 12, fontWeight: "300",  },
                dateStyle
              ]}>
                {date}
              </Text>
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ActivityItem;