import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const joinedUsers = [

  {
    id: 1,
    name: "Shadow Killer",
    uid: "123456789",
    status: "Joined",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: 2,
    name: "Legend Gamer",
    uid: "987654321",
    status: "Ready",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: 3,
    name: "Pro Sniper",
    uid: "741852963",
    status: "Joined",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

];

export default function JoinedUsers() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Joined Players
      </Text>

      {
        joinedUsers.map((user) => (

          <View
            key={user.id}
            style={styles.card}
          >

            <Image
              source={{ uri: user.image }}
              style={styles.avatar}
            />

            <View style={styles.info}>

              <Text style={styles.name}>
                {user.name}
              </Text>

              <Text style={styles.uid}>
                UID: {user.uid}
              </Text>

            </View>

            <View style={styles.statusBox}>

              <Text style={styles.status}>
                {user.status}
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
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 15,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252525",
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
    marginBottom: 5,
  },

  uid: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  statusBox: {
    backgroundColor: "#00FF99",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  status: {
    color: "#000000",
    fontWeight: "bold",
  },

});