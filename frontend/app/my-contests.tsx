import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import API from "../services/api";

export default function MyContests() {

  const [contests, setContests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchContests =
    async () => {

      try {

        const response =
          await API.get(
            "/tournaments/joined"
          );

        setContests(
          response.data.contests
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchContests();

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
        My Contests
      </Text>

      {
        contests.map((item: any) => (

          <View
            key={item._id}
            style={styles.card}
          >

            <Text style={styles.name}>
              {item.userName}
            </Text>

            <Text style={styles.uid}>
              UID: {item.userUID}
            </Text>

            <Text style={styles.date}>
              Joined Match
            </Text>

          </View>

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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  uid: {
    color: "#AAAAAA",
    fontSize: 15,
    marginBottom: 10,
  },

  date: {
    color: "#00FF99",
    fontWeight: "bold",
  },

});