import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import API from "../../services/api";

export default function PaymentRequests() {

  const [requests, setRequests] =
    useState([]);

  const fetchRequests =
    async () => {

      try {

        const response =
          await API.get(
            "/payments/all-requests"
          );

        setRequests(
          response.data.requests
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRequests();

  }, []);

  const approvePayment =
  async (id: string) => {

    try {

      await API.put(

        `/payments/approve/${id}`

      );

      Alert.alert(
        "Payment Approved"
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

    }

  };

  const rejectPayment =
  async (id: string) => {

    try {

      await API.put(

        `/payments/reject/${id}`

      );

      Alert.alert(
        "Payment Rejected"
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

    }

  };

  const renderItem = ({
    item,
  }: {
    item: any
  }) => (

    <View style={styles.card}>

      <Image

        source={{
          uri: item.screenshot,
        }}

        style={styles.image}

      />

      <Text style={styles.amount}>
        ₹{item.amount}
      </Text>

      <Text style={styles.uid}>
        UID: {item.uid}
      </Text>

     <View

  style={[

    styles.statusBadge,

    item.status ===
      "Approved"

      ? styles.approvedBadge

      : item.status ===
        "Rejected"

      ? styles.rejectedBadge

      : styles.pendingBadge,

  ]}

>

  <Text style={styles.statusText}>
    {item.status}
  </Text>

</View>

      <View style={styles.row}>

        <TouchableOpacity

          style={styles.approveButton}
            onPress={() =>  approvePayment(item._id)}   
        >

          <Text style={styles.buttonText}>
            Approve
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

  style={styles.rejectButton}

  onPress={() =>
    rejectPayment(
      item._id
    )
  }

>

          <Text style={styles.buttonText}>
            Reject
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Payment Requests
      </Text>

      <FlatList

        data={requests}

        renderItem={renderItem}

        keyExtractor={(item: any) =>
          item._id
        }

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
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#252525",
  },

  statusBadge: {
  alignSelf: "flex-start",
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  marginBottom: 14,
},

statusText: {
  color: "#FFFFFF",
  fontWeight: "bold",
},

approvedBadge: {
  backgroundColor: "#00C853",
},

rejectedBadge: {
  backgroundColor: "#FF4D6D",
},

pendingBadge: {
  backgroundColor: "#FFB800",
},

  image: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 14,
  },

  amount: {
    color: "#00FF99",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  uid: {
    color: "#FFFFFF",
    marginBottom: 8,
  },

  status: {
    color: "#FFB800",
    marginBottom: 14,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  approveButton: {
    backgroundColor: "#00C853",
    width: "48%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  rejectButton: {
    backgroundColor: "#FF4D6D",
    width: "48%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

});