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

import { loginUser } from '../../services/authService';
import { isEmpty, isValidEmail } from '../../utils/validators';
import { showMessage } from '../../utils/showMessage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  if (isEmpty(email)) {
    showMessage('Validation Error', 'Email is required');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Validation Error', 'Enter a valid email');
    return;
  }

  if (isEmpty(password)) {
    showMessage('Validation Error', 'Password is required');
    return;
  }

  const payload = {
    email,
    password,
  };

  const response = await loginUser(payload);

  if (response?.success) {
    navigation.navigate('AuthStack', { screen: 'ProfileSetup' });
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
              title="Login"
              subtitle="Welcome back! Sign in to continue your wellness journey."
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
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.forgotWrapper}
              onPress={() =>
                navigation.navigate('AuthStack', { screen: 'ForgotPassword' })
              }
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton
              title="Login"
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AuthStack', { screen: 'Signup' })
                }
              >
                <Text style={styles.footerLink}>Sign Up</Text>
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
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 24,
  },
  forgotText: {
    color: '#7EC8FF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 6,
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