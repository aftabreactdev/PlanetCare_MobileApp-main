import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

export default function VerifyCodeScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate('AuthStack', { screen: 'NewPassword' });
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
              title="Verify Code"
              subtitle="Enter the 4-digit verification code sent to your email."
            />

            <View style={styles.codeRow}>
              {code.map((item, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.codeInput}
                  value={item}
                  onChangeText={value =>
                    handleChange(value.replace(/[^0-9]/g, '').slice(-1), index)
                  }
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  placeholder="-"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                />
              ))}
            </View>

            <CustomButton
              title="Verify"
              onPress={handleVerify}
              style={styles.button}
            />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Didn’t receive the code? </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.footerLink}>Resend</Text>
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
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 28,
  },
  codeInput: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  button: {
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