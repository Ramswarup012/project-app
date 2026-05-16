import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import {
    MaterialIcons,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";

import { router } from "expo-router";

export default function Dashboard() {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Admin Dashboard
            </Text>

            <Text style={styles.subHeading}>
                Manage your esports tournaments
            </Text>

            <View style={styles.statsContainer}>

                <View style={styles.statsCard}>
                    <Text style={styles.statsNumber}>
                        24
                    </Text>

                    <Text style={styles.statsLabel}>
                        Total Matches
                    </Text>
                </View>

                <View style={styles.statsCard}>
                    <Text style={styles.statsNumber}>
                        5
                    </Text>

                    <Text style={styles.statsLabel}>
                        Live Matches
                    </Text>
                </View>

            </View>

            <View style={styles.statsContainer}>

                <View style={styles.statsCard}>
                    <Text style={styles.statsNumber}>
                        1.2K
                    </Text>

                    <Text style={styles.statsLabel}>
                        Total Users
                    </Text>
                </View>

                <View style={styles.statsCard}>
                    <Text style={styles.statsNumber}>
                        ₹45K
                    </Text>

                    <Text style={styles.statsLabel}>
                        Earnings
                    </Text>
                </View>

            </View>

            <View style={styles.cardContainer}>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/create-tournament")}
                >

                    <MaterialIcons
                        name="emoji-events"
                        size={34}
                        color="#FFB800"
                    />

                    <Text style={styles.cardTitle}>
                        Create Tournament
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/tournaments")}
                >

                    <FontAwesome5
                        name="gamepad"
                        size={30}
                        color="#00FF99"
                    />

                    <Text style={styles.cardTitle}>
                        Manage Matches
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/joined-users")}
                >

                    <Ionicons
                        name="people"
                        size={34}
                        color="#00BFFF"
                    />

                    <Text style={styles.cardTitle}>
                        Joined Users
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/upload-results")}
                >

                    <MaterialIcons
                        name="leaderboard"
                        size={34}
                        color="#FF4D6D"
                    />

                    <Text style={styles.cardTitle}>
                        Match Results
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/notifications")}
                >

                    <Ionicons
                        name="notifications"
                        size={34}
                        color="#A970FF"
                    />

                    <Text style={styles.cardTitle}>
                        Notifications
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("/(admin)/wallet-requests")}
                >

                    <FontAwesome5
                        name="wallet"
                        size={30}
                        color="#FFD93D"
                    />

                    <Text style={styles.cardTitle}>
                        Wallet Requests
                    </Text>

                </TouchableOpacity>

            </View>

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
    },

    subHeading: {
        color: "#888888",
        fontSize: 15,
        marginTop: 8,
        marginBottom: 30,
    },

    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#161616",
        borderRadius: 22,
        paddingVertical: 30,
        alignItems: "center",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#252525",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },

        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 8,
    },

    cardTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 15,
        textAlign: "center",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    statsCard: {
        backgroundColor: "#161616",
        width: "48%",
        borderRadius: 20,
        paddingVertical: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#252525",
    },

    statsNumber: {
        color: "#FFB800",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },

    statsLabel: {
        color: "#AAAAAA",
        fontSize: 14,
    },

});