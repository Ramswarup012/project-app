import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const players = [

  {
    id: 1,
    name: "Shadow Killer",
    kills: 120,
    winnings: 15000,
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: 2,
    name: "Legend Gamer",
    kills: 98,
    winnings: 12000,
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: 3,
    name: "Pro Sniper",
    kills: 90,
    winnings: 9000,
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

];

export default function Leaderboard() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Leaderboard
      </Text>

      {
        players.map((player, index) => (

          <View
            key={player.id}
            style={styles.card}
          >

            <Text style={styles.rank}>
              #{index + 1}
            </Text>

            <Image
              source={{
                uri: player.avatar,
              }}
              style={styles.avatar}
            />

            <View style={styles.info}>

              <Text style={styles.name}>
                {player.name}
              </Text>

              <Text style={styles.kills}>
                Kills: {player.kills}
              </Text>

            </View>

            <Text style={styles.winnings}>
              ₹{player.winnings}
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

  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252525",
  },

  rank: {
    color: "#FFB800",
    fontSize: 22,
    fontWeight: "bold",
    width: 45,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  kills: {
    color: "#AAAAAA",
  },

  winnings: {
    color: "#00FF99",
    fontSize: 17,
    fontWeight: "bold",
  },

});