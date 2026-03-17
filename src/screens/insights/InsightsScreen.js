import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import colors from '../../constants/colors';
import weeklyMoodData from '../../data/insightsData';

export default function InsightsScreen() {
  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Insights"
            subtitle="Track your emotional wellness and progress over time."
          />

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Total Check-ins</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Journal Entries</Text>
            </View>
          </View>

          <View style={styles.largeCard}>
            <Text style={styles.sectionTitle}>Most Frequent Mood</Text>
            <Text style={styles.highlightText}>Happy</Text>
            <Text style={styles.description}>
              You’ve reported feeling happy more often this week.
            </Text>
          </View>

          <View style={styles.largeCard}>
            <Text style={styles.sectionTitle}>Weekly Mood Summary</Text>

            <View style={styles.weekList}>
              {weeklyMoodData.map(item => (
                <View key={item.day} style={styles.weekRow}>
                  <Text style={styles.weekDay}>{item.day}</Text>
                  <View style={styles.moodBadge}>
                    <Text style={styles.moodBadgeText}>{item.mood}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.largeCard}>
            <Text style={styles.sectionTitle}>Wellness Note</Text>
            <Text style={styles.description}>
              Keep checking in daily to build a clearer picture of your emotional patterns.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#07132A',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1B2147',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statValue: {
    color: '#FFC83D',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    textAlign: 'center',
  },
  largeCard: {
    backgroundColor: '#1B2147',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  highlightText: {
    color: '#7EC8FF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
  },
  weekList: {
    marginTop: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekDay: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  moodBadge: {
    backgroundColor: 'rgba(255,200,61,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  moodBadgeText: {
    color: '#FFC83D',
    fontSize: 12,
    fontWeight: '700',
  },
});