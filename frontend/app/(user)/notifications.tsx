import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const notifications = [

  {
    id: 1,
    title:
      "Room Details Released",
    message:
      "Room ID & Password available now.",
    time: "2 min ago",
  },

  {
    id: 2,
    title:
      "Tournament Starting Soon",
    message:
      "Your match starts in 30 minutes.",
    time: "10 min ago",
  },

  {
    id: 3,
    title:
      "Winner Announcement",
    message:
      "Prize distributed successfully.",
    time: "1 hour ago",
  },

];

export default function Notifications() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Notifications
      </Text>

      {
        notifications.map((item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.message}>
              {item.message}
            </Text>

            <Text style={styles.time}>
              {item.time}
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

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  message: {
    color: "#CCCCCC",
    lineHeight: 22,
    marginBottom: 12,
  },

  time: {
    color: "#FFB800",
    fontWeight: "bold",
  },

});