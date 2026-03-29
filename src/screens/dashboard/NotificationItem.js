import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/Ionicons";

const notificationsRecent = [
  { type: "warning", title: "Server usage at 90%. Consider scaling up.", time: "2 hours ago" },
  { type: "info", title: "New update available for User Management module.", time: "Yesterday" },
  { type: "success", title: "Engagement Pod 'Wellness Warriors' reached 100%........", time: "2 days ago" },
  { type: "alert", title: "New employee onboarding completed for 5 users.", time: "3 days ago" },

  // repeat like UI
  { type: "warning", title: "Server usage at 90%. Consider scaling up.", time: "2 hours ago" },
  { type: "info", title: "New update available for User Management module.", time: "Yesterday" },
  { type: "success", title: "Engagement Pod 'Wellness Warriors' reached 100%........", time: "2 days ago" },
];

const notificationsLastWeek = [
  { type: "warning", title: "Server usage at 90%. Consider scaling up.", time: "2 hours ago" },
  { type: "info", title: "New update available for User Management module.", time: "Yesterday" },
];

const getIcon = (type) => {
  switch (type) {
    case "warning":
      return "warning";          
    case "info":
      return "error-outline";    
    case "success":
      return "check-circle";     
    case "alert":
      return "notifications";    
    default:
      return "info";
  }
};

const NotificationItem = ({ item }) => (
  <View style={styles.itemContainer}>
    
    {/* ICON (like UI - small + centered) */}
    <View style={styles.iconWrapper}>
      <Icon name={getIcon(item.type)} size={18} color="#000" />
    </View>

    {/* TEXT */}
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>

  </View>
);

const Section = ({ title, data }) => (
  <View style={{ marginBottom: 25 }}>
    <Text style={styles.sectionTitle}>{title}</Text>

    {data.map((item, index) => (
      <NotificationItem key={index} item={item} />
    ))}
  </View>
);

const NotificationsScreen = (props) => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backBtn}
        >
          <Icons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Recent Notifications & Alerts
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Section
          title="Recent Notifications & Alerts"
          data={notificationsRecent}
        />

        <Section
          title="Last Week Notifications & Alerts"
          data={notificationsLastWeek}
        />
      </ScrollView>

    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 15,
  },

  backBtn: {
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginTop: 30,
    marginHorizontal: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
    marginHorizontal: 20,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
    marginHorizontal: 20,
  },

  iconWrapper: {
    width: 26,
    alignItems: "center",
    marginTop: 2,
  },

  textWrapper: {
    flex: 1,
    paddingLeft: 8,
  },

  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    lineHeight: 18,
  },

  time: {
    fontSize: 12,
    color: "#8E8E8E",
    marginTop: 3,
  },
});