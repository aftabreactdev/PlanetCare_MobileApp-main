import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";

const Interests = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    { id: 1, title: "Emotional growth" },
    { id: 2, title: "Mindfulness" },
    { id: 3, title: "Career / Work" },
    { id: 4, title: "Spirituality" },
    { id: 5, title: "Art / Creativity" },
    { id: 6, title: "Relationships" },
    { id: 7, title: "Physical wellbeing" },
  ];

  const toggleSelect = (id) => {
    setSelectedGoals((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const isEnabled = selectedGoals.length > 0;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Splashbackground.jpg")}
        style={styles.background}
      />

      <LinearGradient
        colors={[
          "rgba(0, 15, 40, 0.35)",
          "rgba(0, 23, 60, 0.55)",
          "rgba(0, 12, 36, 0.82)",
        ]}
        style={styles.overlay}
      />

      <LinearGradient
        colors={[
          "rgba(103, 190, 255, 0.22)",
          "rgba(46, 112, 255, 0.18)",
          "rgba(0, 0, 0, 0)",
        ]}
        style={styles.topGlow}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login1")}
            activeOpacity={0.8}
          >
            <Entypo name="cross" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Your Interests</Text>

        <Text style={styles.subtitle}>
          What topics interest you?
        </Text>

        <Text style={styles.helper}>
          We’ll recommend journal prompts and Pods{"\n"}based on this.
        </Text>

        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);

          return (
            <TouchableOpacity
              key={goal.id}
              onPress={() => toggleSelect(goal.id)}
              activeOpacity={0.85}
              style={styles.goalWrapper}
            >
              <LinearGradient
                colors={
                  isSelected
                    ? ["rgba(47, 111, 255, 0.95)", "rgba(0, 61, 163, 0.95)"]
                    : ["rgba(255,255,255,0.14)", "rgba(255,255,255,0.08)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.goalCard, isSelected && styles.selectedCard]}
              >
                <View style={styles.goalContent}>
                  <Text style={styles.goalText}>{goal.title}</Text>
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    isSelected && styles.checkCircleSelected,
                  ]}
                >
                  {isSelected ? (
                    <Ionicons name="checkmark" size={14} color="#0B2A66" />
                  ) : null}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

         {/* Button */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProfileSetup")}
                    activeOpacity={0.85}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/yellow.png")}
                      style={{
                        height: H("8%"),
                        width: W("16%"),
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Interests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02162E",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topGlow: {
    position: "absolute",
    top: 0,
    width: W("100%"),
    height: H("35%"),
  },
  scroll: {
    paddingTop: H("6%"),
    paddingHorizontal: W("5%"),
    paddingBottom: H("6%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: H("2%"),
  },
  title: {
    fontSize: W("8%"),
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: H("2%"),
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: W("5%"),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: H("1.2%"),
    lineHeight: H("3.6%"),
  },
  helper: {
    fontSize: W("3.6%"),
    color: "rgba(255,255,255,0.82)",
    marginBottom: H("3%"),
    lineHeight: H("2.8%"),
  },
  goalWrapper: {
    alignItems: "center",
    marginBottom: H("1.6%"),
  },
  goalCard: {
    width: W("86%"),
    minHeight: H("7%"),
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: W("4.5%"),
    paddingVertical: H("1.6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },
  selectedCard: {
    borderColor: "rgba(165, 215, 255, 0.9)",
  },
  goalContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  goalText: {
    fontSize: W("4%"),
    color: "#FFFFFF",
    fontWeight: "600",
    flexShrink: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  button: {
    marginTop: H("4%"),
    alignSelf: "center",
    width: W("72%"),
    height: H("6.3%"),
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6D400",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#FFE680",
  },
  buttonText: {
    fontSize: W("4.2%"),
    fontWeight: "700",
    color: "#111111",
  },
});