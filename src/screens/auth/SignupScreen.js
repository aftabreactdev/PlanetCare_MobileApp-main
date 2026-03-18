import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import {widthPercentageToDP as W,heightPercentageToDP as H} from "react-native-responsive-screen";

import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/Ionicons";

const SignupScreen = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
          stops={[0.1, 0.6, 0.9, 1]}
          center={[200, 200]}
          radius={200}
          style={{
            position: "absolute",
            top: H("10%"),
            alignSelf: "center",
            width:W("100%"),
            height: H("100%"),
            borderRadius: H("20%"),
          }}
        />
          <View style={{flexDirection:"row",position:"absolute"}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icons name="arrow-back" size={20} color="white" style={{ top: 20, left: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login1')}>
            <Entypo name="cross" size={20} color="white" style={{ top: 20, left:300 }} />
        </TouchableOpacity>
      </View>

        <Text
          style={{
            color: "white",
            position: "absolute",
            top: 40,
            alignSelf: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Create Account
        </Text>

        <Text
          style={{
            color: "white",
            position: "absolute",
            top: 90,
            alignSelf: "center",
            fontSize: 15,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Fill your information below or register with{"\n"}your social account
        </Text>

        {/* White Form Card */}
        <View
          style={{
            backgroundColor: "white",
            height:H("80%"),
            width: W("100%"),
            position: "absolute",
            top: H("25%"),
            borderRadius: 30,
            alignSelf: "center",

          }}
        >

          <Text
            style={{
              fontSize: 25,
              alignSelf: "center",
              fontWeight: "900",


            }}
          >
            Sign Up
          </Text>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              alignSelf: "center",
              width: 250,
            }}
          >
            <Icon name="user" size={14} color="black" />
            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 14 }}>Full Name</Text>
          </View>
          <TextInput
            style={{
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: "rgba(217, 217, 217, 1)",
              width:W("70%"),
              fontSize: 13,
              bottom: 5
            }}
            placeholder="Daniel Park"
          />

          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              alignSelf: "center",
              width: 250,
            }}
          >
            <Icon name="envelope" size={14} color="black" />
            <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Email</Text>
          </View>
          <TextInput
            style={{
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: "rgba(217, 217, 217, 1)",
              width: W("70%"),
              fontSize: 13, bottom: 5

            }}
            placeholder="example@gmail.com"
          />

          {/* Password */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              alignSelf: "center",
              width: 250,
            }}
          >
            <Icon name="lock" size={14} color="black" />
            <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Password</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "rgba(217, 217, 217, 1)",
              width: W("70%"),
              alignSelf: "center", bottom: 15

            }}
          >
            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 5,
                paddingVertical: 15,
                fontSize: 13,
              }}
              placeholder="................"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                size={13}
                color="#888"
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              alignSelf: "center",
              width: W("70%"),
            }}
          >
            <Icon name="lock" size={14} color="black" />
            <Text style={{ fontWeight: "bold", marginLeft: 8 }}>
              Confirm Password
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "rgba(217, 217, 217, 1)",
              width: W("70%"),
              alignSelf: "center",

            }}
          >
            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 8,
                fontSize: 13,
              }}
              placeholder="................"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? "eye-slash" : "eye"}
                size={13}
                color="#888"
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: "row",
            left:40,
            top:10
          }}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={{
                width: 15,
                height: 15,
                borderWidth: 1.5,
                borderColor: "#555",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 4,
                borderRadius: 4,
              }}
            >
              {isChecked && (
                <Text style={{ textAlignVertical:"center",fontSize: 10, color: "white",backgroundColor:"rgba(143, 0, 255, 1)" , width:15,textAlign:"center",height:15}}>✔</Text>
              )}
            </TouchableOpacity>
            <Text style={{
              fontSize:13
            }}>Agree with</Text>
            <View>
              <TouchableOpacity >
                <Text style={{ color: "blue", textDecorationLine: "underline",fontSize:13 }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 40,
              backgroundColor: "rgba(255, 215, 0, 1)",
              height: 35,
              width: 250,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => props.navigation.navigate('MoodSelection')}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              width:200,
              left:80
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(217, 217, 217, 1)",
                marginHorizontal: 10,
              }}
            />
            <Text style={{ color: "gray", fontSize: 12 }}>or sign up with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(217, 217, 217, 1)",
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* Social Icons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 15,
              marginTop: 15,
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/google.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/facebook.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/apple.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "gray" }}>Already have an account? </Text>
            <TouchableOpacity  onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  color: "rgba(0, 153, 255, 1)",
                  fontSize: 11,
                  textDecorationLine: "underline",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
  );
};

export default SignupScreen;
