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
import SocialButton from '../../components/SocialButton';
import colors from '../../constants/colors';
import images from '../../constants/images';

import { signupUser } from '../../services/authService';
import {
  isEmpty,
  isPasswordValid,
  isValidEmail,
} from '../../utils/validators';
import { showMessage } from '../../utils/showMessage';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleSignup = async () => {
  if (isEmpty(fullName)) {
    showMessage('Validation Error', 'Full name is required');
    return;
  }

  if (isEmpty(email)) {
    showMessage('Validation Error', 'Email is required');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Validation Error', 'Enter a valid email');
    return;
  }

  if (!isPasswordValid(password)) {
    showMessage('Validation Error', 'Password must be at least 6 characters');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Validation Error', 'Passwords do not match');
    return;
  }

  const payload = {
    full_name: fullName,
    email,
    password,
    confirm_password: confirmPassword,
  };

  const response = await signupUser(payload);

  if (response?.success) {
    navigation.navigate('AuthStack', { screen: 'MoodSelection' });
  }
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
              title="Sign Up"
              subtitle="Create your account and begin your personalized wellness journey."
            />

            <SocialButton
              title="Continue with Google"
              icon={images.googleIcon}
              onPress={() => {}}
            />

            <SocialButton
              title="Continue with Apple"
              icon={images.appleIcon}
              onPress={() => {}}
            />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
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
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <CustomInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <CustomButton
              title="Create Account"
              onPress={handleSignup}
              style={styles.signupButton}
            />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AuthStack', { screen: 'Login' })
                }
              >
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 12,
    fontSize: 14,
  },
  signupButton: {
    marginTop: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  footerText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
  },
  footerLink: {
    color: '#FFC83D',
    fontSize: 14,
    fontWeight: '700',
  },
});