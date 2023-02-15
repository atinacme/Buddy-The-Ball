import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import user from '../assets/user.png';

export default function SuperAdminPhotos({ navigation }) {
    return (
        <SafeAreaView>
            <Text style={styles.label}>Kiddie Academy Anderson</Text>
            <View style={styles.imgWrap}>
                <TouchableOpacity onPress={() => navigation.navigate("Customer Particular Photo")}>
                    <Image source={user} style={{ width: 180, height: 140 }} />
                </TouchableOpacity>
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
                <Image source={user} style={{ width: 180, height: 140 }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontFamily: 'LemonJuice'
    },
    imgWrap: {
        paddingBottom: 40,
        display: 'flex',
        flexWrap: 'wrap'
    }
});