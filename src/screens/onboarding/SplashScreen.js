import React from "react";
import { Image, Text, View, TouchableOpacity, StatusBar } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import images from "../../constants/images";
import colors from "../../constants/colors";

const Splashscreen = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
            <StatusBar hidden={true} />
            
            {/* Background Image */}
            <Image 
                source={require("../../assets/images/Splashbackground.jpg")}
                style={{ 
                    position: "absolute",
                    width: W('100%'),
                    height: H('100%'),
                    resizeMode: "cover"
                }}
            />

            {/* Radial Gradient Overlay */}
            <RadialGradient
                colors={[
                    "rgba(173, 216, 255, 1)",  
                    "rgba(102, 181, 255, 1)",  
                    "rgba(0, 78, 196, 0.8)",   
                    "rgba(0, 11, 36, 0.3)",    
                ]}
                stops={[0.1, 0.3, 0.7, 1]}
                center={[W('50%'), H('35%')]}
                radius={W('80%')}
                style={{
                    position: "absolute",
                    width: W('100%'),
                    height: H('100%'),
                    opacity: 0.9,
                    top: H('0%'),
                }}
            />

            {/* Logo */}
            <Image 
                source={images.splashLogo} 
                style={{
                    position: "absolute",
                    height: H('55%'),
                    width: W('70%'),
                    top: H('15%'),
                    left: W('15%'),
                    zIndex: 2,
                    resizeMode: "contain",
                }}
            />

            {/* First Text Line */}
            <Text style={{
                color: "white",
                position: "absolute",
                top: H('70%'),
                width: W('100%'),
                textAlign: "center",
                fontSize: H('2.8%'),
                fontFamily: "Poppins-Bold",
                fontWeight: "600",
                zIndex: 2,
                paddingHorizontal: W('5%'),
            }}>
                Emotional Wellness,
            </Text>

            {/* Second Text Line */}
            <Text style={{
                color: "white",
                position: "absolute",
                top: H('75%'),
                width: W('100%'),
                textAlign: "center",
                fontSize: H('2.8%'),
                fontFamily: "Poppins-Bold",
                fontWeight: "600",
                zIndex: 2,
                paddingHorizontal: W('5%'),
            }}>
                One Check-In at a Time
            </Text>

            {/* Get Started Button */}
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate('Welcome')}
                style={{
                    position: "absolute",
                    zIndex: 2,
                    bottom: H('8%'),
                    alignSelf: "center",
                    width: W('60%'),
                    minWidth: 200,
                    maxWidth: 300,
                }}
            >
                <View style={{
                    backgroundColor: colors.secondary,
                    paddingVertical: H('2%'),
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: H('6%'),
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Text style={{
                        color: colors.backgroundDark,
                        fontWeight: "700",
                        fontSize: H('2.2%'),
                        textAlign: "center",
                    }}>
                        Get Started
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Splashscreen;