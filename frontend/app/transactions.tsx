import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Stack } from "expo-router";

import API from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH TRANSACTIONS
  ========================= */

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/payments/transactions/PB100001");

      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* =========================
     RENDER ITEM
  ========================= */

  const renderItem = ({ item }: { item: any }) => {
    const status = item.status?.toLowerCase();

    return (
      <View style={styles.card}>
        {/* LEFT SIDE */}

        <View>
          <Text style={styles.type}>
            {item.type === "deposit"
              ? "Add Money"
              : item.type === "withdraw"
                ? "Withdrawal"
                : item.type}
          </Text>

          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleDateString()}

            {" • "}

            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",

              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* RIGHT SIDE */}

        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.amount}>₹{item.amount}</Text>

          <Text
            style={[
              styles.status,

              status === "pending"
                ? styles.pending
                : status === "approved" ||
                    status === "completed" ||
                    status === "success"
                  ? styles.completed
                  : styles.rejected,
            ]}
          >
            {status === "approved" ||
            status === "completed" ||
            status === "success"
              ? "COMPLETED"
              : status === "pending"
                ? "PENDING"
                : "REJECTED"}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00FF99" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.heading}>Transactions</Text>

        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Transactions Found</Text>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#121212",

    borderRadius: 22,

    padding: 20,

    marginBottom: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#1F1F1F",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.3,

    shadowRadius: 8,

    elevation: 8,
  },

  type: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  date: {
    color: "#777777",
    marginTop: 6,
    fontSize: 13,
  },

  amount: {
    color: "#00FF99",
    fontSize: 24,
    fontWeight: "bold",
  },

  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  pending: {
    color: "#FFB800",
  },

  completed: {
    color: "#00E676",
  },

  rejected: {
    color: "#FF5252",
  },

  emptyText: {
    color: "#777777",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
