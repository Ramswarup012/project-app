import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Share,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const EarnScreen = () => {
  const router = useRouter();
  const referralCode = 'ng_iconic';

  const handleCopyCode = async () => {
    try {
      await Share.share({
        message: `Join ProBattle using my referral code: ${referralCode}`,
        title: 'ProBattle Referral Code',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const shareVia = (platform: string) => {
    const message = `Hey! Join ProBattle and use my referral code ${referralCode} to earn rewards! 🎮💰`;
    
    const links: any = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(message)}`,
      telegram: `https://t.me/share/url?url=https://probattle.com&text=${encodeURIComponent(message)}`,
    };

    // In real app, open these URLs
    handleCopyCode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#6c3fe7', '#4a1fa3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleSection}
        >
          <Text style={styles.title}>Refer your friend and Earn</Text>
          
          <View style={styles.giftBox}>
            <Text style={styles.giftEmoji}>🎁</Text>
          </View>

          <Text style={styles.description}>
            Invite your friends on App using your Referral Code to Earn 0 Coins in bonusWallet When they join First Paid match, with minimum entry fee of 0. Your friends also get 0 Coins in bonusWallet as Register Bonus!
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Your referral code</Text>
            <View style={styles.codeInputWrapper}>
              <TextInput
                style={styles.codeInput}
                value={referralCode}
                editable={false}
              />
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
                <Ionicons name="copy" size={20} color="#6c3fe7" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.shareTitle}>Share your referral code via</Text>

          <View style={styles.shareButtons}>
            <TouchableOpacity
              style={[styles.shareButton, styles.telegramButton]}
              onPress={() => shareVia('telegram')}
            >
              <Text style={styles.shareButtonEmoji}>✈️</Text>
              <Text style={styles.shareButtonText}>Telegram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareButton, styles.facebookButton]}
              onPress={() => shareVia('facebook')}
            >
              <Text style={styles.shareButtonEmoji}>f</Text>
              <Text style={styles.shareButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shareButton, styles.whatsappButton]}
              onPress={() => shareVia('whatsapp')}
            >
              <Text style={styles.shareButtonEmoji}>💬</Text>
              <Text style={styles.shareButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#0a1628',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  purpleSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  giftBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  giftEmoji: {
    fontSize: 80,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.95,
  },
  codeBox: {
    marginBottom: 30,
    width: '100%',
  },
  codeLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  codeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingRight: 12,
  },
  codeInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  copyButton: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    flexWrap: 'wrap',
  },
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  telegramButton: {
    backgroundColor: '#0088cc',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
  },
  whatsappButton: {
    backgroundColor: '#25d366',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButtonEmoji: {
    fontSize: 16,
  },
});
