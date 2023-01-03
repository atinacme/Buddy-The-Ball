import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';
import user from '../assets/user.png';
import { GetCustomerWithSchoolIdService } from '../services/CustomerService';

export default function CoachParticularSchoolPhotos({ navigation, route }) {
    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        const getCustomers = async () => {
            const result = await GetCustomerWithSchoolIdService(route.params.schoolItem._id);
            if (result) {
                setCustomerData(result);
            }
        };
        getCustomers();
    }, []);
    console.log(route.params, customerData);
    return (
        <SafeAreaView>
            <Button title="Create Customer Photo"
                color="#000"
                style={styles.cta}
                onPress={() => navigation.navigate("Coach Photo Creation", { schoolId: route.params.schoolItem._id })} />
            <Text style={styles.label}>{route.params.schoolItem.school_name}</Text>
            <View style={styles.imgWrap}>
                {customerData.map(item => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("Customer Particular Photo", { customerId: item._id, schoolId: item.school })}>
                            <Image source={user} style={{ width: 120, height: 140 }} />
                        </TouchableOpacity>
                    );
                })}
                {/* <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} />
                <Image source={user} style={{ width: 120, height: 140 }} /> */}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 20
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