import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: screenWidth } = Dimensions.get("window");

const ActionButtons = () => {
    // Responsive sizing based on screen width
    const buttonWidth = screenWidth * 0.28; // 28% of screen width
    const buttonHeight = screenWidth * 0.22; // Proportional height
    const iconSize = screenWidth * 0.055; // Responsive icon size
    const fontSize = screenWidth * 0.032; // Responsive font size
    const borderRadius = screenWidth * 0.035; // Responsive border radius
    const marginTop = screenWidth * 0.04;

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-evenly", // Better spacing for responsiveness
                marginHorizontal: screenWidth * 0.05,
                marginTop: marginTop,
            }}
        >
            {[
                { label: "Check-in", icon: <Icon name="happy-outline" size={iconSize} color="#fff" /> },
                { label: "Journaling", icon: <Icon name="document-text-outline" size={iconSize} color="#fff" /> },
                { label: "Join Pod", icon: <Icons name="crowd" size={iconSize} color="#fff" /> },
            ].map((item, i) => (
                <TouchableOpacity 
                    key={i} 
                    style={{ 
                        width: buttonWidth,
                        // Pixel perfect: remove any unexpected spacing
                        padding: 0,
                        margin: 0,
                    }}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={["rgba(143, 0, 255, 0.5)", "rgba(0, 42, 138, 1)"]}
                        style={{
                            height: buttonHeight,
                            borderRadius: borderRadius,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "white",
                            // Pixel perfect: explicit border radius values
                            borderTopRightRadius: borderRadius,
                            borderTopLeftRadius: borderRadius,
                            borderBottomEndRadius: borderRadius,
                            borderBottomLeftRadius: borderRadius,
                            // Fix for Android pixel rounding issues
                            ...Platform.select({
                                android: {
                                    borderWidth: 1,
                                    elevation: 0,
                                },
                            }),
                        }}
                    >
                        {item.icon}
                        <Text 
                            style={{ 
                                color: "#fff", 
                                marginTop: screenWidth * 0.015, 
                                fontSize: fontSize,
                                // Pixel perfect: ensure text doesn't wrap
                                textAlign: "center",
                                includeFontPadding: false,
                                ...Platform.select({
                                    android: {
                                        textAlignVertical: "center",
                                    },
                                }),
                            }}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            minimumFontScale={0.8}
                        >
                            {item.label}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ActionButtons;