import React, {
  useState,
} from "react";
import * as ImagePicker
  from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";

export default function AddMoney() {

  const [amount, setAmount] =
    useState("");

  const [screenshot, setScreenshot] =
    useState<any>(null);

  const pickScreenshot =
    async () => {

      const result =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          quality: 1,

        });

      if (!result.canceled) {

        setScreenshot(
          result.assets[0].uri
        );

      }

    };
const handleAddMoney =
  async () => {

    try {

      if (!amount) {

        Alert.alert(
          "Enter Amount"
        );

        return;

      }

      if (!screenshot) {

        Alert.alert(
          "Upload Payment Screenshot"
        );

        return;

      }

      await API.post(

        "/payments/submit-request",

        {

          uid: "PB100001",

          amount,

          screenshot,

        }

      );

      Alert.alert(

        "Request Submitted",

        "Admin will verify your payment screenshot."

      );

      setAmount("");

      setScreenshot(null);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <ScrollView
      style={styles.container}
    >

      <Text style={styles.heading}>
        Add Money
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Enter Amount
        </Text>

        <Image

          source={require(
            "../assets/images/upi-qr.jpg"
          )}

          style={styles.qr}

        />

        <Text style={styles.scanText}>
          Scan & Pay Using Any UPI App
        </Text>

        <TextInput

          placeholder="Enter amount"

          placeholderTextColor="#777"

          keyboardType="numeric"

          value={amount}

          onChangeText={setAmount}

          style={styles.input}

        />

        <TouchableOpacity

          style={styles.uploadButton}

          onPress={pickScreenshot}

        >

          <Text style={styles.uploadText}>
            Upload Payment Screenshot
          </Text>

        </TouchableOpacity>

        {
          screenshot && (

            <Image

              source={{
                uri: screenshot,
              }}

              style={styles.preview}

            />

          )
        }

        <TouchableOpacity

          style={styles.button}

          onPress={handleAddMoney}

        >

          <Text style={styles.buttonText}>
            Proceed Payment
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

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
    marginBottom: 16,
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
    backgroundColor: "#00C853",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  qr: {
    width: 220,
    height: 220,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 20,
  },

  uploadButton: {
    backgroundColor: "#1F1F1F",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },

  uploadText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 20,
  },

  scanText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "bold",
  },

});