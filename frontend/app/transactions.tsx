import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import API from "../services/api";
import {
  Stack,
} from "expo-router";





export default function Transactions() {

  const [transactions, setTransactions] =
    useState([]);





  const fetchTransactions =
    async () => {

      try {

        const response =
          await API.get(

            "/payments/transactions/PB100001"

          );




        setTransactions(
          response.data.transactions
        );

      } catch (error) {

        console.log(error);

      }
    };





  useEffect(() => {

    fetchTransactions();

  }, []);






  const renderItem = ({
    item,
  }: {
    item: any;
  }) => (

    <View style={styles.card}>





      {/* LEFT SIDE */}
      <View>

        <Text style={styles.type}>
          {item.type}
        </Text>





        <Text style={styles.date}>

          {
            new Date(
              item.createdAt
            ).toLocaleDateString()
          }

          {" • "}

          {
            new Date(
              item.createdAt
            ).toLocaleTimeString([], {

              hour: "2-digit",

              minute: "2-digit",

            })
          }

        </Text>

      </View>






      {/* RIGHT SIDE */}
      <View
        style={{
          alignItems: "flex-end",
        }}
      >

        <Text style={styles.amount}>
          ₹{item.amount}
        </Text>





        <Text
          style={[

            styles.status,

            item.status === "pending"
              ? styles.pending
              : item.status === "completed"
              ? styles.completed
              : styles.rejected,

          ]}
        >

          {item.status
            ? item.status.toUpperCase()
            : "PENDING"}

        </Text>

      </View>

    </View>
  );


<Stack.Screen
  options={{
    headerShown: false,
  }}
/>



  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Transactions
      </Text>





      <FlatList

        data={transactions}

        renderItem={renderItem}

        keyExtractor={(item: any) =>
          item._id
        }

        showsVerticalScrollIndicator={false}

      />

    </View>
  );
}






const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 16,
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

});