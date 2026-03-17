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
import colors from '../../constants/colors';
import journalEntries from '../../data/journalData';


export default function JournalingScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Journal"
            subtitle="Read your reflections and add new journal entries."
            rightText="+"
            onRightPress={() => navigation.navigate('AddJournal')}
          />

          <View style={styles.listWrapper}>
            {journalEntries.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.entryCard}
              >
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryPreview}>{item.preview}</Text>
              </TouchableOpacity>
            ))}
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
  listWrapper: {
    marginTop: 4,
  },
  entryCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,200,61,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  dateText: {
    color: '#FFC83D',
    fontSize: 12,
    fontWeight: '700',
  },
  entryTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  entryPreview: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
  },
});