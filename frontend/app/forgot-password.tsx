import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<'mobile' | 'email'>('mobile');
  const [contactValue, setContactValue] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [resendCountdown, setResendCountdown] = useState(30);

  const handleSendOtp = () => {
    setStep('verify');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setResendCountdown(30);
  };

  const handleVerifyOtp = () => {
    setStep('reset');
  };

  const handleResendOtp = () => {
    setOtp('');
    setResendCountdown(30);
  };

  const handleResetPassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      return;
    }

    router.back();
  };

  useEffect(() => {
    if (step !== 'verify' || resendCountdown === 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendCountdown((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>P</Text>
            </View>
            <View>
              <Text style={styles.brandName}>ProBattle</Text>
              <Text style={styles.brandTag}>Reset password</Text>
            </View>
          </View>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>
            Choose mobile or email, receive an OTP, and then reset your password.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Choose recovery method</Text>
          <View style={styles.segmentRow}>
            <Pressable
              onPress={() => setDeliveryMethod('mobile')}
              style={[
                styles.segmentButton,
                deliveryMethod === 'mobile' && styles.segmentButtonActive,
              ]}>
              <Text
                style={[
                  styles.segmentText,
                  deliveryMethod === 'mobile' && styles.segmentTextActive,
                ]}>
                Mobile number
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setDeliveryMethod('email')}
              style={[
                styles.segmentButton,
                deliveryMethod === 'email' && styles.segmentButtonActive,
              ]}>
              <Text
                style={[
                  styles.segmentText,
                  deliveryMethod === 'email' && styles.segmentTextActive,
                ]}>
                Email
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.label, styles.spacingTop]}>
            {deliveryMethod === 'mobile' ? 'Mobile number' : 'Email address'}
          </Text>
          <TextInput
            value={contactValue}
            onChangeText={setContactValue}
            placeholder={
              deliveryMethod === 'mobile'
                ? 'Enter mobile number'
                : 'Enter email address'
            }
            placeholderTextColor="#8b8b8b"
            keyboardType={deliveryMethod === 'mobile' ? 'phone-pad' : 'email-address'}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          {step === 'request' ? (
            <Pressable onPress={handleSendOtp} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                Send OTP to {deliveryMethod === 'mobile' ? 'mobile' : 'email'}
              </Text>
            </Pressable>
          ) : (
            <>
              <Text style={[styles.label, styles.spacingTop]}>Enter OTP</Text>
              <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter 6-digit OTP"
                placeholderTextColor="#8b8b8b"
                keyboardType="number-pad"
                style={styles.input}
              />

              {step === 'verify' ? (
                <Pressable onPress={handleVerifyOtp} style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Verify OTP</Text>
                </Pressable>
              ) : (
                <>
                  <Text style={[styles.label, styles.spacingTop]}>New password</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Create new password"
                    placeholderTextColor="#8b8b8b"
                    secureTextEntry
                    style={styles.input}
                  />

                  <Text style={[styles.label, styles.spacingTop]}>Confirm new password</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm new password"
                    placeholderTextColor="#8b8b8b"
                    secureTextEntry
                    style={styles.input}
                  />

                  <Pressable onPress={handleResetPassword} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Reset password</Text>
                  </Pressable>
                </>
              )}

              <Pressable
                onPress={handleResendOtp}
                disabled={resendCountdown > 0}
                style={[
                  styles.secondaryButton,
                  resendCountdown > 0 && styles.secondaryButtonDisabled,
                ]}>
                <Text style={styles.secondaryButtonText}>
                  {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}s` : 'Resend OTP'}
                </Text>
              </Pressable>
            </>
          )}

          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>What happens next?</Text>
            <Text style={styles.noteText}>
              First choose mobile or email, then verify the OTP. After that the reset password
              form opens here.
            </Text>
          </View>

          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b0608',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#0b0608',
  },
  hero: {
    marginTop: 24,
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9a2b',
    shadowColor: '#ff9a2b',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logoText: {
    color: '#1d0f05',
    fontSize: 22,
    fontWeight: '900',
  },
  brandName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  brandTag: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
  },
  subtitle: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#1a0f12',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segmentButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#120b0d',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  segmentButtonActive: {
    backgroundColor: '#ff9a2b',
    borderColor: '#ff9a2b',
  },
  segmentText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#1d0f05',
  },
  label: {
    marginBottom: 8,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#120b0d',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    fontSize: 15,
  },
  primaryButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9a2b',
  },
  primaryButtonText: {
    color: '#1d0f05',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    marginTop: 12,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#231519',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  secondaryButtonDisabled: {
    opacity: 0.65,
  },
  secondaryButtonText: {
    color: '#ffbb66',
    fontSize: 14,
    fontWeight: '700',
  },
  noteBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#120b0d',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  noteTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  noteText: {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
  },
  backButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffbb66',
    fontSize: 13,
    fontWeight: '700',
  },
});