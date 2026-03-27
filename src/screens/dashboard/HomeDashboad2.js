import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const DailySnapshot = () => {
  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Daily Snapshot</Text>
          <Text style={styles.date}>Today, July 30</Text>
        </View>

        {/* Mood */}
        <View style={styles.moodContainer}>
          <Text style={styles.emoji}>😊</Text>
          <Text style={styles.moodText}>Your mood was good</Text>
        </View>

        {/* Cards */}
        {[
          {
            title: "Morning Check-in",
            subtitle: "Daily emotion tracker",
            icon: "happy",
            color: "#2ecc71",
          },
          {
            title: "Journal",
            subtitle: "I wrote about my day",
            icon: "book",
            color: "#e74c3c",
          },
          {
            title: "Activities",
            subtitle: "Meditation, Reading",
            icon: "fitness",
            color: "#e74c3c",
          },
        ].map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Icon name={item.icon} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.time}>08:00 AM</Text>
          </View>
        ))}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          {[
            { label: "Check-in", icon: "happy" },
            { label: "Journaling", icon: "book" },
            { label: "Join Pod", icon: "people" },
          ].map((btn, i) => (
            <TouchableOpacity key={i} style={styles.button}>
              <Icon name={btn.icon} size={20} color="#fff" />
              <Text style={styles.buttonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendation */}
        <View style={styles.recommendationBox}>
          <Text style={styles.recTitle}>Recommendation</Text>

          <View style={styles.recItem}>
            <Text style={styles.recText}>
              🌞 Take 3 deep breaths before journaling
            </Text>
          </View>

          <View style={styles.recItem}>
            <Text style={styles.recText}>
              💬 What is something I need to let go of?
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DailySnapshot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  date: {
    color: "#ccc",
    marginTop: 5,
  },
  moodContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  emoji: {
    fontSize: 60,
  },
  moodText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#ccc",
    fontSize: 12,
  },
  time: {
    color: "#aaa",
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#6c5ce7",
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },
  recommendationBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  recTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  recItem: {
    marginBottom: 8,
  },
  recText: {
    color: "#ddd",
    fontSize: 13,
  },
});
