import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const AffirmationCard = () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: "rgba(0, 78, 196, 1)",
          borderRadius: 12,
          padding: 15,
           borderWidth:1,
        borderColor:"white",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Affirmation of the Day
        </Text>
        <Text style={{ color: "#E0E0E0", marginTop: 4 }}>
          I am safe, I am growing
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AffirmationCard;