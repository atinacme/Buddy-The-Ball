import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { GetParticularCustomerPhotosService } from '../services/CustomerService';

export default function CustomerPhotos({ navigation }) {
    const state = useSelector((state) => state);
    const [customerPhotos, setCustomerPhotos] = useState([]);

    useEffect(() => {
        const getCustomerPhotos = async () => {
            const result = await GetParticularCustomerPhotosService(state.authPage.auth_data._id);
            if (result) {
                setCustomerPhotos(result);
            }
            console.log("gfdg---->", result, customerPhotos);
        };
        getCustomerPhotos();
    }, []);
    return (
        <SafeAreaView>
            <Text style={styles.label}>{state.authPage.auth_data.school.school_name}</Text>
            <View style={styles.imgWrap}>
                <ScrollView style={styles.scrollView}>
                    {customerPhotos.map(item => {
                        return (
                            <TouchableOpacity key={item._id} onPress={() => navigation.navigate("Customer Particular Photo", { photo: item })}>
                                <Image key={item._id} source={{ uri: item.url }} style={{ height: 300, width: 300 }} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    imgWrap: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});