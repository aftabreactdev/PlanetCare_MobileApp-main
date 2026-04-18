import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from 'react-native-responsive-screen';

import MoodSection from '../../components/homedashboad2/MoodSection';
import ActivityItem from '../../components/homedashboad2/ActivityItem';
import RecommendationCard from '../../components/homedashboad2/RecommendationCard';
import ActionButtons from '../../components/maindashboard/ActionButtons';

const ACTIVITIES = [
  {
    id: 1,
    leftIcon: require('../../assets/icons/greentick.png'),
    secondaryIcon: require('../../assets/icons/moringmood.png'),
    title: 'Morning Check-in',
    subtitle: 'Daily emotion track',
    time: '08:00 AM',
    date: 'July 20',
    titleStyle: { right: 10 },
    subtitleStyle: { marginRight: 25 },
  },
  {
    id: 2,
    leftIcon: require('../../assets/icons/redcross.png'),
    secondaryIcon: require('../../assets/icons/jurnelmood.png'),
    title: 'Journal',
    subtitle: 'I wrote about my۔۔۔۔',
    time: '00:00 AM',
    date: 'July 20',
    titleStyle: { right: 40 },
    subtitleStyle: { marginRight: 25 },
  },
  {
    id: 3,
    leftIcon: require('../../assets/icons/redcross.png'),
    secondaryIcon: require('../../assets/icons/activitiesmood.png'),
    title: 'Activities',
    subtitle: 'Meditation, Reading',
    time: '00:00 AM',
    date: 'July 20',
    titleStyle: { right: 40 },
    subtitleStyle: { marginRight: 25 },
  },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    icon: require('../../assets/icons/blub.png'),
    title: 'A tip for today:',
    description: 'take 3 deep breaths before journaling',
    titleStyle: { right: 50 },
  },
  {
    id: 2,
    icon: require('../../assets/icons/v.png'),
    title: 'Suggested journal prompt:',
    description: 'What is something I need to let go of?',
    titleStyle: { right: 20 },
  },
  {
    id: 3,
    icon: require('../../assets/icons/v.png'),
    title: 'Emily S.',
    description: 'What is something I need to let go of?',
    titleStyle: { right: 60 },
  },
];

const DailySnapshot = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['rgba(0, 11, 36, 1)', 'rgba(4, 84, 204, 1)']}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={{
            height: 110,
            paddingTop: 10,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            backgroundColor: '#00143A',

          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name="arrow-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => console.log('Notification')}
              style={{ marginRight: 18 }}
            >
              <Icons name="notifications" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Profile')}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: '#19A7FF',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

           <Text
      style={{
        position: "absolute",
        top: H('10%'), // adjust this value to move up/down
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        zIndex: 10,
      }}
    >
      Daily Snapshot
    </Text>

       

        <RadialGradient
          colors={[
            'rgba(143, 0, 255, 1)',
            'rgba(143, 0, 250, 0.6)',
            'rgba(160, 80, 220, 0.2)',
            'rgba(200, 120, 255, 0.0)',
          ]}
          stops={[0.2, 0.8, 0.9, 1]}
          center={[200, 200]}
          radius={200}
          style={styles.radialGlow}
        />

        <MoodSection
          moodImage={require('../../assets/images/smile.png')}
          moodText="Your mood was good"
        />

        {/* Activities */}
        <View style={styles.activitiesContainer}>
          {ACTIVITIES.map(item => (
            <ActivityItem
              key={item.id}
              {...item}
              onPress={() => console.log(`${item.title} pressed`)}
            />
          ))}
        </View>

        <ActionButtons />

        <Text style={styles.recommendationTitle}>Recommendation</Text>

        <View style={styles.recommendationsContainer}>
          {RECOMMENDATIONS.map(item => (
            <RecommendationCard
              key={item.id}
              {...item}
              onPress={() => console.log(`${item.title} pressed`)}
            />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DailySnapshot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  backButton: {
    top: 30,
    marginLeft: 15,
    zIndex: 10,
  },
  radialGlow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    top: 50,
    alignSelf: 'center',
    opacity: 0.6,
  },
  activitiesContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    gap: 10,
  },
  recommendationTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
  },
  recommendationsContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
    gap: 10,
  },
});
