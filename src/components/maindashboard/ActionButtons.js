import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const ActionButtons = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 15,
            }}
        >
            {[
                { label: "Check-in", icon: <Icon name="happy-outline" size={22} color="#fff" /> },
                { label: "Journaling", icon: <Icon name="document-text-outline" size={22} color="#fff" /> },
                { label: "Join Pod", icon: <Icons name="crowd" size={22} color="#fff" /> },
            ].map((item, i) => (
                <TouchableOpacity key={i} style={{ width: "30%" }}>
                    <LinearGradient
                        colors={["rgba(143,0,255,0.5)", "rgba(0,42,138,1)"]}
                        style={{
                            height: 90,
                            borderRadius: 14,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "white",
                            borderTopRightRadius: 14,
                            borderTopLeftRadius: 14,
                            borderBottomEndRadius: 14,
                            borderBottomLeftRadius: 14
                        }}
                    >
                        {item.icon}
                        <Text style={{ color: "#fff", marginTop: 6, fontSize: 12 }}>
                            {item.label}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ActionButtons;