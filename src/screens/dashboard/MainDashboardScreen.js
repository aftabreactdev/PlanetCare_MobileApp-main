import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import DashboardCard from '../../components/DashboardCard';
import colors from '../../constants/colors';

export default function MainDashboardScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppHeader
            title="Good Morning"
            subtitle="Welcome to Planet Care"
            rightText="PC"
          />

          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>Today’s Wellness Check</Text>
            <Text style={styles.heroSubtitle}>
              Track your emotions, reflect on your day, and build healthy
              habits.
            </Text>

            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate('Checkin')}
            >
              <Text style={styles.heroButtonText}>Start Check-in</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <DashboardCard
            title="Daily Check-in"
            subtitle="Log your mood and reflect on how you feel today."
            onPress={() => navigation.navigate('Checkin')}
          />

          <DashboardCard
            title="Journal"
            subtitle="Write reflections, save thoughts, and review your entries."
            onPress={() => navigation.navigate('Journal')}
          />

          <DashboardCard
            title="Insights"
            subtitle="See your wellness trends, mood patterns, and progress."
            onPress={() => navigation.navigate('Insights')}
          />

          <DashboardCard
            title="Shop"
            subtitle="Browse wellness products and supportive self-care items."
            onPress={() => navigation.navigate('Shop')}
          />

          <DashboardCard
            title="Support Pods"
            subtitle="Explore supportive groups and connect with your community."
            onPress={() => navigation.navigate('Pods')}
          />

          <Text style={styles.sectionTitle}>Your Progress</Text>

          <View style={styles.progressRow}>
            <View style={styles.progressCard}>
              <Text style={styles.progressValue}>12</Text>
              <Text style={styles.progressLabel}>Check-ins</Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressValue}>06</Text>
              <Text style={styles.progressLabel}>Journal Entries</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07132A',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: '#179CFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFC83D',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  heroButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    marginTop: 6,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#1B2147',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  progressValue: {
    color: '#FFC83D',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
  },
});
