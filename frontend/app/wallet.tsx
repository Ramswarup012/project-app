import React, { useEffect, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { router } from "expo-router";

import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WalletScreen() {
  const [wallet, setWallet] = useState({
    balance: 0,

    bonus: 0,

    winnings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchWallet();
    }, []),
  );

  const fetchWallet = async () => {
    try {
      const token = await AsyncStorage.getItem("usertoken");

      const response = await axios.get(
        "http://10.147.182.122:3001/api/auth/me",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = response.data.user;

      setWallet({
        balance: Number(user.wallet) || 0,

        bonus: 0,

        winnings: Number(user.wallet) || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFB800" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Wallet</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>

        <Text style={styles.balance}>₹{wallet.balance}</Text>

        <Text style={styles.instantText}>Instant Deposit Available</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.cardAmount}>₹{wallet.bonus}</Text>

          <Text style={styles.cardLabel}>Bonus</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.cardAmount}>₹{wallet.winnings}</Text>

          <Text style={styles.cardLabel}>Winnings</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-money")}
      >
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={() => router.push("/withdraw")}
      >
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push("/transactions")}
      >
        <Text style={styles.buttonText}>Transaction History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 20,
  },

  loader: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
  },

  instantText: {
    color: "#1E1E1E",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  balanceCard: {
    backgroundColor: "#FFB800",

    borderRadius: 28,

    padding: 32,

    marginBottom: 26,

    shadowColor: "#FFB800",

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,

    shadowRadius: 16,

    elevation: 12,
  },

  balanceLabel: {
    color: "#000000",
    fontSize: 18,
    marginBottom: 10,
  },

  balance: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  historyButton: {
    backgroundColor: "#333333",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 18,
  },

  smallCard: {
    backgroundColor: "#161616",
    width: "48%",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#252525",
  },

  cardAmount: {
    color: "#00FF99",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardLabel: {
    color: "#AAAAAA",
    fontSize: 15,
  },

  addButton: {
    backgroundColor: "#00C853",

    padding: 20,

    borderRadius: 22,

    alignItems: "center",

    marginBottom: 20,

    shadowColor: "#00C853",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,

    shadowRadius: 14,

    elevation: 10,
  },

  withdrawButton: {
    backgroundColor: "#FF4D6D",

    padding: 20,

    borderRadius: 22,

    alignItems: "center",

    shadowColor: "#FF4D6D",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,

    shadowRadius: 14,

    elevation: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
