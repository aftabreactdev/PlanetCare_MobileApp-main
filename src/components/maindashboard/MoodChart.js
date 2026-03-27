import React from "react";
import { View, Text } from "react-native";

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  values: [1, 3, 5, 4, 4, 4, 5],
};

const MoodChart = () => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
      
      {/* Title */}
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 10, fontWeight: "600" }}>
        Mood Summary
      </Text>

      {/* Chart Box */}
      <View
        style={{
          height: 220,
          backgroundColor: "rgba(27, 44, 87, 0.6)",
          borderRadius: 16,
          padding: 15,
          flexDirection: "row",
          overflow: "hidden",
        borderWidth:1,
        borderColor:"white",
        }}
      >
        {/* Y Axis */}
        <View style={{ justifyContent: "space-between", marginRight: 10 }}>
          {["Happy", "Alright", "Meh", "Sad", "Unhappy"].map((l, i) => (
            <Text key={i} style={{ color: "#fff", fontSize: 12 }}>
              {l}
            </Text>
          ))}
        </View>

        {/* Chart Area */}
        <View style={{ flex: 1 }}>

          {/* ✅ GRID LINES */}
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "space-between",
            }}
          >
            {[1, 2, 3, 4, 5].map((_, i) => (
              <View
                key={i}
                style={{
                  height: 1,
                  backgroundColor:
                    i === 4 ? "#fff" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </View>

          {/* ✅ BARS */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {data.values.map((v, i) => (
              <View
                key={i}
                style={{
                  width: 6,
                  height: v * 30,
                  backgroundColor: "#E0E0E0",
                  borderRadius: 3,
                }}
              />
            ))}
          </View>
        </View>
      </View>

      {/* X Axis */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
          paddingLeft: 40,
        }}
      >
        {data.labels.map((l, i) => (
          <Text key={i} style={{ color: "#fff", fontSize: 12 }}>
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MoodChart;