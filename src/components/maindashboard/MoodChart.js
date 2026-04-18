import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const DEFAULT_DATA = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  values: [1, 3, 5, 4, 2, 4, 5],
  yLabels: ["Happy", "Alright", "Meh", "Sad", "Unhappy"],
};

const MoodChart = ({
  chartData = DEFAULT_DATA,
  title = "Mood Summary",
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.stateBox}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={styles.stateText}>Loading mood data...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>Something went wrong</Text>
        </View>
      </View>
    );
  }

  const labels =
    Array.isArray(chartData?.labels) && chartData.labels.length > 0
      ? chartData.labels
      : DEFAULT_DATA.labels;

  const values =
    Array.isArray(chartData?.values) && chartData.values.length > 0
      ? chartData.values
      : DEFAULT_DATA.values;

  const yAxisLabels =
    Array.isArray(chartData?.yLabels) && chartData.yLabels.length > 0
      ? chartData.yLabels
      : DEFAULT_DATA.yLabels;

  if (!values.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>No mood data available</Text>
        </View>
      </View>
    );
  }

  const maxValue = Math.max(...values, 1);

  const getBarHeight = (value) => {
    const maxBarHeight = H("18%");
    return Math.max((value / maxValue) * maxBarHeight, H("0.8%"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.chartBox}>
        {/* Y Axis */}
        <View style={styles.yAxis}>
          {yAxisLabels.map((label, index) => (
            <Text
              key={index}
              style={styles.yAxisText}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {label}
            </Text>
          ))}
        </View>

        {/* Chart Area */}
        <View style={styles.chartArea}>
          {/* Grid Lines */}
          <View style={styles.gridWrapper}>
            {yAxisLabels.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.gridLine,
                  index === yAxisLabels.length - 1 ? styles.bottomGridLine : null,
                ]}
              />
            ))}
          </View>

          {/* Bars */}
          <View style={styles.barsRow}>
            {values.map((value, index) => (
              <View key={index} style={styles.singleBarWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: getBarHeight(value),
                    },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* X Axis */}
      <View style={styles.xAxis}>
        {labels.map((label, index) => (
          <Text
            key={index}
            style={styles.xAxisText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MoodChart;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: W("5%"),
    marginTop: H("1.2%"),
  },
  title: {
    color: "#FFFFFF",
    fontSize: W("5%"),
    marginBottom: H("1.2%"),
    fontWeight: "600",
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
  chartBox: {
    height: H("26%"),
    backgroundColor: "rgba(27, 44, 87, 0.6)",
    borderRadius: W("4%"),
    padding: W("4%"),
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  yAxis: {
    justifyContent: "space-between",
    marginRight: W("2.5%"),
    height: "100%",
    width: W("16%"),
  },
  yAxisText: {
    color: "#FFFFFF",
    fontSize: W("3%"),
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
  chartArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gridWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
  },
  gridLine: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bottomGridLine: {
    backgroundColor: "#FFFFFF",
  },
  barsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  singleBarWrapper: {
    width: W("5%"),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: W("1.8%"),
    backgroundColor: "#E0E0E0",
    borderRadius: W("1%"),
  },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: H("0.8%"),
    paddingLeft: W("18%"),
    paddingRight: W("1%"),
  },
  xAxisText: {
    color: "#FFFFFF",
    fontSize: W("3%"),
    textAlign: "center",
    width: W("7%"),
    includeFontPadding: false,
    ...(Platform.OS === "android"
      ? { textAlignVertical: "center" }
      : {}),
  },
  stateBox: {
    height: H("18%"),
    borderRadius: W("4%"),
    backgroundColor: "rgba(27, 44, 87, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: W("5%"),
  },
  stateText: {
    color: "#FFFFFF",
    fontSize: W("4%"),
    marginTop: H("1%"),
    textAlign: "center",
  },
});