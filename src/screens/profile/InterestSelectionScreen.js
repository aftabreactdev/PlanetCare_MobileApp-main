import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";

const Interests = (props) => {

  const [selectedGoals, setSelectedGoals] = useState([]);


  const goals = [
    { id: 1, type: "icon", icon: "happy-outline", title: "Emotional growth " },
    { id: 2, type: "image", image: require("../../assets/icons/head.png"), title: "Mindfulness" },
    { id: 3, type: "image", image: require("../../assets/icons/hand.png"), title: "Career/Work" },
    { id: 4, type: "icon", icon: "people-outline", title: "Spirituality" },
    { id: 5, type: "image", image: require("../../assets/icons/sitting.png"), title: "Art/Creativity" },
    { id: 6, type: "image", image: require("../../assets/icons/standing.png"), title: "Relationships" },
    { id: 7, type: "icon", icon: "sparkles-outline", title: "Physical wellbeing" },
  ];


  const toggleSelect = (id) => {
    setSelectedGoals((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      if (arr.includes(id)) {
        return arr.filter((x) => x !== id);
      } else {
        return [...arr, id];
      }
    });
  };

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#001A33" }}>

        <Image
             source={require("../../assets/images/Splashbackground.jpg")}
             style={{
               position: "absolute",
               height: "100%",
               width: "100%",
             }}
           />


      <RadialGradient
        colors={[
          "rgba(173, 216, 255, 1)",
          "rgba(102, 181, 255, 1)",
          "rgba(0, 78, 196, 0.8)",
          "rgba(0, 11, 36, 0.3)",
        ]}
        stops={[0.1, 0.3, 0.7, 1]}
        center={[200, 295]}
        radius={310}
        style={{
          position: "absolute",
          top: 400,
          width: W(100),
          height: H(100),
          opacity: 0.8,
        }}
      />
      <View style={{flexDirection:"row",}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="white" style={{ top: 20, left: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login1')}>
            <Entypo name="cross" size={20} color="white" style={{ top: 20, left:300 }} />
        </TouchableOpacity>
      </View>




      <Text
        style={{
          fontSize: 25,
          alignSelf: "center",
          fontWeight: "900",
          marginTop: 20,
          color: "white",
        }}
      >
        Your Interests
      </Text>

      <Text
        style={{
          fontSize: 17,
          alignSelf: "flex-start",
          fontWeight: "bold",
          marginTop: 40,
          marginLeft: 20,
          color: "white",
        }}
      >
        What topics interest you?
      </Text>

      <Text
        style={{
          fontSize: 12,
          alignSelf: "flex-start",
          fontWeight: "400",
          marginTop: 10,
          marginLeft: 20,
          color: "white",
        }}
      >
        We’ll recommend journal prompts and Pods{"\n"} based on this.
      </Text>


      {goals.map((goal) => {
        const isSelected = Array.isArray(selectedGoals) && selectedGoals.includes(goal.id);
        return (
          <TouchableOpacity
            key={goal.id}
            onPress={() => toggleSelect(goal.id)}
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <LinearGradient
              colors={["rgba(0, 11, 36, 0)", "rgba(0, 42, 138, 1)"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderWidth: 1,
                borderRadius: 16,
                height: H(6),
                width: W(80),
                borderColor: "rgba(255, 255, 255, 1)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: isSelected ? "rgba(0, 11, 36, 1)" : "transparent",
              }}
            >
              {/* {goal.type === "icon" ? (
                <Icon name={goal.icon} size={19} color="white" />
              ) : (
                <Image
                  source={goal.image}
                  style={{
                    height: H(4),
                    width: W(6),
                    resizeMode: "contain",
                  }}
                />
              )} */}
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "400",
                }}
              >
                {goal.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}

          <TouchableOpacity onPress={() => props.navigation.navigate('Interests')}
        
                style={{
        
                  position: "absolute",
                  top: H(88),
                  alignSelf: "center",
        
        
                }}>
        
                <View>
        
        
                  <Image source={require("../../assets/images/yellow.png")} style={{ height: 40, width: 40, alignSelf: "center" }} />
        
        
                </View>
              </TouchableOpacity>
    </View>
  );
};

export default Interests;
