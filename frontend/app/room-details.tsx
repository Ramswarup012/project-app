import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import API from "../services/api";

export default function RoomDetails() {

  const [tournament, setTournament] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchRoomDetails =
    async () => {

      try {

        const response =
          await API.get(
            "/tournaments/all"
          );

        setTournament(
          response.data.tournaments[0]
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchRoomDetails();

  }, []);

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#FFB800"
        />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Room Details
      </Text>

      <View style={styles.card}>

        <Text style={styles.title}>
          {tournament?.title}
        </Text>

        <Text style={styles.label}>
          Room ID
        </Text>

        <Text style={styles.value}>
          {tournament?.roomId}
        </Text>

        <Text style={styles.label}>
          Room Password
        </Text>

        <Text style={styles.value}>
          {tournament?.roomPassword}
        </Text>

        <Text style={styles.label}>
          Match Date
        </Text>

        <Text style={styles.value}>
          {tournament?.matchDate}
        </Text>

        <Text style={styles.label}>
          Match Time
        </Text>

        <Text style={styles.value}>
          {tournament?.matchTime}
        </Text>

      </View>

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

  loader: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#252525",
  },

  title: {
    color: "#FFB800",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

});