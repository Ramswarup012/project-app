import React, {
  useState,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
const params =
  useLocalSearchParams();

import API from "../services/api";

export default function JoinMatch() {

  const [userName, setUserName] =
    useState("");

  const [userUID, setUserUID] =
    useState("");

  const handleJoin = async () => {

    try {

      const joinData = {

        tournamentId:
          params.tournamentId,

        userName,

        userUID,

      };

      await API.post(
        "/tournaments/join",
        joinData
      );

      Alert.alert(
        "Success",
        "Tournament Joined"
      );

    } catch (error: any) {

  Alert.alert(

    "Join Failed",

    error?.response?.data
      ?.message ||

      "Something went wrong"

  );

}
  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Join Match
      </Text>

      <TextInput
        placeholder="In Game Name"
        placeholderTextColor="#777"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TextInput
        placeholder="Player UID"
        placeholderTextColor="#777"
        value={userUID}
        onChangeText={setUserUID}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleJoin}
      >

        <Text style={styles.buttonText}>
          Join Tournament
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 20,
    justifyContent: "center",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },

});