import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const requests = [

  {
    id: 1,
    name: "Shadow Killer",
    amount: "₹500",
    method: "UPI",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: 2,
    name: "Legend Gamer",
    amount: "₹1200",
    method: "Paytm",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

];

export default function WalletRequests() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Wallet Requests
      </Text>

      {
        requests.map((item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <Image
              source={{ uri: item.image }}
              style={styles.avatar}
            />

            <View style={styles.info}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.amount}>
                {item.amount}
              </Text>

              <Text style={styles.method}>
                Method: {item.method}
              </Text>

            </View>

            <View>

              <TouchableOpacity
                style={styles.approveButton}
              >
                <Text style={styles.buttonText}>
                  Approve
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectButton}
              >
                <Text style={styles.buttonText}>
                  Reject
                </Text>
              </TouchableOpacity>

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
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#252525",
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  amount: {
    color: "#00FF99",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },

  method: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  approveButton: {
    backgroundColor: "#00C853",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  rejectButton: {
    backgroundColor: "#FF4D6D",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

});