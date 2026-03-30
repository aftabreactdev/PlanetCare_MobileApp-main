import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RadialGradient from "react-native-radial-gradient";
import Icons from "react-native-vector-icons/Ionicons";


import Header from "../../components/homedashboad2/Header";
import MoodSection from "../../components/homedashboad2/MoodSection";
import ActivityItem from "../../components/homedashboad2/ActivityItem";
import RecommendationCard from "../../components/homedashboad2/RecommendationCard";
import ActionButtons from "../../components/maindashboard/ActionButtons";

const DailySnapshot = ({ navigation }) => {  // ← FIX: Added navigation prop
  // Data for activities with individual styles
  const activities = [
    {
      id: 1,
      leftIcon: require("../../assets/icons/greentick.png"),
      secondaryIcon: require("../../assets/icons/moringmood.png"),
      title: "Morning Check-in",
      subtitle: "Daily emotion track",
      time: "08:00 AM",
      date: "July 20",
      titleStyle: { right: 10 },
      subtitleStyle: { marginRight: 25 },
    },
    {
      id: 2,
      leftIcon: require("../../assets/icons/redcross.png"),
      secondaryIcon: require("../../assets/icons/jurnelmood.png"),
      title: "Journal",
      subtitle: "I wrote about my۔۔۔۔",
      time: "00:00 AM",
      date: "July 20",
      titleStyle: { right: 40 },
      subtitleStyle: { marginRight: 25 },
    },
    {
      id: 3,
      leftIcon: require("../../assets/icons/redcross.png"),
      secondaryIcon: require("../../assets/icons/activitiesmood.png"),
      title: "Activities",
      subtitle: "Meditation, Reading",
      time: "00:00 AM",
      date: "July 20",
      titleStyle: { right: 40 },
      subtitleStyle: { marginRight: 25 },
    },
  ];

  // Data for recommendations with individual styles
  const recommendations = [
    {
      id: 1,
      icon: require("../../assets/icons/blub.png"),
      title: "A tip for today:",
      description: "take 3 deep breaths before journaling",
      titleStyle: { right: 50 },
      descriptionStyle: {},
    },
    {
      id: 2,
      icon: require("../../assets/icons/v.png"),
      title: "Suggested journal prompt:",
      description: "What is something I need to let go of?",
      titleStyle: { right: 20 },
      descriptionStyle: { marginTop: 5 },
    },
    {
      id: 3,
      icon: require("../../assets/icons/v.png"),
      title: "Emily S.",
      description: "What is something I need to let go of?",
      titleStyle: { right: 60 },
      descriptionStyle: { left: 10 },
    },
  ];

  // Event handlers
  const handleNotificationPress = () => {
    console.log("Notification pressed");
    // Add your navigation or logic here
  };

  const handleProfilePress = () => {
    console.log("Profile pressed");
    // Add your navigation or logic here
  };

  const handleActivityPress = (activityTitle) => {
    console.log(`${activityTitle} pressed`);
    // Add your navigation or logic here
  };

  const handleRecommendationPress = (recommendationTitle) => {
    console.log(`${recommendationTitle} pressed`);
    // Add your navigation or logic here
  };

  const handleBackPress = () => {
    navigation.goBack();  // ← Use navigation prop
  };

  return (
    <LinearGradient
      colors={["rgba(0, 11, 36, 1)", "rgba(4, 84, 204, 1)"]}
      style={{ flex: 1, padding: 0 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBackPress}  // ← FIX: Use the handler function
          style={{ top: 30, marginLeft: 15, zIndex: 1 }}  // ← Added zIndex to ensure button is clickable
        >
          <Icons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        
        {/* Header Component */}
        <Header
          title="Daily Snapshot"
          subtitle="Today, July 30"
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
          profileImage={require("../../assets/images/profile.png")}
        />

        {/* Radial Gradient Background Effect */}
        <RadialGradient
          colors={[
            "rgba(143, 0, 255, 1)",
            "rgba(143, 0, 250, 0.6)",
            "rgba(160, 80, 220, 0.2)",
            "rgba(200, 120, 255, 0.0)",
          ]}
          stops={[0.2, 0.8, 0.9, 1]}
          center={[200, 200]}
          radius={200}
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: 200,
            top: 50,
            alignSelf: "center",
            opacity: 0.6,
          }}
        />

        {/* Mood Section Component */}
        <MoodSection
          moodImage={require("../../assets/images/smile.png")}
          moodText="Your mood was good"
        />

        {/* Activities Section */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 15,
            gap: 10,
          }}
        >
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              leftIcon={activity.leftIcon}
              secondaryIcon={activity.secondaryIcon}
              title={activity.title}
              subtitle={activity.subtitle}
              time={activity.time}
              date={activity.date}
              titleStyle={activity.titleStyle}
              subtitleStyle={activity.subtitleStyle}
              onPress={() => handleActivityPress(activity.title)}
            />
          ))}
        </View>

        {/* Action Buttons Component */}
        <ActionButtons />

        {/* Recommendations Header */}
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            left: 20,
            top: 10,
          }}
        >
          Recommendation
        </Text>

        {/* Recommendations Section */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 30,
            alignSelf: "center",
            gap: 10,
          }}
        >
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              icon={rec.icon}
              title={rec.title}
              description={rec.description}
              titleStyle={rec.titleStyle}
              descriptionStyle={rec.descriptionStyle}
              onPress={() => handleRecommendationPress(rec.title)}
            />
          ))}
        </View>

        <View style={{ height: 50 }} /> 
      </ScrollView>
    </LinearGradient>
  );
};

export default DailySnapshot;