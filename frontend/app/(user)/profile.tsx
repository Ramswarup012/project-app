import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Profile() {

  const user = {

    name: "Shadow Killer",

    uid: "PB102938",

    email:
      "shadow@gmail.com",

    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

    wallet: "2500",

    matches: "45",

    wins: "12",

  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Image
          source={{
            uri: user.avatar,
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user.name}
        </Text>

        <Text style={styles.uid}>
          UID: {user.uid}
        </Text>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            ₹{user.wallet}
          </Text>

          <Text style={styles.statsLabel}>
            Wallet
          </Text>

        </View>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            {user.matches}
          </Text>

          <Text style={styles.statsLabel}>
            Matches
          </Text>

        </View>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            {user.wins}
          </Text>

          <Text style={styles.statsLabel}>
            Wins
          </Text>

        </View>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            78%
          </Text>

          <Text style={styles.statsLabel}>
            Win Rate
          </Text>

        </View>

      </View>

      <View style={styles.infoCard}>

        <Text style={styles.infoHeading}>
          Account Information
        </Text>

        <View style={styles.row}>

          <Text style={styles.label}>
            Email
          </Text>

          <Text style={styles.value}>
            {user.email}
          </Text>

        </View>

        <View style={styles.row}>

          <Text style={styles.label}>
            Account Status
          </Text>

          <Text style={styles.active}>
            Active
          </Text>

        </View>

      </View>

      <TouchableOpacity
        style={styles.button}
      >

        <Text style={styles.buttonText}>
          Edit Profile
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

  header: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 35,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: "#FFB800",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  uid: {
    color: "#AAAAAA",
    fontSize: 15,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  statsCard: {
    backgroundColor: "#161616",
    width: "48%",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252525",
  },

  statsNumber: {
    color: "#FFB800",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  statsLabel: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  infoCard: {
    backgroundColor: "#161616",
    borderRadius: 22,
    padding: 22,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#252525",
  },

  infoHeading: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 15,
  },

  value: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  active: {
    color: "#00FF99",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 40,
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },

});