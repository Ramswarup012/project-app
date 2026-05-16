import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

type Props = {
    bannerUrl: string;
    title: string;
    prizePool: string;
    entryFee: string;
    perKill: string;
    mapName: string;
    slots: string;
    gameMode: string;
    matchDate: string;
    matchTime: string;
};

export default function TournamentPreviewCard({
    bannerUrl,
    title,
    prizePool,
    entryFee,
    perKill,
    mapName,
    slots,
    gameMode,
    matchDate,
    matchTime,
}: Props) {

    return (

        <View style={styles.card}>

            <Image
                source={{
                    uri: bannerUrl ||
                        "https://wallpaperaccess.com/full/4893732.jpg",
                }}
                style={styles.banner}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {title || "Tournament Title"}
                </Text>

                <View style={styles.row}>

                    <View style={styles.box}>
                        <Text style={styles.label}>
                            Prize Pool
                        </Text>

                        <Text style={styles.value}>
                            ₹ {prizePool || "0"}
                        </Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>
                            Entry
                        </Text>

                        <Text style={styles.value}>
                            ₹ {entryFee || "0"}
                        </Text>
                    </View>

                </View>

                <View style={styles.dateContainer}>

                    <View style={styles.dateBox}>
                        <Text style={styles.smallLabel}>
                            Match Date
                        </Text>

                        <Text style={styles.smallValue}>
                            {matchDate || "10/05/2026"}
                        </Text>
                    </View>

                    <View style={styles.dateBox}>
                        <Text style={styles.smallLabel}>
                            Match Time
                        </Text>

                        <Text style={styles.smallValue}>
                            {matchTime || "8:30 PM"}
                        </Text>
                    </View>

                </View>



                <View style={styles.row}>

                    <View style={styles.box}>
                        <Text style={styles.label}>
                            Per Kill
                        </Text>

                        <Text style={styles.value}>
                            ₹ {perKill || "0"}
                        </Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>
                            Map
                        </Text>

                        <Text style={styles.value}>
                            {mapName || "Bermuda"}
                        </Text>
                    </View>

                </View>

                <View style={styles.footer}>

                    <Text style={styles.mode}>
                        {gameMode || "Squad"}
                    </Text>

                    <Text style={styles.slots}>
                        Slots: {slots || "0"}
                    </Text>

                </View>

                <View style={styles.liveBox}>

  <Text style={styles.liveText}>
    Match Starts In: 02h 15m
  </Text>

</View>

            </View>

        </View>
        

    );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#121212",
    borderRadius: 22,
    overflow: "hidden",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#2B2B2B",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  banner: {
    width: "100%",
    height: 210,
  },

  content: {
    padding: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  box: {
    backgroundColor: "#1E1E1E",
    width: "48%",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2C2C2C",
  },

  label: {
    color: "#8E8E8E",
    fontSize: 12,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  mode: {
    color: "#FFB800",
    fontSize: 17,
    fontWeight: "bold",
  },

  slots: {
    color: "#00FF99",
    fontSize: 16,
    fontWeight: "bold",
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  dateBox: {
    backgroundColor: "#1E1E1E",
    width: "48%",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2C2C2C",
  },

  smallLabel: {
    color: "#8E8E8E",
    fontSize: 11,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  smallValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  liveBox: {
  backgroundColor: "#1E1E1E",
  paddingVertical: 12,
  borderRadius: 14,
  marginTop: 18,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#2C2C2C",
},

liveText: {
  color: "#FF4D6D",
  fontSize: 15,
  fontWeight: "bold",
},

});