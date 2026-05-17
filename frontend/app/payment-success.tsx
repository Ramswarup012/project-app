import React, { useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter, useLocalSearchParams } from "expo-router";

export default function PaymentSuccess() {
  const router = useRouter();

  const { amount } = useLocalSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/wallet");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* ICON */}

      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={140} color="#00E676" />
      </View>

      {/* TITLE */}

      <Text style={styles.title}>Payment Successful</Text>

      {/* AMOUNT */}

      <Text style={styles.amount}>₹{amount}</Text>

      {/* SUBTITLE */}

      <Text style={styles.subtitle}>
        Money added to your wallet successfully
      </Text>

      {/* REDIRECT */}

      <Text style={styles.redirect}>Redirecting to wallet...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  iconContainer: {
    marginBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  amount: {
    color: "#00FF99",
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 24,
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 28,
  },

  redirect: {
    color: "#666666",
    marginTop: 60,
    fontSize: 16,
  },
});
