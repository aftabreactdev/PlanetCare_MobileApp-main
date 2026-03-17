import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

const moodOptions = [
  'Happy',
  'Calm',
  'Anxious',
  'Stressed',
  'Sad',
  'Motivated',
  'Tired',
  'Overwhelmed',
];

export default function MoodSelectionScreen({ navigation }) {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const toggleMood = mood => {
    setSelectedMoods(prev => {
      if (prev.includes(mood)) {
        return prev.filter(item => item !== mood);
      }
      return [...prev, mood];
    });
  };

  const handleContinue = () => {
    navigation.navigate('AuthStack', { screen: 'InterestSelection' });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AuthHeader
            title="How are you feeling?"
            subtitle="Select the moods that best describe how you feel today."
          />

          <View style={styles.optionsContainer}>
            {moodOptions.map(mood => {
              const isSelected = selectedMoods.includes(mood);

              return (
                <TouchableOpacity
                  key={mood}
                  activeOpacity={0.85}
                  style={[
                    styles.moodChip,
                    isSelected && styles.selectedMoodChip,
                  ]}
                  onPress={() => toggleMood(mood)}
                >
                  <Text
                    style={[
                      styles.moodText,
                      isSelected && styles.selectedMoodText,
                    ]}
                  >
                    {mood}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomButton
            title="Continue"
            onPress={handleContinue}
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
    paddingTop: 36,
    paddingBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 28,
  },
  moodChip: {
    width: '48%',
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  selectedMoodChip: {
    backgroundColor: '#FFC83D',
    borderColor: '#FFC83D',
  },
  moodText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedMoodText: {
    color: colors.black,
  },
  button: {
    marginTop: 'auto',
  },
});