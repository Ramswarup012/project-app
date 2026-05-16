import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import API from "../../services/api";

export default function Home() {

  const [tournaments, setTournaments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchTournaments =
    async () => {

      try {

        const response =
          await API.get(
            "/tournaments/all"
          );

        setTournaments(
          response.data.tournaments
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchTournaments();

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

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Live Tournaments
      </Text>

      {
        tournaments.map((item: any) => (

       <TouchableOpacity
  key={item._id}
  style={styles.card}
  onPress={() =>
   router.push({

  pathname:
    "/tournament-details",

  params: {
    id: item._id,
  },

})
  }
>

            <Image
              source={{
                uri:
                  item.bannerUrl,
              }}
              style={styles.banner}
            />

            <View style={styles.content}>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <View style={styles.row}>

                <Text style={styles.label}>
                  Prize:
                  <Text style={styles.value}>
                    {" "}
                    ₹{item.prizePool}
                  </Text>
                </Text>

                <Text style={styles.label}>
                  Entry:
                  <Text style={styles.value}>
                    {" "}
                    ₹{item.entryFee}
                  </Text>
                </Text>

              </View>

              <View style={styles.row}>

                <Text style={styles.label}>
                  Mode:
                  <Text style={styles.value}>
                    {" "}
                    {item.gameMode}
                  </Text>
                </Text>

                <Text style={styles.label}>
                  Slots:
                  <Text style={styles.value}>
                    {" "}
                    {item.slots}
                  </Text>
                </Text>

              </View>

              <Text style={styles.date}>
                {item.matchDate}
                {" • "}
                {item.matchTime}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push(
                    "/join-match"
                  )
                }
              >

                <Text style={styles.buttonText}>
                  Join Match
                </Text>

              </TouchableOpacity>

            </View>

          </TouchableOpacity>

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
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#252525",
  },

  banner: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  value: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  date: {
    color: "#00BFFF",
    marginTop: 5,
    marginBottom: 20,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
  },

});