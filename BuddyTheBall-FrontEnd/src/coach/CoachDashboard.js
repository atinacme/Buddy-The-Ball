import React from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet, StatusBar, Button } from 'react-native';
import buddyBoy from '../assets/buddyGirl.png';

export default function CoachDashboard({ navigation }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.dashimgWrap}>
                <Image source={buddyBoy} style={{ width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto' }} />
            </Text>
            <Text style={styles.playPara}>Upload Coach Picture</Text>
            <Text style={styles.heading}>Coach Tanner Townsend</Text>
            <Text style={styles.txt}>Tennis Club: INDEPENDENT</Text>
            <Text style={styles.txt}>Favorite Pro Player: ROGER FEDERER</Text>
            <Text style={styles.txt}>Handed: LEFT</Text>
            <Text style={styles.txt}>Favorite Drill: SELF RALLIES</Text>
            <View style={styles.btnCta}>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="PHOTOS"
                        color="#000"
                        style={styles.cta}
                        onPress={() => navigation.navigate("Coach Schools Photos")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="CALENDAR"
                        color="#000"
                        onPress={() => navigation.navigate("Coach Calendar")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="MESSAGES"
                        color="#000"
                        onPress={() => navigation.navigate("Coach Messages")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="SCHOOLS"
                        color="#000"
                        onPress={() => navigation.navigate("Coach School List")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="Customer Creation"
                        color="#000"
                        style={styles.cta}
                        onPress={() => navigation.navigate("Customer Creation")}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        fontFamily: 'LemonJuice'
    },
    title: {
        fontSize: 24,
        fontFamily: 'LemonJuice'
    },
    txt: {
        fontFamily: 'LemonJuice',
        textAlign: 'center',
        fontSize: 18,
    },
    dashimgWrap: {
        textAlign: 'center'
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'LemonJuice'
    },
    dashContentWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    dashContent: {
        width: 180
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        padding: 5,
        fontFamily: 'LemonJuice'
    },
    wrapper: {
        paddingTop: 0,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    playPara: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'LemonJuice'
    },
    btnCta: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        fontFamily: 'LemonJuice'
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
    btnCtawrap: {
        width: 160,
        marginBottom: 10,
        fontFamily: 'LemonJuice'
    }
});
