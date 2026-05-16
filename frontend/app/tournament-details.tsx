import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import API from "../services/api";

export default function TournamentDetails() {

  const params =
    useLocalSearchParams();

  const [tournament, setTournament] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchTournament =
    async () => {

      try {

        const response =
          await API.get(

            `/tournaments/single/${params.id}`

          );

        setTournament(
          response.data.tournament
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchTournament();

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

      <Image
        source={{
          uri:
            tournament?.bannerUrl,
        }}
        style={styles.banner}
      />

      <View style={styles.content}>

        <Text style={styles.title}>
          {tournament?.title}
        </Text>

        <View style={styles.infoBox}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Prize Pool
            </Text>

            <Text style={styles.value}>
              ₹{tournament?.prizePool}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Entry Fee
            </Text>

            <Text style={styles.value}>
              ₹{tournament?.entryFee}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Game Mode
            </Text>

            <Text style={styles.value}>
              {tournament?.gameMode}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Map
            </Text>

            <Text style={styles.value}>
              {tournament?.mapName}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Slots
            </Text>

            <Text style={styles.value}>
              {tournament?.slots}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Match Date
            </Text>

            <Text style={styles.value}>
              {tournament?.matchDate}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Match Time
            </Text>

            <Text style={styles.value}>
              {tournament?.matchTime}
            </Text>
          </View>

        </View>

        <Text style={styles.rulesHeading}>
          Rules
        </Text>

        <View style={styles.rulesBox}>

          <Text style={styles.rulesText}>
            {tournament?.rules}
          </Text>

        </View>
<TouchableOpacity

  style={[

    styles.button,

    tournament?.slots <= 0 &&

    styles.disabledButton,

  ]}

  disabled={
    tournament?.slots <= 0
  }

          onPress={() =>

            router.push({

              pathname:
                "/join-match",

              params: {
                tournamentId:
                  tournament._id,
              },

            })

          }
        >

          <Text style={styles.buttonText}>
           {
  tournament?.slots <= 0

    ? "Tournament Full"

    : "Join Tournament"

}
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
  },

  loader: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    width: "100%",
    height: 250,
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  infoBox: {
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#252525",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 15,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  rulesHeading: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  rulesBox: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#252525",
  },

  rulesText: {
    color: "#CCCCCC",
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
  backgroundColor: "#555555",
},

});