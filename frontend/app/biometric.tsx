import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'face' | 'fingerprint' | 'pin'>('face');
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const selectedLabel = useMemo(() => {
    if (selectedMethod === 'face') {
      return 'Face ID';
    }

    if (selectedMethod === 'fingerprint') {
      return 'Fingerprint';
    }

    return 'Device passcode';
  }, [selectedMethod]);

  useEffect(() => {
    const checkSupport = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      setIsBiometricAvailable(Boolean(hasHardware && enrolled));
    };

    void checkSupport();
  }, []);

  const handleContinue = async () => {
    setStatusText('');

    if (!isBiometricAvailable) {
      setStatusText('Biometric login is not set up on this device yet.');
      return;
    }

    setIsAuthenticating(true);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Sign in with ${selectedLabel}`,
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use device passcode',
      });

      if (result.success) {
        setStatusText('Authentication successful. You can continue to the app.');
        router.back();
        return;
      }

      setStatusText('Authentication cancelled or failed. Try again.');
    } catch {
      Alert.alert('Biometric login', 'Could not open the biometric prompt on this device.');
    } finally {
      setIsAuthenticating(false);
    }
  };

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
              <Text style={styles.brandTag}>Biometric sign in</Text>
            </View>
          </View>
          <Text style={styles.title}>Use biometric access</Text>
          <Text style={styles.subtitle}>
            Choose your preferred biometric method and open the real device authentication prompt.
          </Text>
        </View>

        <View style={styles.card}>
          <Pressable
            onPress={() => setSelectedMethod('face')}
            style={[styles.optionCard, selectedMethod === 'face' && styles.optionCardActive]}>
            <Text style={styles.optionIcon}>◉</Text>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>Face ID</Text>
              <Text style={styles.optionText}>Scan your face to continue.</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedMethod('fingerprint')}
            style={[
              styles.optionCard,
              styles.spacingTopCard,
              selectedMethod === 'fingerprint' && styles.optionCardActive,
            ]}>
            <Text style={styles.optionIcon}>◐</Text>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>Fingerprint</Text>
              <Text style={styles.optionText}>Use fingerprint to unlock account.</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedMethod('pin')}
            style={[
              styles.optionCard,
              styles.spacingTopCard,
              selectedMethod === 'pin' && styles.optionCardActive,
            ]}>
            <Text style={styles.optionIcon}>•••</Text>
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionTitle}>Device PIN</Text>
              <Text style={styles.optionText}>Fallback to device lock screen PIN.</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleContinue} style={styles.primaryButton} disabled={isAuthenticating}>
            <Text style={styles.primaryButtonText}>
              {isAuthenticating ? 'Opening secure prompt...' : `Continue with ${selectedLabel}`}
            </Text>
          </Pressable>

          <Text style={styles.supportText}>
            {isBiometricAvailable
              ? 'This device supports biometric sign in.'
              : 'Set up Face ID or fingerprint on the device to use biometric sign in.'}
          </Text>

          {statusText ? <Text style={styles.statusText}>{statusText}</Text> : null}

          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Security note</Text>
            <Text style={styles.noteText}>
              This screen now uses the device biometric/passcode prompt through Expo LocalAuthentication.
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
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#120b0d',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  spacingTopCard: {
    marginTop: 12,
  },
  optionCardActive: {
    backgroundColor: '#231519',
    borderColor: '#ff9a2b',
  },
  optionIcon: {
    color: '#ffbb66',
    fontSize: 18,
    fontWeight: '900',
    width: 34,
    textAlign: 'center',
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  optionText: {
    color: 'rgba(255,255,255,0.68)',
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9a2b',
  },
  supportText: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.68)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  statusText: {
    marginTop: 10,
    color: '#ffbb66',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  primaryButtonText: {
    color: '#1d0f05',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize',
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