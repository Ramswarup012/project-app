import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';

const WalletScreen = () => {
  const router = useRouter();
  return (
   <>   
      <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={styles.container}>
     
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wallet</Text>

        <View style={{ width: 30 }} />
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.totalBalance}>Total Balance = 0</Text>

        <View style={styles.line} />

        <View style={styles.balanceRow}>
          <Text style={styles.balanceText}>Deposit Balance: 0</Text>

          <Text style={styles.balanceText}>Win Balance: 0</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buttonText}>Buy More</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>

      {/* History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>Wallet history</Text>
      </View>
    </SafeAreaView>
    </>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F44',
  },

  header: {
    backgroundColor: '#074270',
    height: 70,
   //
   // borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  balanceContainer: {
    alignItems: 'center',
    marginTop: 90,
  },

  totalBalance: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },

  line: {
    width: 190,
    height: 8,
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    marginTop: 20,
  },

  balanceRow: {
    flexDirection: 'row',
    marginTop: 70,
    width: '85%',
    justifyContent: 'space-between',
  },

  balanceText: {
    color: '#00FF7F',
    fontSize: 22,
  },

  buyButton: {
    backgroundColor: '#00D84A',
    marginHorizontal: 30,
    marginTop: 90,
    height: 75,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  withdrawButton: {
    backgroundColor: '#FF2643',
    marginHorizontal: 30,
    marginTop: 30,
    height: 75,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },

  historyContainer: {
    marginTop: 150,
    alignItems: 'center',
  },

  historyText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});