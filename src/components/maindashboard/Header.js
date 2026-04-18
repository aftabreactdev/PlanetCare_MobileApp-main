import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  user,
  notificationCount = 0,
  onPressNotification,
  onPressProfile,
}) => {
  const navigation = useNavigation();

  const currentHour = new Date().getHours();
  const isMorning = currentHour < 12;

  const greetingText = useMemo(() => {
    if (user?.greeting) return user.greeting;
    return isMorning ? "Good Morning" : "Good Evening";
  }, [user?.greeting, isMorning]);

  const backgroundImage = useMemo(() => {
    if (user?.headerBackground) {
      return { uri: user.headerBackground };
    }

    return isMorning
      ? require("../../assets/images/morning.jpg")
      : require("../../assets/images/evening.png");
  }, [user?.headerBackground, isMorning]);

  const profileImage = useMemo(() => {
    if (user?.profileImage) {
      return { uri: user.profileImage };
    }

    return require("../../assets/images/profile.png");
  }, [user?.profileImage]);

  const userName = user?.fullName || "Nauman Tariq";
  const iconColor = isMorning ? "#111" : "#FFF";

  const handleNotificationPress = () => {
    if (onPressNotification) {
      onPressNotification();
      return;
    }
    navigation.navigate("NotificationItem");
  };

  const handleProfilePress = () => {
    if (onPressProfile) {
      onPressProfile();
      return;
    }
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <View style={styles.topRight}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNotificationPress}
          style={styles.iconSpacing}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View>
            <Icon name="notifications" size={W("6%")} color={iconColor} />

            {notificationCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={handleProfilePress}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText} numberOfLines={1}>
          {greetingText}
        </Text>

        <Text style={styles.nameText} numberOfLines={1}>
          {userName}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: H("35%"),
    borderBottomLeftRadius: W("5%"),
    borderBottomRightRadius: W("5%"),
    overflow: "hidden",
    backgroundColor: "#000",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  topRight: {
    position: "absolute",
    top: H("5%"),
    right: W("5%"),
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: W("4%"),
  },
  profileImage: {
    width: W("9%"),
    height: W("9%"),
    borderRadius: W("4.5%"),
    ...(Platform.OS === "android" ? { borderWidth: 0 } : {}),
  },
  greetingContainer: {
    position: "absolute",
    bottom: H("3%"),
    left: W("5%"),
    width: W("65%"),
  },
  greetingText: {
    color: "#FFF",
    fontSize: W("4.5%"),
    includeFontPadding: false,
    ...(Platform.OS === "android" ? { textAlignVertical: "center" } : {}),
  },
  nameText: {
    color: "#FFF",
    fontSize: W("6%"),
    fontWeight: "700",
    marginTop: H("0.5%"),
    includeFontPadding: false,
    ...(Platform.OS === "android" ? { textAlignVertical: "center" } : {}),
  },
  badge: {
    position: "absolute",
    top: -H("0.8%"),
    right: -W("2%"),
    minWidth: W("4.5%"),
    height: W("4.5%"),
    borderRadius: W("2.25%"),
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: W("0.8%"),
  },
  badgeText: {
    color: "#FFF",
    fontSize: W("2.4%"),
    fontWeight: "700",
  },
});