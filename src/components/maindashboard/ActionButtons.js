import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const DEFAULT_ACTIONS = [
  { label: "Check-in", icon: "happy-outline", type: "ion", key: "checkin" },
  { label: "Journaling", icon: "document-text-outline", type: "ion", key: "journal" },
  { label: "Join Pod", icon: "account-group", type: "material", key: "pod" },
];

const ActionButtons = ({ actions = DEFAULT_ACTIONS, onPress }) => {
  const handlePress = (item) => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((item) => {
        const IconComponent =
          item.type === "material" ? Icons : Icon;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.buttonWrapper}
            activeOpacity={0.85}
            onPress={() => handlePress(item)}
          >
            <LinearGradient
              colors={["rgba(143, 0, 255, 0.5)", "rgba(0, 42, 138, 1)"]}
              style={styles.button}
            >
              <IconComponent
                name={item.icon}
                size={W("6%")}
                color="#fff"
              />

              <Text style={styles.label} numberOfLines={1}>
                {item.label}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: W("5%"),
    marginTop: H("3%"),
  },

  buttonWrapper: {
    width: W("28%"),
  },

  button: {
    height: H("10%"),
    borderRadius: W("4%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },

  label: {
    color: "#FFFFFF",
    marginTop: H("0.8%"),
    fontSize: W("3.2%"),
    textAlign: "center",
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
});