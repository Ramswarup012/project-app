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
  ActivityIndicator,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import API from "../../services/api";





export default function AdminLogin() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);






  const handleLogin =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.post(

            "/auth/login",

            {
              email,
              password,
            }

          );






        if (
          response.data.success
        ) {

          /* =====================
             SAVE TOKEN
          ===================== */

     console.log(
  "TOKEN = ",
  response.data.token
);

await AsyncStorage.setItem(
  "token",
  response.data.token
);

const savedToken =
  await AsyncStorage.getItem(
    "token"
  );

console.log(
  "SAVED TOKEN = ",
  savedToken
);




          /* =====================
             SAVE USER
          ===================== */

          await AsyncStorage.setItem(

            "user",

            JSON.stringify(
              response.data.user
            )

          );






          Alert.alert(
            "Success",
            "Admin Login Successful"
          );






          router.replace(
            "/(admin)/dashboard"
          );

        }

      } catch (error: any) {

        console.log(error);

        Alert.alert(

          "Login Failed",

          error?.response?.data
            ?.error ||

          "Invalid credentials"

        );

      } finally {

        setLoading(false);

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

        disabled={loading}

      >

        {
          loading ? (

            <ActivityIndicator
              color="#000"
            />

          ) : (

            <Text style={styles.buttonText}>
              Login
            </Text>

          )
        }

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