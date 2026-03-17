import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AuthHeader from '../../components/AuthHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

export default function ProfileSetupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleContinue = () => {
    navigation.navigate('AuthStack', { screen: 'MoodSelection' });
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <AuthHeader
              title="Set Up Profile"
              subtitle="Complete your basic details to personalize your Planet Care experience."
            />

            <View style={styles.avatarSection}>
              <TouchableOpacity activeOpacity={0.8} style={styles.avatarCircle}>
                <Text style={styles.avatarPlus}>+</Text>
              </TouchableOpacity>
              <Text style={styles.avatarText}>Upload Profile Photo</Text>
            </View>

            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <CustomInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <CustomInput
                  label="Age"
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.halfWidth}>
                <CustomInput
                  label="Gender"
                  placeholder="Gender"
                  value={gender}
                  onChangeText={setGender}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <CustomButton
              title="Continue"
              onPress={handleContinue}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatarCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarPlus: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '400',
    lineHeight: 38,
  },
  avatarText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    marginTop: 10,
  },
});