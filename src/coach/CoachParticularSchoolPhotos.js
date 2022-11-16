import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import user from '../assets/user.png'

export default function CoachParticularSchoolPhotos({ navigation }) {
    return (
        <SafeAreaView>
        <Text style={styles.label}>Kiddie Academy Anderson</Text>
        <View style={styles.imgWrap}>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerParticularPhoto")}>
                <Image source={user} style={{ width: 120, height: 140 }} />
            </TouchableOpacity>
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
            <Image source={user} style={{ width: 120, height: 140 }} />
        </View>
    </SafeAreaView>
    )
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
        textAlign: 'center'
    },
    imgWrap: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});