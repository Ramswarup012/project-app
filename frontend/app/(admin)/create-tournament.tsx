import React, { useState } from "react";
import API from "../../services/api";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import TournamentPreviewCard from "../../components/admin/tournamentPreviewCard";

export default function CreateTournament() {

  const [bannerUrl, setBannerUrl] = useState("");
  const [title, setTitle] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [mapName, setMapName] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [perKill, setPerKill] = useState("");
  const [slots, setSlots] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [rules, setRules] = useState("");
  const [category, setCategory] = useState("Clash Squad");
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [matchDate, setMatchDate] = useState("");


  const handleCreateTournament = async () => {

  console.log("Create Button Pressed");

  try {

    if (
      !title ||
      !entryFee ||
      !prizePool ||
      !slots
    ) {

      Alert.alert(
        "Error",
        "Please fill all required fields"
      );

      return;
    }

    const tournamentData = {
      bannerUrl,
      title,
      gameMode,
      mapName,
      entryFee,
      prizePool,
      slots,
      roomId,
      roomPassword,
      matchDate,
      matchTime,
      rules,
      category,
      status,
    };

    console.log(
      "Sending Data:",
      tournamentData
    );

    const response = await API.post(
      "/tournaments/create",
      tournamentData
    );

    console.log(
      "Tournament Created:",
      response.data
    );

    Alert.alert(
      "Success",
      "Tournament Created Successfully"
    );

    setBannerUrl("");
    setTitle("");
    setGameMode("");
    setMapName("");
    setEntryFee("");
    setPrizePool("");
    setPerKill("");
    setSlots("");
    setMatchTime("");
    setRules("");
    setRoomId("");
    setRoomPassword("");
    setMatchDate("");

  } catch (error) {

    console.log(
      "Create Tournament Error:",
      error
    );

    Alert.alert(
      "Error",
      "Failed to create tournament"
    );

  }

};

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        CREATE TOURNAMENT
      </Text>

      <TextInput
        placeholder="Banner Image URL"
        placeholderTextColor="#777"
        value={bannerUrl}
        onChangeText={setBannerUrl}
        style={styles.input}
      />

      <Text style={styles.label}>
        Select Category
      </Text>

      <View style={styles.categoryRow}>

        <TouchableOpacity

          style={[

            styles.categoryButton,

            category ===
            "Clash Squad" &&

            styles.activeCategory,

          ]}

          onPress={() =>
            setCategory(
              "Clash Squad"
            )
          }

        >

          <Text style={styles.categoryText}>
            Clash Squad
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={[

            styles.categoryButton,

            category ===
            "Battle Royale" &&

            styles.activeCategory,

          ]}

          onPress={() =>
            setCategory(
              "Battle Royale"
            )
          }

        >

          <Text style={styles.categoryText}>
            Battle Royale
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.categoryRow}>

        <TouchableOpacity

          style={[

            styles.categoryButton,

            category ===
            "Lone Wolf" &&

            styles.activeCategory,

          ]}

          onPress={() =>
            setCategory(
              "Lone Wolf"
            )
          }

        >

          <Text style={styles.categoryText}>
            Lone Wolf
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={[

            styles.categoryButton,

            category ===
            "Free Matches" &&

            styles.activeCategory,

          ]}

          onPress={() =>
            setCategory(
              "Free Matches"
            )
          }

        >

          <Text style={styles.categoryText}>
            Free Matches
          </Text>

        </TouchableOpacity>

      </View>

      <TextInput
        placeholder="Tournament Title"
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Game Mode (Solo/Duo/Squad)"
        placeholderTextColor="#777"
        value={gameMode}
        onChangeText={setGameMode}
        style={styles.input}
      />

      <TextInput
        placeholder="Map Name"
        placeholderTextColor="#777"
        value={mapName}
        onChangeText={setMapName}
        style={styles.input}
      />

      <TextInput
        placeholder="Entry Fee"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={entryFee}
        onChangeText={setEntryFee}
        style={styles.input}
      />

      <TextInput
        placeholder="Prize Pool"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={prizePool}
        onChangeText={setPrizePool}
        style={styles.input}
      />

      <TextInput
        placeholder="Per Kill Reward"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={perKill}
        onChangeText={setPerKill}
        style={styles.input}
      />

      <TextInput
        placeholder="Total Slots"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={slots}
        onChangeText={setSlots}
        style={styles.input}
      />

      <TextInput
        placeholder="Match Time"
        placeholderTextColor="#777"
        value={matchTime}
        onChangeText={setMatchTime}
        style={styles.input}
      />

      <TextInput
        placeholder="Room ID"
        placeholderTextColor="#777"
        value={roomId}
        onChangeText={setRoomId}
        style={styles.input}
      />

      <TextInput
        placeholder="Room Password"
        placeholderTextColor="#777"
        value={roomPassword}
        onChangeText={setRoomPassword}
        style={styles.input}
      />
      <Text style={styles.statusHeading}>
        Match Status
      </Text>

      <View style={styles.statusContainer}>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Upcoming" &&
            styles.activeStatus,
          ]}
          onPress={() => setStatus("Upcoming")}
        >
          <Text style={styles.statusText}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Live" &&
            styles.activeStatus,
          ]}
          onPress={() => setStatus("Live")}
        >
          <Text style={styles.statusText}>
            Live
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Completed" &&
            styles.activeStatus,
          ]}
          onPress={() => setStatus("Completed")}
        >
          <Text style={styles.statusText}>
            Completed
          </Text>
        </TouchableOpacity>

      </View>

      <TextInput
        placeholder="Tournament Rules"
        placeholderTextColor="#777"
        multiline
        numberOfLines={5}
        value={rules}
        onChangeText={setRules}
        style={[styles.input, styles.rulesInput]}
      />

      <TextInput
        placeholder="Match Date (DD/MM/YYYY)"
        placeholderTextColor="#777"
        value={matchDate}
        onChangeText={setMatchDate}
        style={styles.input}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateTournament}
      >
        <Text style={styles.buttonText}>
          CREATE TOURNAMENT
        </Text>
      </TouchableOpacity>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 14,
    padding: 15,
    color: "#FFFFFF",
    marginBottom: 15,
    fontSize: 15,
  },

  rulesInput: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusHeading: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 5,
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statusButton: {
    backgroundColor: "#1C1C1C",
    width: "31%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  activeStatus: {
    backgroundColor: "#FFB800",
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  categoryButton: {
    backgroundColor: "#1A1A1A",
    width: "48%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },

  activeCategory: {
    backgroundColor: "#FFB800",
  },

  categoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});