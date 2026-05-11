import { useState } from 'react';
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

export default function LoginScreen() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
              <Text style={styles.brandTag}>Tournament login</Text>
            </View>
          </View>
          <Text style={styles.title}>Login to continue</Text>
          <Text style={styles.subtitle}>
            Sign in to your account and access tournaments, wallet, and live matches.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email or username</Text>
          <TextInput
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            placeholder="Enter email or username"
            placeholderTextColor="#8b8b8b"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={[styles.label, styles.spacingTop]}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#8b8b8b"
              secureTextEntry={!showPassword}
              style={[styles.input, styles.passwordInput]}
            />
            <Pressable
              onPress={() => setShowPassword((value) => !value)}
              style={styles.passwordToggle}>
              <Text style={styles.passwordToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </Pressable>

          <View style={styles.biometricWrap}>
            <Text style={styles.orText}>Or continue with</Text>
            <Pressable onPress={() => router.push('/biometric')} style={styles.biometricButton}>
              <Text style={styles.biometricIcon}>◉</Text>
              <Text style={styles.biometricButtonText}>Use biometric sign in</Text>
            </Pressable>
            <Text style={styles.biometricHint}>
              Face ID / fingerprint support can be connected next.
            </Text>
          </View>

          <View style={styles.row}>
            <Pressable onPress={() => router.push('/forgot-password')}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.linkText}>Create account</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureNumber}>24/7</Text>
            <Text style={styles.featureLabel}>Live access</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureNumber}>Fast</Text>
            <Text style={styles.featureLabel}>Wallet flow</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureNumber}>Safe</Text>
            <Text style={styles.featureLabel}>Secure login</Text>
          </View>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerTitle}>Why login?</Text>
          <Text style={styles.footerText}>
            Manage match joining, wallet balance, winnings, and the referral system here.
          </Text>
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
  label: {
    marginBottom: 8,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  spacingTop: {
    marginTop: 16,
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  passwordInput: {
    flex: 1,
  },
  passwordToggle: {
    height: 54,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#231519',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  passwordToggleText: {
    color: '#ffbb66',
    fontSize: 13,
    fontWeight: '700',
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
  biometricWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  orText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  biometricButton: {
    width: '100%',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#231519',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  biometricIcon: {
    color: '#ffbb66',
    fontSize: 16,
    fontWeight: '900',
  },
  biometricButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  biometricHint: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  linkText: {
    color: '#ffbb66',
    fontSize: 13,
    fontWeight: '600',
  },
  featureGrid: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  featureCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#120b0d',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  featureNumber: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  featureLabel: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
    fontSize: 12,
  },
  footerBox: {
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#120b0d',
  },
  footerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  footerText: {
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 20,
  },
});