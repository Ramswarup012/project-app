import {
  View,
 Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const matches = [

  {
    id: 1,
    tournament:
      "Free Fire Squad Match",
    rank: "#1",
    kills: 12,
    winnings: 2500,
    status: "Won",
  },

  {
    id: 2,
    tournament:
      "Clash Squad Tournament",
    rank: "#4",
    kills: 6,
    winnings: 500,
    status: "Completed",
  },

  {
    id: 3,
    tournament:
      "Bermuda Battle",
    rank: "#10",
    kills: 2,
    winnings: 0,
    status: "Lost",
  },

];

export default function MatchHistory() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Match History
      </Text>

      {
        matches.map((item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <Text style={styles.title}>
              {item.tournament}
            </Text>

            <View style={styles.row}>

              <Text style={styles.label}>
                Rank:
                <Text style={styles.value}>
                  {" "}
                  {item.rank}
                </Text>
              </Text>

              <Text style={styles.label}>
                Kills:
                <Text style={styles.value}>
                  {" "}
                  {item.kills}
                </Text>
              </Text>

            </View>

            <View style={styles.row}>

              <Text style={styles.label}>
                Winnings:
                <Text style={styles.win}>
                  {" "}
                  ₹{item.winnings}
                </Text>
              </Text>

              <Text
                style={[
                  styles.status,

                  item.status === "Won"
                    ? styles.won
                    : item.status ===
                      "Lost"
                    ? styles.lost
                    : styles.completed,
                ]}
              >
                {item.status}
              </Text>

            </View>

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
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 15,
  },

  value: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  win: {
    color: "#00FF99",
    fontWeight: "bold",
  },

  status: {
    fontWeight: "bold",
    fontSize: 15,
  },

  won: {
    color: "#00FF99",
  },

  lost: {
    color: "#FF4D6D",
  },

  completed: {
    color: "#FFB800",
  },

});