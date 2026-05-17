import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

export default function JoinMatch() {

  const params =
    useLocalSearchParams();

  const tournamentId = Array.isArray(
    params.tournamentId
  )
    ? params.tournamentId[0]
    : params.tournamentId;

  const slot = Array.isArray(
    params.slot
  )
    ? params.slot[0]
    : params.slot;

  const [userName, setUserName] =
    useState("");

  const [userUID, setUserUID] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [tournament, setTournament] =
    useState<any>(null);

  const [wallet, setWallet] =
    useState(0);

  const [successModalVisible, setSuccessModalVisible] =
    useState(false);

  const [insufficientBalanceModalVisible, setInsufficientBalanceModalVisible] =
    useState(false);

  const fetchData = async () => {
    
    try {
      
      setLoading(true);

      console.log(
        "Fetching for Tournament:",
        tournamentId,
        "Slot:",
        slot
      );
      
      // Fetch tournament details
      const tournamentResponse =
        await API.get(
          `/tournaments/single/${tournamentId}`
        );
      
      setTournament(
        tournamentResponse.data
          .tournament
      );

      // Fetch wallet balance
      const token =
        await AsyncStorage.getItem(
          "usertoken"
        );
      
      const userResponse =
        await API.get(
          "/auth/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
      
      setWallet(
        userResponse.data.user
          .wallet || 0
      );

    } catch (error: any) {
      
      console.log(error);
      
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
        "Failed to load data"
      );
      
    } finally {
      
      setLoading(false);
      
    }

  };

  useEffect(() => {
    
    if (tournamentId) {
      
      fetchData();
      
    }
    
  }, [tournamentId]);

  const handleJoin = async () => {

    if (!userName.trim()) {
      
      Alert.alert(
        "Error",
        "Please enter your in-game name"
      );
      
      return;

    }

    if (!userUID.trim()) {
      
      Alert.alert(
        "Error",
        "Please enter your Player UID"
      );
      
      return;

    }

    const entryFee =
      Number(
        tournament?.entryFee || 0
      );

    if (wallet < entryFee) {
      
      setInsufficientBalanceModalVisible(
        true
      );
      
      return;

    }

    try {

      setLoading(true);

      const joinData = {

        tournamentId:
          tournamentId,

        userName,

        userUID,

        slotNumber:
          Number(slot),

      };

      await API.post(
        "/tournaments/join",
        joinData
      );

      setSuccessModalVisible(true);

    } catch (error: any) {

      console.log(error);

      const errorMessage =
        error?.response?.data
          ?.message ||
        "Something went wrong";

      if (
        errorMessage.includes(
          "wallet"
        )
      ) {
        
        setInsufficientBalanceModalVisible(
          true
        );
        
      } else {
        
        Alert.alert(
          "Join Failed",
          errorMessage
        );
        
      }

    } finally {
      
      setLoading(false);
      
    }

  };

  if (loading && !tournament) {
    
    return (
      
      <View style={styles.loader}>
        
        <ActivityIndicator
          size="large"
          color="#FFB800"
        />
        
      </View>

    );

  }

  const entryFee =
    Number(
      tournament?.entryFee || 0
    );

  const hasEnoughBalance =
    wallet >= entryFee;

  return (

    <View style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          
          <Text style={styles.heading}>
            Confirm Details
          </Text>
          
          <Text style={styles.subheading}>
            {tournament?.title}
          </Text>

        </View>

        <View style={styles.infoSection}>

          <View style={styles.infoBox}>
            
            <Text style={styles.infoLabel}>
              Selected Slot
            </Text>
            
            <Text style={styles.infoValue}>
              Slot #{slot}
            </Text>

          </View>

          <View style={styles.infoBox}>
            
            <Text style={styles.infoLabel}>
              Entry Fee
            </Text>
            
            <Text style={styles.infoValue}>
              ₹{entryFee}
            </Text>

          </View>

          <View style={styles.infoBox}>
            
            <Text style={styles.infoLabel}>
              Your Wallet Balance
            </Text>
            
            <Text
              style={[
                styles.infoValue,
                !hasEnoughBalance &&
                  styles.errorText,
              ]}
            >
              ₹{wallet}
            </Text>

          </View>

        </View>

        <View style={styles.formSection}>

          <Text style={styles.formHeading}>
            Player Information
          </Text>

          <TextInput
            placeholder="In Game Name"
            placeholderTextColor="#777"
            value={userName}
            onChangeText={setUserName}
            style={styles.input}
            editable={!loading}
          />

          <TextInput
            placeholder="Player UID"
            placeholderTextColor="#777"
            value={userUID}
            onChangeText={setUserUID}
            style={styles.input}
            editable={!loading}
          />

        </View>

        {!hasEnoughBalance && (
          
          <View style={styles.warningBox}>
            
            <Text style={styles.warningText}>
              ⚠️ Insufficient wallet
              balance!
            </Text>
            
            <Text
              style={
                styles.warningSubText
              }
            >
              You need ₹{entryFee - wallet}{" "}
              more to join this
              tournament.
            </Text>

          </View>

        )}

      </ScrollView>

      <View style={styles.footer}>

        <TouchableOpacity
          style={[
            styles.button,
            !hasEnoughBalance &&
              styles.buttonDisabled,
            loading &&
              styles.buttonDisabled,
          ]}
          disabled={
            !hasEnoughBalance ||
            loading
          }
          onPress={handleJoin}
        >

          <Text style={styles.buttonText}>
            {loading
              ? "Joining..."
              : "Join Tournament"}
          </Text>

        </TouchableOpacity>

      </View>

      <Modal
        transparent={true}
        visible={successModalVisible}
        animationType="fade"
      >
        
        <View style={styles.modalOverlay}>
          
          <View style={styles.modalContent}>
            
            <Text style={styles.successIcon}>
              ✓
            </Text>
            
            <Text style={styles.successTitle}>
              Joined Successfully!
            </Text>
            
            <Text style={styles.successMessage}>
              Your slot has been booked
              and entry fee of ₹
              {entryFee} has been
              deducted from your
              wallet.
            </Text>

            <View style={styles.summaryBox}>
              
              <View style={styles.summaryRow}>
                
                <Text
                  style={
                    styles.summaryLabel
                  }
                >
                  Player Name
                </Text>
                
                <Text
                  style={
                    styles.summaryValue
                  }
                >
                  {userName}
                </Text>

              </View>

              <View style={styles.summaryRow}>
                
                <Text
                  style={
                    styles.summaryLabel
                  }
                >
                  Player UID
                </Text>
                
                <Text
                  style={
                    styles.summaryValue
                  }
                >
                  {userUID}
                </Text>

              </View>

              <View style={styles.summaryRow}>
                
                <Text
                  style={
                    styles.summaryLabel
                  }
                >
                  Slot Number
                </Text>
                
                <Text
                  style={
                    styles.summaryValue
                  }
                >
                  #{slot}
                </Text>

              </View>

            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                
                setSuccessModalVisible(
                  false
                );
                
                router.push("/my-contests");
                
              }}
            >
              
              <Text style={styles.modalButtonText}>
                Go to My Contests
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <Modal
        transparent={true}
        visible={
          insufficientBalanceModalVisible
        }
        animationType="fade"
      >
        
        <View style={styles.modalOverlay}>
          
          <View style={styles.modalContent}>
            
            <Text style={styles.errorIcon}>
              ⚠️
            </Text>
            
            <Text style={styles.errorTitle}>
              Insufficient Balance
            </Text>
            
            <Text style={styles.errorMessage}>
              Your wallet balance is not
              enough to join this
              tournament.
            </Text>

            <View style={styles.balanceBox}>
              
              <View style={styles.balanceRow}>
                
                <Text
                  style={
                    styles.balanceLabel
                  }
                >
                  Required
                </Text>
                
                <Text
                  style={
                    styles.balanceValue
                  }
                >
                  ₹{entryFee}
                </Text>

              </View>

              <View style={styles.balanceRow}>
                
                <Text
                  style={
                    styles.balanceLabel
                  }
                >
                  Available
                </Text>
                
                <Text
                  style={
                    styles.balanceValueError
                  }
                >
                  ₹{wallet}
                </Text>

              </View>

              <View
                style={
                  styles.balanceSeparator
                }
              />

              <View style={styles.balanceRow}>
                
                <Text
                  style={
                    styles.balanceLabel
                  }
                >
                  You need
                </Text>
                
                <Text
                  style={
                    styles.balanceValueError
                  }
                >
                  ₹{entryFee - wallet}
                </Text>

              </View>

            </View>

            <TouchableOpacity
              style={styles.addMoneyButton}
              onPress={() => {
                
                setInsufficientBalanceModalVisible(
                  false
                );
                
                router.push(
                  "/add-money"
                );
                
              }}
            >
              
              <Text
                style={
                  styles.addMoneyButtonText
                }
              >
                Add Money
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                
                setInsufficientBalanceModalVisible(
                  false
                );
                
                router.back();
                
              }}
            >
              
              <Text
                style={
                  styles.cancelButtonText
                }
              >
                Cancel
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  loader: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subheading: {
    color: "#FFB800",
    fontSize: 16,
    fontWeight: "600",
  },

  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  infoBox: {
    backgroundColor: "#161616",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFB800",
  },

  infoLabel: {
    color: "#AAAAAA",
    fontSize: 13,
    marginBottom: 4,
  },

  infoValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorText: {
    color: "#FF6B6B",
  },

  formSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  formHeading: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#161616",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#252525",
    fontSize: 15,
  },

  warningBox: {
    marginHorizontal: 20,
    backgroundColor: "#FF6B6B20",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
  },

  warningText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  warningSubText: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#252525",
  },

  button: {
    backgroundColor: "#FFB800",
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#8A8A8A",
    opacity: 0.6,
  },

  buttonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },

  successIcon: {
    fontSize: 60,
    color: "#00CC88",
    marginBottom: 16,
  },

  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  successTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  errorTitle: {
    color: "#FF6B6B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  successMessage: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },

  errorMessage: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },

  summaryBox: {
    width: "100%",
    backgroundColor: "#0A0A0A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },

  summaryLabel: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  summaryValue: {
    color: "#FFB800",
    fontSize: 14,
    fontWeight: "bold",
  },

  balanceBox: {
    width: "100%",
    backgroundColor: "#0A0A0A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  balanceRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  balanceLabel: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  balanceValue: {
    color: "#00CC88",
    fontSize: 16,
    fontWeight: "bold",
  },

  balanceValueError: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
  },

  balanceSeparator: {
    height: 1,
    backgroundColor: "#252525",
    marginVertical: 8,
  },

  modalButton: {
    width: "100%",
    backgroundColor: "#00CC88",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },

  addMoneyButton: {
    width: "100%",
    backgroundColor: "#FFB800",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },

  cancelButton: {
    width: "100%",
    backgroundColor: "#2E2E2E",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },

  modalButtonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  addMoneyButtonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

});
