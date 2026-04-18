import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const AffirmationCard = ({
  title = "Affirmation of the Day",
  subtitle = "I am safe, I am growing",
  onPress,
  targetScreen = "HomeDashboad2",
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    navigation.navigate(targetScreen);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={styles.touchable}
    >
      <View style={styles.card}>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.9}
        >
          {title}
        </Text>

        <Text
          style={styles.subtitle}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AffirmationCard;

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: W("5%"),
    marginTop: H("3%"),
  },
  card: {
    backgroundColor: "rgba(0, 78, 196, 1)",
    borderRadius: W("3%"),
    padding: W("4%"),
    borderWidth: 1,
    borderColor: "#FFFFFF",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: W("4.5%"),
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
  subtitle: {
    color: "#E0E0E0",
    marginTop: H("0.8%"),
    fontSize: W("3.5%"),
    lineHeight: H("2.5%"),
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
});