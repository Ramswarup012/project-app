import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function NotificationsScreen() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSendNotification = () => {

    const notificationData = {
      title,
      message,
    };

    console.log(
      "Notification Sent:",
      notificationData
    );

  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Send Notification
      </Text>

      <TextInput
        placeholder="Notification Title"
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Write notification message..."
        placeholderTextColor="#777"
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
        style={[styles.input, styles.messageInput]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendNotification}
      >

        <Text style={styles.buttonText}>
          Send Notification
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

  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#252525",
    fontSize: 15,
  },

  messageInput: {
    height: 150,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },

});