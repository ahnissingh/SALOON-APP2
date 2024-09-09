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
    {
        $id: "5",
        title: "Hair Straightening",
        description: "Smooth and straighten your hair with our expert treatments.",
        phone: "321-654-9870",
        rating: 4.4,
        image: "https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg",
    },
    {
        $id: "6",
        title: "Waxing Services",
        description: "Effective and gentle waxing services for smooth skin.",
        phone: "678-123-4567",
        rating: 4.2,
        image: "https://images.pexels.com/photos/3058154/pexels-photo-3058154.jpeg",
    },
    {
        $id: "7",
        title: "Eyebrow Shaping",
        description: "Perfectly shape your eyebrows with our expert services.",
        phone: "987-321-6540",
        rating: 4.6,
        image: "https://images.pexels.com/photos/1477494/pexels-photo-1477494.jpeg",
    },
    {
        $id: "8",
        title: "Massage Therapy",
        description: "Relax and rejuvenate with our therapeutic massages.",
        phone: "345-678-9012",
        rating: 4.7,
        image: "https://images.pexels.com/photos/3705940/pexels-photo-3705940.jpeg",
    },
    {
        $id: "9",
        title: "Nail Art",
        description: "Creative and artistic nail designs for every occasion.",
        phone: "456-789-0123",
        rating: 4.3,
        image: "https://images.pexels.com/photos/3824301/pexels-photo-3824301.jpeg",
    },
    {
        $id: "10",
        title: "Spa Packages",
        description: "Luxurious spa packages for a complete relaxation experience.",
        phone: "567-890-1234",
        rating: 4.9,
        image: "https://images.pexels.com/photos/3861987/pexels-photo-3861987.jpeg",
    },
    {
        $id: "11",
        title: "Aromatherapy",
        description: "Experience the benefits of essential oils with our aromatherapy sessions.",
        phone: "678-901-2345",
        rating: 4.6,
        image: "https://images.pexels.com/photos/4709275/pexels-photo-4709275.jpeg",
    },
    {
        $id: "12",
        title: "Pedicure",
        description: "Treat your feet with a relaxing pedicure session.",
        phone: "789-012-3456",
        rating: 4.4,
        image: "https://images.pexels.com/photos/1475603/pexels-photo-1475603.jpeg",
    },
    {
        $id: "13",
        title: "Bridal Makeup",
        description: "Specialized bridal makeup services for your big day.",
        phone: "890-123-4567",
        rating: 4.8,
        image: "https://images.pexels.com/photos/4117615/pexels-photo-4117615.jpeg",
    },
    {
        $id: "14",
        title: "Body Scrubs",
        description: "Exfoliate and rejuvenate your skin with our body scrub treatments.",
        phone: "901-234-5678",
        rating: 4.2,
        image: "https://images.pexels.com/photos/4347592/pexels-photo-4347592.jpeg",
    },
    {
        $id: "15",
        title: "Deep Conditioning",
        description: "Intensive conditioning treatment for healthier and shinier hair.",
        phone: "012-345-6789",
        rating: 4.5,
        image: "https://images.pexels.com/photos/3809896/pexels-photo-3809896.jpeg",
    },
    {
        $id: "16",
        title: "Chemical Peels",
        description: "Improve skin texture and tone with our chemical peels.",
        phone: "123-456-7891",
        rating: 4.7,
        image: "https://images.pexels.com/photos/3738386/pexels-photo-3738386.jpeg",
    },
    {
        $id: "17",
        title: "Hair Extensions",
        description: "Add length and volume to your hair with our high-quality extensions.",
        phone: "234-567-8902",
        rating: 4.4,
        image: "https://images.pexels.com/photos/4117615/pexels-photo-4117615.jpeg",
    },
    {
        $id: "18",
        title: "Threading",
        description: "Precise hair removal using the threading technique.",
        phone: "345-678-9013",
        rating: 4.3,
        image: "https://images.pexels.com/photos/4740618/pexels-photo-4740618.jpeg",
    },
    {
        $id: "19",
        title: "Tanning",
        description: "Achieve a sun-kissed glow with our tanning services.",
        phone: "456-789-0124",
        rating: 4.1,
        image: "https://images.pexels.com/photos/4555694/pexels-photo-4555694.jpeg",
    },
    {
        $id: "20",
        title: "Scalp Treatments",
        description: "Healthy scalp treatments for stronger and healthier hair.",
        phone: "567-890-1235",
        rating: 4.6,
        image: "https://images.pexels.com/photos/3739886/pexels-photo-3739886.jpeg",
    },
    {
        $id: "21",
        title: "Eyebrow Tinting",
        description: "Enhance the color of your eyebrows with our tinting services.",
        phone: "678-901-2346",
        rating: 4.4,
        image: "https://images.pexels.com/photos/4117615/pexels-photo-4117615.jpeg",
    },
    {
        $id: "22",
        title: "Hair Perming",
        description: "Create beautiful curls or waves with our perming services.",
        phone: "789-012-3457",
        rating: 4.3,
        image: "https://images.pexels.com/photos/3789075/pexels-photo-3789075.jpeg",
    },
    {
        $id: "23",
        title: "Foot Reflexology",
        description: "Rejuvenate your feet with our reflexology sessions.",
        phone: "890-123-4568",
        rating: 4.5,
        image: "https://images.pexels.com/photos/4296062/pexels-photo-4296062.jpeg",
    },
    {
        $id: "24",
        title: "Anti-Aging Facial",
        description: "Combat signs of aging with our specialized anti-aging facials.",
        phone: "901-234-5679",
        rating: 4.8,
        image: "https://images.pexels.com/photos/6115638/pexels-photo-6115638.jpeg",
    },
    {
        $id: "25",
        title: "Brazilian Blowout",
        description: "Get smooth and frizz-free hair with our Brazilian blowout.",
        phone: "012-345-6780",
        rating: 4.7,
        image: "https://images.pexels.com/photos/3112239/pexels-photo-3112239.jpeg",
    },
    {
        $id: "26",
        title: "Spa Manicure",
        description: "Indulge in a spa-quality manicure for beautifully groomed nails.",
        phone: "123-456-7892",
        rating: 4.3,
        image: "https://images.pexels.com/photos/3834601/pexels-photo-3834601.jpeg",
    },
    {
        $id: "27",
        title: "Collagen Facial",
        description: "Boost skin elasticity and hydration with our collagen facials.",
        phone: "234-567-8903",
        rating: 4.6,
        image: "https://images.pexels.com/photos/4843205/pexels-photo-4843205.jpeg",
    },
    {
        $id: "28",
        title: "Detox Body Wrap",
        description: "Revitalize your body with our detox body wrap treatments.",
        phone: "345-678-9014",
        rating: 4.5,
        image: "https://images.pexels.com/photos/4117615/pexels-photo-4117615.jpeg",
    },
    {
        $id: "29",
        title: "Cupping Therapy",
        description: "Experience relief and relaxation with our cupping therapy sessions.",
        phone: "456-789-0125",
        rating: 4.2,
        image: "https://images.pexels.com/photos/3112239/pexels-photo-3112239.jpeg",
    },
    {
        $id: "30",
        title: "Body Contouring",
        description: "Achieve your body goals with our body contouring treatments.",
        phone: "567-890-1236",
        rating: 4.7,
        image: "https://images.pexels.com/photos/3057748/pexels-photo-3057748.jpeg",
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

