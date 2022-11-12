import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image } from 'react-native'
import user from '../assets/user.png'

export default function SuperAdminPhotos() {
    return (
        <SafeAreaView>
            <Text style={styles.label}>Kiddie Academy Anderson</Text>
            <View style={styles.imgWrap}>
                {/* <TouchableOpacity onPress={() => navigation.navigate("CustomerParticularPhoto")}> */}
                <Image source={user} style={{ width: 40, height: 40 }} />
                {/* </TouchableOpacity> */}
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
                <Image source={user} style={{ width: 40, height: 40 }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        flexWrap: 'wrap'
    }
});