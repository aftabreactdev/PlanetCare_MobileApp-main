import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // ✅ ADD THIS

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const PrivacyScreen = () => {
    const navigation = useNavigation(); 
  
  const [checkInVisible, setCheckInVisible] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
             {/*BACK BUTTON */}
             <TouchableOpacity
               onPress={() => navigation.goBack()}
               style={styles.backBtn}
             >
               <Icon name="arrow-back" size={22} color="#000" />
             </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>

        <View style={styles.iconBox} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Journal Visibility</Text>
        <Text style={styles.desc}>
          Control who can view your journal entries.
        </Text>

        {/* EXACT DROPDOWNS */}
        <View style={styles.dropdownRow}>
          
          {/* LEFT */}
          <TouchableOpacity style={styles.dropdownLeft}>
            <Text style={styles.leftText}>Daily</Text>
          </TouchableOpacity>

          {/* RIGHT */}
          <TouchableOpacity style={styles.dropdownRight}>
            <Text style={styles.rightText}>Only Me</Text>
            <Icon name="chevron-down" size={W("3.8%")} color="#A1A1AA" />
          </TouchableOpacity>

        </View>
      </View>

      {/* CARD 2 */}
      <View style={styles.card}>
        <Text style={styles.title}>Check-in Visibility</Text>
        <Text style={styles.desc}>
          Determine who sees your check-in locations.
        </Text>

        <View style={styles.row}>
          <Text style={styles.leftText}>Visible</Text>
          <Switch
            value={checkInVisible}
            onValueChange={setCheckInVisible}
            trackColor={{ false: "#E5E7EB", true: "#34C759" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* CARD 3 */}
      <View style={styles.card}>
        <Text style={styles.title}>Data Sharing for Org Insights</Text>
        <Text style={styles.desc}>
          Allow anonymous data sharing to improve organizational insights.
        </Text>

        <View style={styles.row}>
          <Text style={styles.leftText}>Enabled</Text>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: "#E5E7EB", true: "#34C759" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: W("4%"),
  },

  header: {
    marginTop: H("6%"),
    marginBottom: H("2%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    width: W("6%"),
  },

  headerTitle: {
    fontSize: W("4.5%"),
    fontWeight: "600",
    color: "#111",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: W("3%"),
    padding: W("4%"),
    marginBottom: H("1.5%"),
  },

  title: {
    fontSize: W("3.9%"),
    fontWeight: "600",
    color: "#111",
    marginBottom: H("0.4%"),
  },

  desc: {
    fontSize: W("3.2%"),
    color: "#6B7280",
    marginBottom: H("1.3%"),
    lineHeight: H("2%"),
  },

  /* 🔥 PERFECT DROPDOWN */
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownLeft: {
    width: "48.5%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: W("2.2%"),
    paddingVertical: H("1%"),
    paddingHorizontal: W("3%"),
    justifyContent: "center",
  },

  dropdownRight: {
    width: "48.5%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: W("2.2%"),
    paddingVertical: H("1%"),
    paddingHorizontal: W("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftText: {
    fontSize: W("3.5%"),
    color: "#111",
  },

  rightText: {
    fontSize: W("3.4%"),
    color: "#9CA3AF",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footer: {
    marginTop: "auto",
    marginBottom: H("2%"),
  },

  button: {
    backgroundColor: "#2F80ED",
    paddingVertical: H("1.6%"),
    borderRadius: W("2.8%"),
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: W("3.9%"),
    fontWeight: "600",
  },
});