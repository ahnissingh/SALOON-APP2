import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
    const { user, setUser, setIsLogged, likedSalons } = useGlobalContext();

    const logout = async () => {
        // Sign out logic
        await signOut();
        setUser(null);
        setIsLogged(false);
        router.replace("/sign-in");
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#121212', flex: 1 }}>
            <FlatList
                data={likedSalons}
                keyExtractor={(item) => item.$id}
                ListEmptyComponent={() => (
                    <EmptyState title="No liked salons found" />
                )}
                ListHeaderComponent={() => (
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 24, paddingHorizontal: 16 }}>
                        <TouchableOpacity
                            onPress={logout}
                            style={{ alignSelf: 'flex-end', marginBottom: 24 }}
                        >
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>

                        <View style={{ width: 80, height: 80, borderWidth: 1, borderColor: '#333', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: user?.avatar }}
                                style={{ width: '90%', height: '90%', borderRadius: 40 }}
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={user?.username || "Username"}
                            containerStyles={{ marginTop: 16 }}
                            titleStyles={{ fontSize: 18, color: '#FFFFFF' }}
                        />
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#333' }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: 150, marginBottom: 16 }}
                            resizeMode="cover"
                        />
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>{item.title}</Text>
                        <Text style={{ color: '#B0B0B0' }}>{item.description}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Profile;
