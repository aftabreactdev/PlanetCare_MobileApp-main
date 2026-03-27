import React from "react";
import { ScrollView, StatusBar, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Header from "../../components/maindashboard/Header";
import MoodChart from "../../components/maindashboard/MoodChart";
import ProgressSection from "../../components/maindashboard/ProgressSection";
import AffirmationCard from "../../components/maindashboard/AffirmationCard";
import ActionButtons from "../../components/maindashboard/ActionButtons";

const MainDashboardScreen = () => {
  return (
    <LinearGradient
      colors={["rgba(0, 11, 36, 1)", "rgb(4, 84, 204)"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          <Header />
          <MoodChart />
          <ProgressSection />
          <AffirmationCard />
          <ActionButtons />
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainDashboardScreen;