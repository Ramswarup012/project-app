import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";

import {
    useLocalSearchParams,
    router,
} from "expo-router";

import API from "../services/api";

export default function CategoryTournaments() {

    const params =
        useLocalSearchParams();

    const [tournaments, setTournaments] =
        useState([]);



    const [refreshing, setRefreshing] =
        useState(false);

    const fetchTournaments =
        async () => {

            try {

                const response =
                    await API.get(
                        "/tournaments/all"
                    );

                const filtered =
                    response.data.tournaments.filter(

                        (item: any) =>

                            item.category ===
                            params.category

                    );

                setTournaments(filtered);

            } catch (error) {

                console.log(error);

            }

        };

    const onRefresh =
        async () => {

            setRefreshing(true);

            await fetchTournaments();

            setRefreshing(false);

        };

    useEffect(() => {

        fetchTournaments();

    }, []);



    const renderItem = ({
        item,
    }: {
        item: any
    }) => (

        <TouchableOpacity

            style={styles.card}

            onPress={() =>

                router.push({

                    pathname:
                        "/tournament-details",

                    params: {
                        id: item._id,
                    },

                })

            }

        >

            <Image
                source={{
                    uri: item.bannerUrl,
                }}
                style={styles.image}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {item.title}
                </Text>
                <View

                    style={[

                        styles.statusBadge,

                        item.status === "Live"

                            ? styles.liveBadge

                            : item.status ===
                                "Completed"

                                ? styles.completedBadge

                                : styles.upcomingBadge,

                    ]}

                >

                    <Text style={styles.statusText}>
                        {item.status || "Upcoming"}
                    </Text>

                </View>

                <Text style={styles.prize}>
                    Prize ₹{item.prizePool}
                </Text>

                <Text style={styles.entry}>
                    Entry ₹{item.entryFee}
                </Text>

                <Text style={styles.slots}>
                    Slots {item.slots}
                </Text>

            </View>

        </TouchableOpacity>

    );

    return (

        <View style={styles.container}>

           

            <FlatList

                data={tournaments}

                renderItem={renderItem}

                keyExtractor={(item: any) =>
                    item._id
                }

                refreshControl={

                    <RefreshControl

                        refreshing={refreshing}

                        onRefresh={onRefresh}

                        tintColor="#FFB800"

                    />

                }

            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 16,
    },

    heading: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#161616",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#252525",
    },

    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 12,
    },

    statusText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
    },

    liveBadge: {
        backgroundColor: "#00C853",
    },

    completedBadge: {
        backgroundColor: "#FF4D6D",
    },

    upcomingBadge: {
        backgroundColor: "#FFB800",
    },

 

    image: {
        width: "100%",
        height: 180,
    },

    content: {
        padding: 16,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    prize: {
        color: "#00FF99",
        marginBottom: 6,
    },

    entry: {
        color: "#FFB800",
        marginBottom: 6,
    },

    slots: {
        color: "#CCCCCC",
    },

});