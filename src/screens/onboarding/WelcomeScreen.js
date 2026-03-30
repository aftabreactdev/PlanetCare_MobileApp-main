import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

import images from "../../constants/images";
const Welcomescreen = (props) => {
   return (
      <View style={{ flex: 1 }}>

         <Image source={require("../../assets/images/Splashbackground.jpg")}
            style={{ height: H('100%'), width: W('100%') }}
         />


         <RadialGradient
            colors={[
               "rgba(143, 0, 255, 1)",
               "rgba(143, 0, 250, 0.6)",
               "rgba(160, 80, 220, 0.2)",
               "rgba(200, 120, 255, 0.0)",
            ]}
            stops={[0.2, 0.6, 0.8, 1]}
            center={[W('50%'), H('50%')]}
            radius={W('60%')}
            style={{
               position: "absolute",
               top: H('10%'),
               alignSelf: "center",
               width: W('100%'),
               height: H('40%'),
               // borderRadius: H('40%'),
               opacity: 0.8,
            }}
         />


         <Image
            source={images.welcomeIllustration}
            style={{
               height: H('40%'),
               width: W('55%'),
               position: "absolute",
               top: H('10%'),
               alignSelf: "center",
               zIndex: 2,
            }}
         />


         <View
            style={{
               backgroundColor: "white",
               position: "absolute",
               top: H('50%'),
               width: W('100%'),
               height: H('60%'),
               borderRadius: H('4%'),
               alignSelf: "center",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 3,
               paddingHorizontal: W('3%'),
            }}
         >

            <Text
               style={{
                  fontFamily: "Montserrat-Black",
                  fontWeight: "700",
                  fontSize: H('5%'),
                  textAlign: "center",
                  lineHeight: H('6%'),
                  color: "#030303",
                  marginBottom: H('2%'),
                  bottom: H('4%'),
               }}
            >
               Welcome to{"\n"} PLANET{" "}
               <Text
                  style={{
                     color: "rgba(0,135,218,1)",
                     fontFamily: "Montserrat-Black",
                     fontWeight: "900",


                  }}
               >
                  CARE
               </Text>
            </Text>


            <Text
               style={{
                  fontFamily: "Montserrat-Black",
                  fontWeight: "700",
                  fontSize: H('2.5%'),
                  bottom: H('5%'),
                  fontStyle: "italic",
               }}
            >
               Your space for emotional
            </Text>
            <Text
               style={{
                  fontFamily: "Montserrat-Black",
                  fontWeight: "700",
                  fontSize: H('2.5%'),
                  fontStyle: "italic",
                  bottom: H('4%'),
               }}
            >
               wellbeing
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Role')} style={{

            }}>

               <View>


                  <Image source={require("../../assets/images/yellow.png")} style={{ height: H('7%'), width: W('13%'), alignSelf: "center", bottom: H('2.5%') }} />


               </View>
            </TouchableOpacity>


         </View>
      </View>
   );
};

export default Welcomescreen;