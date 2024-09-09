import React, { useState } from "react";
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import Icon from "react-native-vector-icons/MaterialIcons";
import images from "../../constants/images";
import EmptyState from "../../components/EmptyState";

const dummyPosts = [
    {
        $id: "1",
        title: "Haircut & Styling",
        description: "Professional haircut and styling services.",
        phone: "123-456-7890",
        rating: 4.5,
        image: "https://content.jdmagicbox.com/comp/def_content/salons/default-salons-5.jpg",
    },
    {
        $id: "2",
        title: "Manicure & Pedicure",
        description: "Relax and rejuvenate with our manicure and pedicure services.",
        phone: "987-654-3210",
        rating: 4.0,
        image: "https://static.wixstatic.com/media/28d39c_39fee459703c4ddcb33b511055322794~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/28d39c_39fee459703c4ddcb33b511055322794~mv2.jpg",
    },
    {
        $id: "3",
        title: "Facial Treatments",
        description: "Revitalize your skin with our facial treatments.",
        phone: "555-666-7777",
        rating: 4.8,
        image: "https://media.post.rvohealth.io/wp-content/uploads/2019/01/Facial_Spa_Mask-1200x628-Facebook.jpg",
    },
    {
        $id: "4",
        title: "Hair Coloring",
        description: "Get vibrant hair colors with our expert colorists.",
        phone: "444-333-2222",
        rating: 4.3,
        image: "https://static.wixstatic.com/media/28d39c_0472d2c069464a4196fbecc1dbc1ff4b~mv2.png/v1/fill/w_640,h_804,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/28d39c_0472d2c069464a4196fbecc1dbc1ff4b~mv2.png",
    },
];

const Home = () => {
    const { user, likedSalons, setLikedSalons } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleLike = (item) => {
        if (likedSalons.some((likedItem) => likedItem.$id === item.$id)) {
            setLikedSalons((prevLikes) =>
                prevLikes.filter((likedItem) => likedItem.$id !== item.$id)
            );
        } else {
            setLikedSalons((prevLikes) => [...prevLikes, item]); // Allow multiple likes
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => setSelectedItem(item)} // Set selected item to show details
        >
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.likeButton]}
                    onPress={() => handleLike(item)}
                >
                    <Icon
                        name="thumb-up"
                        size={24}
                        color={
                            likedSalons.some((likedItem) => likedItem.$id === item.$id)
                                ? "#FFFFFF"
                                : "#B0B0B0"
                        }
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    // Details screen within the Home component
    const renderDetails = (item) => (
        <View style={styles.detailsContainer}>
            <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.detailsImage} />
            <Text style={styles.detailsTitle}>{item.title}</Text>
            <Text style={styles.detailsDescription}>{item.description}</Text>
            {/* Phone and rating details */}
            <View style={styles.detailRow}>
                <Icon name="phone" size={24} color="#B0B0B0" />
                <Text style={styles.detailText}>{item.phone}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="star" size={24} color="#FFD700" />
                <Text style={styles.detailText}>{item.rating} / 5</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {selectedItem ? (
                renderDetails(selectedItem) // Show details if an item is selected
            ) : (
                <FlatList
                    data={dummyPosts}
                    keyExtractor={(item) => item.$id}
                    ListHeaderComponent={() => (
                        <View style={styles.headerContainer}>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerGreeting}>Welcome Back,</Text>
                                <Text style={styles.headerUsername}>
                                    {user?.username || "User"}
                                </Text>
                            </View>
                            <View style={styles.headerLogoContainer}>
                                <Image
                                    source={images.logo}
                                    style={styles.headerLogo}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => <EmptyState title="No services available at the moment." />}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
    },
    headerContainer: {
        marginVertical: 24,
        paddingHorizontal: 16,
        spaceY: 24,
    },
    headerTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    headerGreeting: {
        fontSize: 16,
        color: "#B0B0B0",
    },
    headerUsername: {
        fontSize: 24,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    headerLogoContainer: {
        marginTop: 6,
    },
    headerLogo: {
        width: 150,
        marginTop: -32,
    },
    itemContainer: {
        flex: 1,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        position: "relative",
    },
    itemImage: {
        width: "100%",
        height: 150,
        marginBottom: 16,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    itemDescription: {
        color: "#B0B0B0",
        marginBottom: 40,
    },
    buttonsContainer: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    likeButton: {},
    detailsContainer: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 20,
        textAlign: "center",
    },
    detailsImage: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    detailsTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    detailsDescription: {
        fontSize: 16,
        color: "#B0B0B0",
        textAlign: "center",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    detailText: {
        fontSize: 16,
        color: "#B0B0B0",
        marginLeft: 8,
    },
});

export default Home;

