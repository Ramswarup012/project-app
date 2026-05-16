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
} from "react-native";

import API from "../services/api";

export default function Leaderboard() {

  const [players, setPlayers] =
    useState([]);

  const fetchLeaderboard =
    async () => {

      try {

        const response =
          await API.get(
            "/tournaments/leaderboard"
          );

        setPlayers(
          response.data.leaderboard
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const renderItem = ({
    item,
    index,
  }: any) => (

    <View style={styles.card}>

      <Text style={styles.rank}>
        #{index + 1}
      </Text>

      <Image

        source={{
          uri:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}

        style={styles.avatar}

      />

      <View style={styles.info}>

        <Text style={styles.name}>
          {item.winnerName}
        </Text>

        <Text style={styles.kills}>
          Kills: {item.kills}
        </Text>

      </View>

      <Text style={styles.winnings}>
        ₹{item.winningAmount}
      </Text>

    </View>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Leaderboard
      </Text>

      <FlatList

        data={players}

        renderItem={renderItem}

        keyExtractor={(_, index) =>
          index.toString()
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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252525",
  },

  rank: {
    color: "#FFB800",
    fontSize: 22,
    fontWeight: "bold",
    width: 40,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  kills: {
    color: "#AAAAAA",
    marginTop: 5,
  },

  winnings: {
    color: "#00FF99",
    fontWeight: "bold",
    fontSize: 18,
  },

});