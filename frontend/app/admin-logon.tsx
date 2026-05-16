import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  router,
} from "expo-router";

export default function AdminLogin() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    () => {

      if (

        email ===
          "admin@gmail.com" &&

        password ===
          "admin123"

      ) {

        router.push(
          "/(admin)/tournaments"
        );

      } else {

        Alert.alert(
          "Invalid Admin Credentials"
        );

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Admin Login
      </Text>

      <TextInput

        placeholder="Admin Email"

        placeholderTextColor="#777"

        value={email}

        onChangeText={setEmail}

        style={styles.input}

      />

      <TextInput

        placeholder="Admin Password"

        placeholderTextColor="#777"

        secureTextEntry

        value={password}

        onChangeText={setPassword}

        style={styles.input}

      />

      <TouchableOpacity

        style={styles.button}

        onPress={handleLogin}

      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    padding: 20,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#252525",
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },

});