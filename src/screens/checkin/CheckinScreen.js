import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';
import { submitCheckin } from '../../services/checkinService';
import { showMessage } from '../../utils/showMessage';

const moodOptions = [
  'Happy',
  'Calm',
  'Neutral',
  'Anxious',
  'Sad',
  'Stressed',
];

export default function CheckinScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [note, setNote] = useState('');

 const handleSubmit = async () => {
  const payload = {
    mood: selectedMood,
    note,
    created_at: new Date().toISOString(),
  };

  const response = await submitCheckin(payload);

  if (response?.success) {
    showMessage('Success', 'Check-in saved successfully');
    navigation.navigate('Home');
  }
};

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Daily Check-in"
            subtitle="Let us know how you are feeling today."
          />

          <Text style={styles.sectionTitle}>Choose your mood</Text>

          <View style={styles.moodGrid}>
            {moodOptions.map(item => {
              const isSelected = selectedMood === item;

              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.85}
                  style={[styles.moodCard, isSelected && styles.selectedMoodCard]}
                  onPress={() => setSelectedMood(item)}
                >
                  <Text
                    style={[styles.moodText, isSelected && styles.selectedMoodText]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Add a note</Text>

          <View style={styles.noteBox}>
            <TextInput
              style={styles.noteInput}
              placeholder="Write how your day is going..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              multiline
              value={note}
              onChangeText={setNote}
              textAlignVertical="top"
            />
          </View>

          <CustomButton
            title="Save Check-in"
            onPress={handleSubmit}
            style={styles.button}
          />
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
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  moodCard: {
    width: '48%',
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  selectedMoodCard: {
    backgroundColor: '#FFC83D',
    borderColor: '#FFC83D',
  },
  moodText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedMoodText: {
    color: colors.black,
  },
  noteBox: {
    minHeight: 150,
    borderRadius: 20,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 28,
  },
  noteInput: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    minHeight: 110,
  },
  button: {
    marginTop: 'auto',
  },
});