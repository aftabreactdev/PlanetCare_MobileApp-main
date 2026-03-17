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

const interestOptions = [
  'Meditation',
  'Breathing',
  'Journaling',
  'Self Care',
  'Sleep',
  'Fitness',
  'Nutrition',
  'Mindfulness',
  'Community',
  'Healing',
];

export default function InterestSelectionScreen({ navigation }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = interest => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      }
      return [...prev, interest];
    });
  };

  const handleContinue = () => {
    navigation.replace('MainStack', { screen: 'MainTabs' });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AuthHeader
            title="Choose Your Interests"
            subtitle="Select the areas you would like Planet Care to focus on for you."
          />

          <View style={styles.optionsContainer}>
            {interestOptions.map(interest => {
              const isSelected = selectedInterests.includes(interest);

              return (
                <TouchableOpacity
                  key={interest}
                  activeOpacity={0.85}
                  style={[
                    styles.interestChip,
                    isSelected && styles.selectedInterestChip,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text
                    style={[
                      styles.interestText,
                      isSelected && styles.selectedInterestText,
                    ]}
                  >
                    {interest}
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
  interestChip: {
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
  selectedInterestChip: {
    backgroundColor: '#FFC83D',
    borderColor: '#FFC83D',
  },
  interestText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedInterestText: {
    color: colors.black,
  },
  button: {
    marginTop: 'auto',
  },
});