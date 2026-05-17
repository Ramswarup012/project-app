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
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import API from "../services/api";

export default function SelectSlot() {
  
  const params =
    useLocalSearchParams();

  const tournamentId = Array.isArray(
    params.id
  )
    ? params.id[0]
    : params.id;

  const [tournament, setTournament] =
    useState<any>(null);

  const [selectedSlot, setSelectedSlot] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [bookedSlots, setBookedSlots] =
    useState<number[]>([]);

  const fetchTournamentAndSlots =
    async () => {
      
      try {

        console.log(
          "Fetching Tournament ID:",
          tournamentId,
          "Type:",
          typeof tournamentId
        );

        if (!tournamentId) {
          
          throw new Error(
            "No tournament ID provided"
          );
          
        }
        
        // Fetch tournament details
        try {
          
          const tournamentResponse =
            await API.get(
              `/tournaments/single/${tournamentId}`
            );
          
          console.log(
            "Tournament Response:",
            tournamentResponse.data
          );

          setTournament(
            tournamentResponse.data
              .tournament
          );
          
        } catch (tourError: any) {
          
          console.log(
            "Tournament Fetch Error:",
            tourError?.response?.status,
            tourError?.response?.data
          );
          
          Alert.alert(
            "Error",
            `Tournament not found (${tourError?.response?.status}). Please try again.`
          );
          
          setLoading(false);
          return;
          
        }

        // Fetch booked slots - make it optional
        try {
          
          const slotsResponse =
            await API.get(
              `/tournaments/booked-slots/${tournamentId}`
            );
          
          console.log(
            "Booked Slots:",
            slotsResponse.data
          );

          setBookedSlots(
            slotsResponse.data.bookedSlots ||
            []
          );
          
        } catch (slotsError: any) {
          
          console.log(
            "Booked Slots Error:",
            slotsError?.message
          );
          
          // If booked slots fail, just use empty array
          setBookedSlots([]);
          
        }

      } catch (error: any) {
        
        console.log(
          "Fetch Error:",
          error?.message,
          error?.response?.status,
          error?.response?.data
        );
        
        Alert.alert(
          "Error",
          error?.message ||
          error?.response?.data?.message ||
          "Failed to load tournament details"
        );
        
      } finally {
        
        setLoading(false);
        
      }

    };

  useEffect(() => {
    
    if (tournamentId) {
      
      fetchTournamentAndSlots();
      
    }
    
  }, [tournamentId]);

  const handleSlotSelect =
    (slotNumber: number) => {
      
      if (!bookedSlots.includes(slotNumber)) {
        
        setSelectedSlot(slotNumber);
        
      }

    };

  const handleContinue = () => {
    
    if (selectedSlot === null) {
      
      Alert.alert(
        "Error",
        "Please select a slot to continue"
      );
      
      return;

    }

    router.push({
      
      pathname:
        "/join-match",
      
      params: {
        
        tournamentId:
          tournamentId,
        
        slot: selectedSlot.toString(),
        
      },

    });

  };

  if (loading) {
    
    return (
      
      <View style={styles.loader}>
        
        <ActivityIndicator
          size="large"
          color="#FFB800"
        />
        
      </View>

    );

  }

  const totalSlots = Number(
    tournament?.totalSlots || 
    tournament?.slots || 
    1
  );

  const slotsArray =
    Array.from(
      { length: totalSlots },
      (_, i) => i + 1
    );

  return (
    
    <View style={styles.container}>
      
      <View style={styles.header}>
        
        <Text style={styles.title}>
          Select Your Slot
        </Text>
        
        <Text style={styles.subtitle}>
          Choose an available slot for
          {" "}
          {tournament?.title}
        </Text>
        
      </View>

      <ScrollView
        style={styles.slotsContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.slotsGrid}>
          
          {slotsArray.map((slotNum) => {
            
            const isBooked =
              bookedSlots.includes(
                slotNum
              );
            
            const isSelected =
              selectedSlot === slotNum;

            return (
              
              <TouchableOpacity
                key={slotNum}
                disabled={isBooked}
                onPress={() =>
                  handleSlotSelect(slotNum)
                }
                style={[
                  styles.slotButton,
                  isBooked &&
                    styles.slotBooked,
                  isSelected &&
                    styles.slotSelected,
                ]}
              >
                
                <Text
                  style={[
                    styles.slotText,
                    isBooked &&
                      styles.slotBookedText,
                    isSelected &&
                      styles.slotSelectedText,
                  ]}
                >
                  {slotNum}
                </Text>
                
              </TouchableOpacity>

            );

          })}

        </View>

      </ScrollView>

      <View style={styles.footer}>
        
        <View style={styles.slotInfo}>
          
          <View style={styles.infoItem}>
            
            <View
              style={[
                styles.colorBox,
                { backgroundColor: "#FFB800" },
              ]}
            />
            
            <Text style={styles.infoText}>
              Available
            </Text>
            
          </View>

          <View style={styles.infoItem}>
            
            <View
              style={[
                styles.colorBox,
                { backgroundColor: "#2E2E2E" },
              ]}
            />
            
            <Text style={styles.infoText}>
              Booked
            </Text>
            
          </View>

        </View>

        {selectedSlot !== null && (
          
          <View style={styles.selectedInfo}>
            
            <Text style={styles.selectedText}>
              Selected Slot:{" "}
              <Text style={styles.selectedNumber}>
                #{selectedSlot}
              </Text>
            </Text>
            
          </View>

        )}

        <TouchableOpacity
          style={[
            styles.button,
            selectedSlot === null &&
              styles.buttonDisabled,
          ]}
          disabled={selectedSlot === null}
          onPress={handleContinue}
        >
          
          <Text style={styles.buttonText}>
            Continue
          </Text>
          
        </TouchableOpacity>

      </View>

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

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  slotsContainer: {
    flex: 1,
    padding: 20,
  },

  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  slotButton: {
    width: "31%",
    height: 80,
    backgroundColor: "#161616",
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFB800",
  },

  slotSelected: {
    backgroundColor: "#FFB800",
    borderColor: "#FFB800",
  },

  slotBooked: {
    backgroundColor: "#2E2E2E",
    borderColor: "#2E2E2E",
    opacity: 0.5,
  },

  slotText: {
    color: "#FFB800",
    fontSize: 18,
    fontWeight: "bold",
  },

  slotSelectedText: {
    color: "#0A0A0A",
  },

  slotBookedText: {
    color: "#888888",
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#252525",
  },

  slotInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },

  infoText: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  selectedInfo: {
    backgroundColor: "#161616",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FFB800",
  },

  selectedText: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  selectedNumber: {
    color: "#FFB800",
    fontWeight: "bold",
    fontSize: 16,
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
  },

  buttonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "bold",
  },

});
