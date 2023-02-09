import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Button, ScrollView } from 'react-native';
import { GetParticularSchoolPhotosService } from '../services/SchoolService';

export default function CoachParticularSchoolPhotos({ navigation, route }) {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const getCustomers = async () => {
            const result = await GetParticularSchoolPhotosService(route.params.schoolItem._id);
            if (result) {
                setCustomerData(result);
            }
        };
        getCustomers();
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <Button title="Create Customer Photo"
                    color="#000"
                    style={styles.cta}
                    onPress={() => navigation.navigate("Coach Photo Creation", { schoolId: route.params.schoolItem._id })}
                />
                <Text style={styles.label}>{route.params.schoolItem.school_name}</Text>
                <View style={styles.imgWrap}>
                    {customerData.map((item) => {
                        return (
                            <TouchableOpacity key={item._id} onPress={() => navigation.navigate("Customer Particular Photo", { photo: item })}>
                                <Image key={item._id} source={{ uri: item.url }} style={{ height: 300, width: 300, marginBottom: 10 }} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    },
    scrollView: {
        marginHorizontal: 20,
    },
    label: {
        fontSize: 20,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontFamily: 'LemonJuice'
    },
    imgWrap: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    cta: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        fontFamily: 'LemonJuice'
    },
});