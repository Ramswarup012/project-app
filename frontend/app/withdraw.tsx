import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function WithdrawScreen() {

  const [amount, setAmount] =
    useState("");

  const [upi, setUpi] =
    useState("");
const handleWithdraw = async () => {

  try {

    if (!amount || !upi) {

      Alert.alert("Fill all fields");

      return;
    }

    const token =
      await AsyncStorage.getItem("usertoken");
      console.log("TOKEN =", token);



    const response = await axios.post(

      "http://10.147.182.122:3001/api/withdrawals/request",

      {
        amount: Number(amount),
        upiId: upi,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );



    Alert.alert(
      "Success",
      response.data.message
    );



    console.log(response.data);

  } catch (error: any) {

  console.log(
    error.response?.data
  );

  Alert.alert(

    "Error",

    error.response?.data?.message ||
    "Withdrawal failed"

  );
}
};

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Withdraw Money
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Withdraw Amount
        </Text>

        <TextInput

          placeholder="Enter amount"

          placeholderTextColor="#777"

          keyboardType="numeric"

          value={amount}

          onChangeText={setAmount}

          style={styles.input}

        />

        <Text style={styles.label}>
          UPI ID
        </Text>

        <TextInput

          placeholder="example@upi"

          placeholderTextColor="#777"

          value={upi}

          onChangeText={setUpi}

          style={styles.input}

        />

        <TouchableOpacity

          style={styles.button}

          onPress={handleWithdraw}

        >

          <Text style={styles.buttonText}>
            Submit Withdraw
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 20,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#252525",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 14,
  },

  input: {
    backgroundColor: "#0F0F0F",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333333",
  },

  button: {
    backgroundColor: "#FF4D6D",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

});