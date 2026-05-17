import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

export default function AddMoney() {
  const router = useRouter();

  const [amount, setAmount] = useState("");

  const quickAmounts = [20, 50, 100, 200, 500, 1000];

  const handleProceed = () => {
    if (!amount) return;

    router.push({
      pathname: "/payment-processing",

      params: {
        amount,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recharge</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>

        <Text style={styles.balance}>₹ 0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Amount</Text>

        <View style={styles.amountBox}>
          <Text style={styles.rupee}>₹</Text>

          <TextInput
            placeholder="10 ~ 1000"
            placeholderTextColor="#7B8794"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
        </View>

        <View style={styles.limitRow}>
          <Text style={styles.limitText}>Minimum: ₹10</Text>

          <Text style={styles.limitText}>Maximum: ₹1000</Text>
        </View>

        <View style={styles.quickContainer}>
          {quickAmounts.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.quickButton}
              onPress={() => setAmount(String(item))}
            >
              <Text style={styles.quickText}>₹{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031B34",
  },

  header: {
    backgroundColor: "#06396B",

    paddingTop: 52,

    paddingBottom: 20,

    alignItems: "center",

    borderBottomLeftRadius: 24,

    borderBottomRightRadius: 24,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  balanceContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 22,
  },

  balanceLabel: {
    color: "#D8E6F5",
    fontSize: 18,
    marginBottom: 6,
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#F5F7FA",

    marginHorizontal: 16,

    borderRadius: 24,

    padding: 18,

    paddingBottom: 24,
  },

  title: {
    color: "#111111",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  amountBox: {
    flexDirection: "row",

    alignItems: "center",

    borderBottomWidth: 2,

    borderColor: "#D9DDE5",

    paddingBottom: 10,
  },

  rupee: {
    color: "#111111",
    fontSize: 38,
    fontWeight: "bold",
    marginRight: 8,
  },

  input: {
    flex: 1,

    color: "#7B8794",

    fontSize: 40,

    fontWeight: "bold",

    paddingVertical: 0,
  },

  limitRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 10,

    marginBottom: 24,
  },

  limitText: {
    color: "#9AA0AD",
    fontSize: 13,
  },

  quickContainer: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  quickButton: {
    backgroundColor: "#DCE9F7",

    width: "31%",

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: "center",

    marginBottom: 14,
  },

  quickText: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#0066FF",

    paddingVertical: 18,

    borderRadius: 16,

    alignItems: "center",

    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});
