import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const SettingsScreen = ({ navigation }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const handleSave = () => {
    console.log({
      pushEnabled,
      emailEnabled,
      reminderEnabled,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/*BACK BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{ width: W("6%") }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>General Settings</Text>
        <Text style={styles.subTitle}>
          Manage how you receive alerts and updates.
        </Text>

        {/* Push */}
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>Push Notifications</Text>
            <Text style={styles.desc}>
              Receive important alerts directly on your device.
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Email */}
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>Email Notifications</Text>
            <Text style={styles.desc}>
              Get updates and summaries in your inbox.
            </Text>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Daily Reminder */}
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>Enable Daily Reminders</Text>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Reminder Info */}
        <View style={styles.reminderTimeContainer}>
          <Text style={styles.desc}>
            {reminderEnabled
              ? "Set a specific time for your daily dose of motivation."
              : "Reminders are disabled"}
          </Text>
        </View>

        {/* Time Section */}
        <View
          style={[
            styles.timeContainer,
            !reminderEnabled && { opacity: 0.3 },
          ]}
        >
          <Text style={styles.timeLabel}>Reminder Time</Text>
          <Text style={styles.timeValue}>
            {reminderEnabled ? "08:00 AM" : "Disabled"}
          </Text>
        </View>
      </View>

      {/* SAVE BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: W("4%"),
    paddingVertical: H("1.2%"),
  },

  backBtn: {
    marginTop: H("3%"),
    marginLeft: W("1%"),
  },

  headerTitle: {
    fontSize: W("4%"),
    fontWeight: "600",
    color: "#111827",
  },

  /* CONTENT */
  content: {
    paddingHorizontal: W("5%"),
    marginTop: H("1%"),
  },

  mainTitle: {
    fontSize: W("5.5%"),
    fontWeight: "700",
    color: "#111827",
    marginBottom: H("0.5%"),
  },

  subTitle: {
    fontSize: W("3.5%"),
    color: "#6B7280",
    marginBottom: H("3%"),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: H("3%"),
  },

  textWrap: {
    width: "75%",
  },

  title: {
    fontSize: W("3.9%"),
    fontWeight: "600",
    color: "#111827",
  },

  desc: {
    fontSize: W("3.2%"),
    color: "#6B7280",
    marginTop: H("0.4%"),
  },

  reminderTimeContainer: {
    marginBottom: H("2%"),
  },

  timeContainer: {
    marginTop: -H("1%"),
    marginBottom: H("2%"),
  },

  timeLabel: {
    fontSize: W("3%"),
    color: "#9CA3AF",
  },

  timeValue: {
    fontSize: W("3.3%"),
    color: "#9CA3AF",
    marginTop: H("0.3%"),
  },

  footer: {
    position: "absolute",
    bottom: H("2.5%"),
    left: W("5%"),
    right: W("5%"),
  },

  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: H("1.8%"),
    borderRadius: W("2%"),
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: W("4%"),
    fontWeight: "600",
  },
});