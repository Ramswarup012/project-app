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
  useRouter,
} from "expo-router";


export default function AdminLogin() {

  const router =
    useRouter();

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
          "/(admin)/dashboard"
        );

      } else {

        Alert.alert(
          "Invalid Admin Credentials"
        );

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        ADMIN PANEL
      </Text>

      <TextInput

        placeholder="Admin Email"

        placeholderTextColor="#777"

        value={email}

        onChangeText={setEmail}

        style={styles.input}

      />

      <TextInput

        placeholder="Password"

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
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 12,
    color: "#FFFFFF",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#FFB800",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

});