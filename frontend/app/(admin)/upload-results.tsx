import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function UploadResults() {

  const [playerName, setPlayerName] = useState("");
  const [playerUID, setPlayerUID] = useState("");
  const [position, setPosition] = useState("");
  const [kills, setKills] = useState("");

  const handleUpload = () => {

    const resultData = {
      playerName,
      playerUID,
      position,
      kills,
    };

    console.log("Result Uploaded:", resultData);

  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Upload Match Result
      </Text>

      <TextInput
        placeholder="Player Name"
        placeholderTextColor="#777"
        value={playerName}
        onChangeText={setPlayerName}
        style={styles.input}
      />

      <TextInput
        placeholder="Player UID"
        placeholderTextColor="#777"
        value={playerUID}
        onChangeText={setPlayerUID}
        style={styles.input}
      />

      <TextInput
        placeholder="Match Position"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />

      <TextInput
        placeholder="Total Kills"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={kills}
        onChangeText={setKills}
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
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#252525",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },

});