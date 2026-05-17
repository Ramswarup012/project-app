import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function PaymentProcessing() {
  const router = useRouter();

  const { amount } = useLocalSearchParams();

  const [seconds, setSeconds] = useState(180);

  /* =========================
       TIMER FORMAT
    ========================= */

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  /* =========================
       TIMER
    ========================= */

  useEffect(() => {
    if (seconds <= 0) {
      Alert.alert(
        "Payment Failed",

        "Payment session expired",

        [
          {
            text: "OK",

            onPress: () => {
              router.replace("/add-money");
            },
          },
        ],
      );

      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <SafeAreaView style={styles.container}>
      {/* FULL CARD */}

      <View style={styles.card}>
        {/* TOP SECTION */}

        <View style={styles.topSection}>
          <Text style={styles.payText}>PAYING TO</Text>

          <Text style={styles.name}>ProBattle</Text>

          {/* AMOUNT */}

          <View style={styles.amountBox}>
            <Text style={styles.rupee}>₹</Text>

            <Text style={styles.amount}>{amount}.00</Text>
          </View>
        </View>

        {/* BOTTOM SECTION */}

        <View style={styles.bottomSection}>
          <Text style={styles.scanTitle}>SCAN TO PAY INSTANTLY</Text>

          {/* QR */}

          <Image
            source={require("../assets/images/upi-qr.jpg")}
            style={styles.qr}
          />

          {/* BUTTON */}

          <View style={styles.scanButton}>
            <Text style={styles.scanButtonText}>
              QR scan karke payment karein
            </Text>
          </View>

          {/* APPS */}

          <View style={styles.appsRow}>
            <View style={styles.appChip}>
              <Text style={styles.appText}>● GPay</Text>
            </View>

            <View style={styles.appChip}>
              <Text style={styles.appText}>● PhonePe</Text>
            </View>

            <View style={styles.appChip}>
              <Text style={styles.appText}>● Paytm</Text>
            </View>

            <View style={styles.appChip}>
              <Text style={styles.appText}>● BHIM</Text>
            </View>
          </View>

          {/* TIMER */}

          <View style={styles.timerBox}>
            <Text style={styles.timer}>⏱ Expires in {formatTime(seconds)}</Text>

            <Text style={styles.secure}>🛡 Secure</Text>
          </View>

          {/* FOOTER */}

          <Text style={styles.footer}>Powered by ProBattle</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5EF",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.92,

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    overflow: "hidden",

    elevation: 10,
  },

  topSection: {
    backgroundColor: "#006B2E",

    alignItems: "center",

    paddingTop: 20,

    paddingBottom: 0,
  },

  payText: {
    color: "#CDE8D5",
    fontSize: 15,
    letterSpacing: 2,
    marginBottom: 8,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  amountBox: {
    backgroundColor: "#0A8B3D",

    marginTop: 24,

    borderRadius: 45,

    paddingVertical: 18,

    paddingHorizontal: 38,

    flexDirection: "row",

    alignItems: "center",
  },

  rupee: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 8,
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
  },

  bottomSection: {
    alignItems: "center",
    padding: 22,
  },

  scanTitle: {
    color: "#73917A",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 22,
  },

  qr: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: 16,
  },

  scanButton: {
    backgroundColor: "#E7F5EA",

    marginTop: 22,

    paddingVertical: 14,

    paddingHorizontal: 22,

    borderRadius: 16,
  },

  scanButtonText: {
    color: "#0B7A39",
    fontSize: 18,
    fontWeight: "700",
  },

  appsRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "center",

    marginTop: 22,
  },

  appChip: {
    backgroundColor: "#E6F2E8",

    paddingVertical: 10,

    paddingHorizontal: 16,

    borderRadius: 30,

    margin: 5,
  },

  appText: {
    color: "#0B7A39",
    fontWeight: "bold",
    fontSize: 14,
  },

  timerBox: {
    backgroundColor: "#EEF6F0",

    marginTop: 22,

    width: "100%",

    paddingVertical: 16,

    paddingHorizontal: 18,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  timer: {
    color: "#4A6B50",
    fontWeight: "bold",
    fontSize: 15,
  },

  secure: {
    color: "#0B7A39",
    fontWeight: "bold",
    fontSize: 15,
  },

  footer: {
    color: "#8AA08F",
    marginTop: 24,
    fontSize: 14,
    fontWeight: "600",
  },
});
