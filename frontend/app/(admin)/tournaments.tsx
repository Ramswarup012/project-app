import React, {
    useEffect,
    useState,
} from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import API from "../../services/api";


export default function Tournaments() {

    const [tournaments, setTournaments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchTournaments = async () => {

        try {

            const response =
                await API.get(
                    "/tournaments/all"
                );

            setTournaments(
                response.data.tournaments
            );

        } catch (error) {

            console.log(
                "Fetch Tournament Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTournaments();

    }, []);

    if (loading) {

        return (

            <View style={styles.loaderContainer}>

                <ActivityIndicator
                    size="large"
                    color="#FFB800"
                />

            </View>

        );

    }
    const handleDelete = async (
        id: string
    ) => {

        try {

            await API.delete(
                `/tournaments/delete/${id}`
            );

            fetchTournaments();

        } catch (error) {

            console.log(
                "Delete Error:",
                error
            );

        }

    };

    const updateStatus =
        async (
            id: string,
            status: string
        ) => {

            try {

                await API.put(

                    `/tournaments/status/${id}`,

                    {
                        status,
                    }

                );

                fetchTournaments();

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.heading}>
                Tournament List
            </Text>

            {
                tournaments.map((item: any) => (

                    <View
                        key={item._id}
                        style={styles.card}
                    >

                        <Image
                            source={{
                                uri:
                                    item.bannerUrl,
                            }}
                            style={styles.banner}
                        />

                        <View style={styles.content}>

                            <Text style={styles.title}>
                                {item.title}
                            </Text>

                            <View style={styles.row}>

                                <Text style={styles.label}>
                                    Prize:
                                    <Text style={styles.value}>
                                        {" "}
                                        ₹{item.prizePool}
                                    </Text>
                                </Text>

                                <Text style={styles.label}>
                                    Slots:
                                    <Text style={styles.value}>
                                        {" "}
                                        {item.slots}
                                    </Text>
                                </Text>

                            </View>

                            <Text style={styles.date}>
                                {item.matchDate}
                                {" • "}
                                {item.matchTime}
                            </Text>

                            <Text style={styles.status}>
                                {item.status}
                            </Text>

                            <View style={styles.buttonRow}>

                                <TouchableOpacity
                                    style={styles.editButton}
                                >
                                    <Text style={styles.buttonText}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity

                                    style={styles.liveButton}

                                    onPress={() =>

                                        updateStatus(
                                            item._id,
                                            "Live"
                                        )

                                    }

                                >

                                    <Text style={styles.buttonText}>
                                        Go Live
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity

                                    style={styles.editButton}

                                    onPress={() =>

                                        router.push({

                                            pathname:
                                                "/(admin)/edit-tournament",

                                            params: {
                                                id: item._id,
                                            },

                                        })

                                    }

                                >

                                    <Text style={styles.buttonText}>
                                        Edit
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() =>
                                        handleDelete(item._id)
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>

                            </View>

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
        paddingBottom: 40,
    },

    loaderContainer: {
        flex: 1,
        backgroundColor: "#0A0A0A",
        justifyContent: "center",
        alignItems: "center",
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
        borderRadius: 22,
        overflow: "hidden",
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#252525",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 5,
    },

    banner: {
        width: "100%",
        height: 190,
    },

    content: {
        padding: 16,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "bold",
        marginBottom: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    label: {
        color: "#AAAAAA",
        fontSize: 14,
    },

    value: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    date: {
        color: "#00BFFF",
        marginBottom: 10,
        fontWeight: "600",
    },

    status: {
        color: "#00FF99",
        marginBottom: 18,
        fontWeight: "bold",
        fontSize: 15,
    },

    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    editButton: {
        backgroundColor: "#FFB800",
        width: "47%",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    deleteButton: {
        backgroundColor: "#FF4D6D",
        width: "48%",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15,
    },
    liveButton: {
        backgroundColor: "#00C853",
        width: "48%",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },


});