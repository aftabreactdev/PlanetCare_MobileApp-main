import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RadialGradient from "react-native-radial-gradient";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";

const MoodSelection = (props) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    { id: 1, type: "icon", icon: "happy-outline", title: "Reduce stress" },
    {
      id: 2,
      type: "image",
      image: require("../../assets/icons/head.png"),
      title: "Improve self-awareness",
    },
    {
      id: 3,
      type: "image",
      image: require("../../assets/icons/hand.png"),
      title: "Stay motivated",
    },
    { id: 4, type: "icon", icon: "people-outline", title: "Feel more connected" },
    {
      id: 5,
      type: "image",
      image: require("../../assets/icons/sitting.png"),
      title: "Manage anxiety",
    },
    {
      id: 6,
      type: "image",
      image: require("../../assets/icons/standing.png"),
      title: "Sleep better",
    },
    { id: 7, type: "icon", icon: "sparkles-outline", title: "Build confidence" },
  ];

  // ✅ Limit selection to max 3
  const toggleSelect = (id) => {
    setSelectedGoals((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        if (prev.length >= 3) return prev; // limit
        return [...prev, id];
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#001A33" }}>
      
     
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Gradient */}
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

        {/* Header */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={22}
              color="white"
              style={{ marginTop: 20, marginLeft: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login1")}
            style={{ marginLeft: "auto", marginRight: 20, marginTop: 20 }}
          >
            <Entypo name="cross" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 25,
            alignSelf: "center",
            fontWeight: "900",
            marginTop: 20,
            color: "white",
          }}
        >
          Mood Goals
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 17,
            marginTop: 30,
            marginLeft: 20,
            color: "white",
            fontWeight: "600",
          }}
        >
          What emotional goals are{"\n"}you working on?
        </Text>

        <Text
          style={{
            fontSize: 12,
            marginTop: 10,
            marginLeft: 20,
            color: "white",
          }}
        >
          Choose 1–3 goals to help Planet Care support your journey.
        </Text>

        {/* ✅ LIST (Now working properly) */}
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);

          return (
            <TouchableOpacity
              key={goal.id}
              onPress={() => toggleSelect(goal.id)}
              style={{ alignItems: "center", marginTop: 12 }}
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
                  borderColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  backgroundColor: isSelected ? "#000B24" : "transparent",
                }}
              >
                {goal.type === "icon" ? (
                  <Icon name={goal.icon} size={20} color="white" />
                ) : (
                  <Image
                    source={goal.image}
                    style={{
                      height: H(4),
                      width: W(6),
                      resizeMode: "contain",
                    }}
                  />
                )}

                <Text style={{ color: "white", fontSize: 14 }}>
                  {goal.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        {/* Bottom Button */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("InterestSelection")}
          style={{
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          <Image
            source={require("../../assets/images/yellow.png")}
            style={{
              height: H("7%"),
              width: W("13%"),
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoodSelection;