import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import API from "../../services/api";

export default function EditTournament() {

  const params =
    useLocalSearchParams();

  const [title, setTitle] =
    useState("");

  const [prizePool, setPrizePool] =
    useState("");

  const [entryFee, setEntryFee] =
    useState("");

  const [slots, setSlots] =
    useState("");

  const fetchTournament =
    async () => {

      try {

        const response =
          await API.get(

            `/tournaments/single/${params.id}`

          );

        const t =
          response.data.tournament;

        setTitle(t.title);

        setPrizePool(
          t.prizePool
        );

        setEntryFee(
          t.entryFee
        );

        setSlots(t.slots);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTournament();

  }, []);

  const handleUpdate =
    async () => {

      try {

        await API.put(

          `/tournaments/update/${params.id}`,

          {

            title,

            prizePool,

            entryFee,

            slots,

          }

        );

        Alert.alert(
          "Tournament Updated"
        );

        router.back();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Edit Tournament
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#777"
      />

      <TextInput
        value={prizePool}
        onChangeText={setPrizePool}
        style={styles.input}
        placeholder="Prize Pool"
        placeholderTextColor="#777"
      />

      <TextInput
        value={entryFee}
        onChangeText={setEntryFee}
        style={styles.input}
        placeholder="Entry Fee"
        placeholderTextColor="#777"
      />

      <TextInput
        value={slots}
        onChangeText={setSlots}
        style={styles.input}
        placeholder="Slots"
        placeholderTextColor="#777"
      />

      <TouchableOpacity

        style={styles.button}

        onPress={handleUpdate}

      >

        <Text style={styles.buttonText}>
          Update Tournament
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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },

});