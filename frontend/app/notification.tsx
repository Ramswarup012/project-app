import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,

} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';    

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Game Rules & Limits',
    message: 'Every Player Of FreeFire Game Name (Not User) Per Day Match Join Limit Is 10 in LW/CS ONLY (Whether You Play Or Match Is Cancel Doesn\'t Matter). IF YOU EXCEED IT THEN ₹50 PENALTY + Every Extra 5 Match Again -50 Penalty. AND RECORDING IS MANDATORY FOR EVIDENCE PURPOSE, ATLEAST YOU SHOULD HAVE RECORDING OF LAST 24 HOURS. AND IF SOMEONE PLAYED WITH SAME GAME ID WITH MULTIPLE ACCOUNT THEN THAT ACCOUNT WILL BE BANNED ... WITHOUT ANY WARNING!!',
  },
  {
    id: '2',
    title: 'NOTICE FOR LONEWOLF/CS PLAYERS',
    message: 'Registering with Multiple Names while Joining like user1/user2 will NOT be accepted. Random / Random By Not Accepted. ONLY 1 NAME AT A TIME. PENALTY = 100 Regards Khiladi battle',
  },
  {
    id: '3',
    title: 'COIN PAYMENT NOTE',
    message: 'NOTE:- AGER APP COIN ADD KARTE HO AND PAYMENT KARNE KE BAAD COIN APKE WALLET ME NAHI AATA TO APP COSTMOR SUPPORT PER 6 HOURS KE ANDER SMS KRKR APNA COIN ADD KARA SAKTE YAAD RHE 6 HOURS KE ANDER ⚠️ ⚠️',
  },
];

const NotificationScreen = () => {
  const router = useRouter();

  return (
    <>
    <SafeAreaView style={styles.container}>
      <StatusBar hidden  />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Notifications List */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 39, 131, 0.2)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },

  // Scroll Content
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 20,
  },

  // Notification Card
  notificationCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationTitle: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.3,
    
  },
  notificationMessage: {
    color: '#404040',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
