import React, {
  useState,
} from "react";
import API from "../../services/api";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function UploadResult() {

  const [tournamentId, setTournamentId] =
    useState("");

  const [winnerName, setWinnerName] =
    useState("");

  const [winnerUID, setWinnerUID] =
    useState("");

  const [kills, setKills] =
    useState("");

  const [winningAmount, setWinningAmount] =
    useState("");

  const handleUpload =
  async () => {

    try {

      await API.post(

        "/tournaments/upload-result",

        {

          tournamentId,

          winnerName,

          winnerUID,

          kills,

          winningAmount,

        }

      );

      Alert.alert(
        "Result Uploaded"
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Upload Match Result
      </Text>

      <View style={styles.card}>

        <TextInput

          placeholder="Tournament ID"

          placeholderTextColor="#777"

          value={tournamentId}

          onChangeText={
            setTournamentId
          }

          style={styles.input}

        />

        <TextInput

          placeholder="Winner Name"

          placeholderTextColor="#777"

          value={winnerName}

          onChangeText={
            setWinnerName
          }

          style={styles.input}

        />

        <TextInput

          placeholder="Winner UID"

          placeholderTextColor="#777"

          value={winnerUID}

          onChangeText={
            setWinnerUID
          }

          style={styles.input}

        />

        <TextInput

          placeholder="Kills"

          placeholderTextColor="#777"

          keyboardType="numeric"

          value={kills}

          onChangeText={setKills}

          style={styles.input}

        />

        <TextInput

          placeholder="Winning Amount"

          placeholderTextColor="#777"

          keyboardType="numeric"

          value={winningAmount}

          onChangeText={
            setWinningAmount
          }

          style={styles.input}

        />

        <TouchableOpacity

          style={styles.button}

          onPress={handleUpload}

        >

          <Text style={styles.buttonText}>
            Upload Result
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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#252525",
  },

  input: {
    backgroundColor: "#0F0F0F",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#333333",
  },

  button: {
    backgroundColor: "#00C853",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

});