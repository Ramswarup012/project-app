import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import API from "../../services/api";



export default function WalletRequests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);




  /* =========================
     FETCH REQUESTS
  ========================= */

  const fetchRequests =
    async () => {

      try {
        console.log(
  "Fetching withdrawals..."
);

        const response =
          await API.get(

            "/withdrawals/all"
          );

        console.log(
  "API RESPONSE = ",
  response.data
);

setRequests(
  response.data.withdrawals || []
);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };



  useEffect(() => {

    fetchRequests();

  }, []);





  /* =========================
     APPROVE
  ========================= */

  const approveRequest =
    async (id: string) => {

      try {

        await API.put(

          `/withdrawals/approve/${id}`

        );

        Alert.alert(
          "Success",
          "Withdrawal approved"
        );

        fetchRequests();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Approval failed"
        );

      }

    };





  /* =========================
     REJECT
  ========================= */

  const rejectRequest =
    async (id: string) => {

      try {

        await API.put(

          `/withdrawals/reject/${id}`

        );

        Alert.alert(
          "Success",
          "Withdrawal rejected"
        );

        fetchRequests();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Reject failed"
        );

      }

    };






  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#00FF99"
        />

      </View>

    );

  }






  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Wallet Requests
      </Text>





      {
        requests.map((item: any) => (

          <View
            key={item._id}
            style={styles.card}
          >

            <View style={styles.info}>

              <Text style={styles.name}>
                User ID:
              </Text>

              <Text style={styles.userId}>
                {item.userId}
              </Text>

              <Text style={styles.amount}>
                ₹{item.amount}
              </Text>

              <Text style={styles.method}>
                UPI: {item.upiId}
              </Text>

              <Text style={styles.status}>
                Status:
                {" "}
                {item.status}
              </Text>

            </View>





            <View>

              {
                item.status ===
                "pending" && (

                  <>

                    <TouchableOpacity
                      style={
                        styles.approveButton
                      }

                      onPress={() =>
                        approveRequest(
                          item._id
                        )
                      }
                    >

                      <Text
                        style={
                          styles.buttonText
                        }
                      >
                        Approve
                      </Text>

                    </TouchableOpacity>





                    <TouchableOpacity
                      style={
                        styles.rejectButton
                      }

                      onPress={() =>
                        rejectRequest(
                          item._id
                        )
                      }
                    >

                      <Text
                        style={
                          styles.buttonText
                        }
                      >
                        Reject
                      </Text>

                    </TouchableOpacity>

                  </>

                )
              }

            </View>

          </View>

        ))
      }

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
  },

  info: {
    marginBottom: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  userId: {
    color: "#AAAAAA",
    marginBottom: 10,
  },

  amount: {
    color: "#00FF99",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  method: {
    color: "#CCCCCC",
    marginBottom: 8,
  },

  status: {
    color: "#FFD54F",
    fontWeight: "bold",
  },

  approveButton: {
    backgroundColor: "#00C853",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  rejectButton: {
    backgroundColor: "#FF4D6D",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

});