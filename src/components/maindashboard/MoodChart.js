import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  values: [1, 3, 5, 4, 4, 4, 5],
};

const MoodChart = () => {
  // Responsive sizing
  const marginHorizontal = screenWidth * 0.05;
  const marginTop = screenHeight * 0.012;
  const titleFontSize = screenWidth * 0.05;
  const titleMarginBottom = screenHeight * 0.012;
  const chartHeight = screenHeight * 0.26;
  const chartPadding = screenWidth * 0.04;
  const chartBorderRadius = screenWidth * 0.04;
  const yAxisMarginRight = screenWidth * 0.025;
  const yAxisFontSize = screenWidth * 0.03;
  const barWidth = screenWidth * 0.018;
  const barBorderRadius = barWidth / 2;
  const xAxisMarginTop = screenHeight * 0.008;
  const xAxisPaddingLeft = screenWidth * 0.1;
  const xAxisFontSize = screenWidth * 0.03;
  const maxBarHeight = chartHeight - chartPadding * 2;
  const maxValue = Math.max(...data.values);
  const barHeightMultiplier = maxBarHeight / maxValue;

  return (
    <View style={{ 
      marginHorizontal: marginHorizontal, 
      marginTop: marginTop 
    }}>
      {/* Title */}
      <Text 
        style={{ 
          color: "#fff", 
          fontSize: titleFontSize, 
          marginBottom: titleMarginBottom, 
          fontWeight: "600",
          includeFontPadding: false,
          ...Platform.select({
            android: {
              textAlignVertical: "center",
            },
          }),
        }}
      >
        Mood Summary
      </Text>

      {/* Chart Box */}
      <View
        style={{
          height: chartHeight,
          backgroundColor: "rgba(27, 44, 87, 0.6)",
          borderRadius: chartBorderRadius,
          padding: chartPadding,
          flexDirection: "row",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "white",
          // Pixel perfect: prevent any internal spacing issues
        }}
      >
        {/* Y Axis */}
        <View style={{ 
          justifyContent: "space-between", 
          marginRight: yAxisMarginRight,
          height: "100%",
        }}>
          {["Happy", "Alright", "Meh", "Sad", "Unhappy"].map((l, i) => (
            <Text 
              key={i} 
              style={{ 
                color: "#fff", 
                fontSize: yAxisFontSize,
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
              {l}
            </Text>
          ))}
        </View>

        {/* Chart Area */}
        <View style={{ flex: 1 }}>

          {/* GRID LINES */}
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
                  backgroundColor: i === 4 ? "#fff" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </View>

          {/* BARS */}
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
                  width: barWidth,
                  height: v * barHeightMultiplier,
                  backgroundColor: "#E0E0E0",
                  borderRadius: barBorderRadius,
                  // Pixel perfect: ensure bars align properly
                  minHeight: 1,
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
          marginTop: xAxisMarginTop,
          paddingLeft: xAxisPaddingLeft,
        }}
      >
        {data.labels.map((l, i) => (
          <Text 
            key={i} 
            style={{ 
              color: "#fff", 
              fontSize: xAxisFontSize,
              includeFontPadding: false,
              textAlign: "center",
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
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MoodChart;