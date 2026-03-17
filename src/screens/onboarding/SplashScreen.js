import React from "react";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import {widthPercentageToDP as W,heightPercentageToDP as H} from "react-native-responsive-screen";
import images from "../../constants/images";
import colors from "../../constants/colors";


const Splashscreen = (props) => {

    return (
        <View style={{ flex: 1 }}>
        <Image source={require("../../assets/images/Splashbackground.jpg")}
                     style={{ height: 700, width: 400 }}
             />

            <RadialGradient
                colors={[
                    "rgba(173, 216, 255, 1)",  
                    "rgba(102, 181, 255, 1)",  
                    "rgba(0, 78, 196, 0.8)",   
                    "rgba(0, 11, 36, 0.3)",    
                ]}
                stops={[0.1, 0.3, 0.7, 1]}
                center={[200, 275]}
                radius={250}
                style={{
                    position: "absolute",
                    top: H('4%'),

                    width :W('100%'),

                    height: H('100%'),
                    opacity: 0.9,
                }}
            />

            <Image source={images.splashLogo} style={{
                position: "absolute",
                height: H('50%'),
                width: W('70%'),
                top: H('20%'),
                left: W('15%'),
                zIndex: 2,
            }} />

            <Text style={{
                color: "white",
                position: "absolute",
                top: H('75%'),
                left: W('25%'),
                fontSize: 20,
                fontStyle: "normal",
                fontFamily: "Poppins-Bold",
                zIndex: 2,
            }}>
                Emotional Wellness,
            </Text>

            <Text style={{
                color: "white",
                position: "absolute",
                top: 505,
                left: 80,
                fontSize: 20,
                fontStyle: "normal",
                fontFamily: "Poppins-Bold",
                zIndex: 2,
            }}>
                One Check-In at a Time
            </Text>

            <View style={{
                position: "absolute",
                zIndex: 2,
            }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Welcome')}>
                    <Text style={{
                        backgroundColor: colors.secondary,
                        top: H('85%'),
                        left: W('25%'),
                        width: W('50%'),
                        height: H('6%'),
                        textAlign: "center",
                        textAlignVertical: "center",
                        borderRadius: 10,
                        fontWeight: "600",
                        fontSize: 16,
                        color: colors.backgroundDark,
                    }}>
                        Get Started
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Splashscreen;
