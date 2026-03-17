import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

import images from "../../constants/images";
const Welcomescreen = (props) => {
   return (
      <View>

         <Image source={require("../../assets/images/Splashbackground.jpg")}
            style={{ height: 700, width: 400 }}
         />


         <RadialGradient
            colors={[
               "rgba(143, 0, 255, 1)",
               "rgba(143, 0, 250, 0.6)",
               "rgba(160, 80, 220, 0.2)",
               "rgba(200, 120, 255, 0.0)",
            ]}
            stops={[0.1, 0.4, 0.8, 1]}
            center={[200, 200]}
            radius={200}
            style={{
               position: "absolute",
               top: 150,
               alignSelf: "center",
               width: W('100%'),
               height: H('40%'),
               borderRadius: H('40%'),
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
               borderRadius: 30,
               alignSelf: "center",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 3,
               paddingHorizontal: 10,
            }}
         >

            <Text
               style={{
                  fontFamily: "Montserrat-Black",
                  fontWeight: "900",
                  fontSize: 40,
                  textAlign: "center",
                  lineHeight: 46.6,
                  color: "#030303",
                  marginBottom: 15,
                  bottom: 35,
               }}
            >
               Welcome to PLANET{" "}
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
                  fontSize: 20,
                  bottom: 40,
                  fontStyle: "italic",
               }}
            >
               Your space for emotional
            </Text>
            <Text
               style={{
                  fontFamily: "Montserrat-Black",
                  fontWeight: "700",
                  fontSize: 20,
                  fontStyle: "italic",
                  bottom: 35,
               }}
            >
               wellbeing
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Role')} style={{

            }}>

               <View>


                  <Image source={require("../../assets/images/yellow.png")} style={{ height: H('7%'), width: W('13%'), alignSelf: "center", bottom: 20 }} />


               </View>
            </TouchableOpacity>


         </View>
      </View>
   );
};

export default Welcomescreen;
