import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
  if (
    !fullName ||
    !emailOrUsername ||
    !mobile ||
    !password ||
    !confirmPassword
  ) {
    alert("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      "http://10.125.166.122:3001/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: emailOrUsername,
          phone: mobile,
          password: password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.success) {
      alert("Account created successfully");
      router.replace("/home");
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
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
              <Text style={styles.brandTag}>Create account</Text>
            </View>
          </View>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Join ProBattle to access tournaments, wallet, referrals, and live rewards.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            placeholderTextColor="#8b8b8b"
            style={styles.input}
          />

          <Text style={[styles.label, styles.spacingTop]}>Email or username</Text>
          <TextInput
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            placeholder="Enter email or username"
            placeholderTextColor="#8b8b8b"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={[styles.label, styles.spacingTop]}>Mobile number</Text>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            placeholderTextColor="#8b8b8b"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={[styles.label, styles.spacingTop]}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create password"
            placeholderTextColor="#8b8b8b"
            secureTextEntry
            style={styles.input}
          />

          <Text style={[styles.label, styles.spacingTop]}>Confirm password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            placeholderTextColor="#8b8b8b"
            secureTextEntry
            style={styles.input}
          />

          <Pressable onPress={handleSignup} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create account</Text>
          </Pressable>

          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Account benefits</Text>
            <Text style={styles.noteText}>
              Use one login for matches, wallet balance, referral earnings, and biometric sign in.
            </Text>
          </View>

          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Already have an account? Login</Text>
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
  primaryButton: {
    marginTop: 22,
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