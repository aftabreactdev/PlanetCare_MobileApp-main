import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ 
  title, 
  subtitle, 
  onNotificationPress, 
  onProfilePress, 
  profileImage,
  titleStyle = {},
  subtitleStyle = {},
  containerStyle = {},
  iconContainerStyle = {},
  notificationIconStyle = {},
  profileImageStyle = {}
}) => {
  return (
    <View style={[{ marginBottom: 0, flex: 1 }, containerStyle]}>
      {/* Icons */}
      <View
        style={[
          {
            position: "absolute",
            right: 20,
            flexDirection: "row",
            marginTop: 10,
            zIndex: 10,
          },
          iconContainerStyle
        ]}
      >
        <TouchableOpacity style={{ marginRight: 15 }} onPress={onNotificationPress}>
          <Icon name="notifications" size={24} color="#fff" style={notificationIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress}>
          <Image
            source={profileImage}
            style={[{ width: 36, height: 36, borderRadius: 18 }, profileImageStyle]}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[
        { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 40, left: 20 },
        titleStyle
      ]}>
        {title}
      </Text>
      
      {subtitle && (
        <Text style={[
          { color: "#fff", marginTop: 5, alignSelf: "center", fontWeight: "600", fontSize: 15 },
          subtitleStyle
        ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default Header;