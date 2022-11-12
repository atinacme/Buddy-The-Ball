import React from 'react'
import { Text, Image, SafeAreaView, View, StyleSheet, StatusBar, Button } from 'react-native'
import spark from '../assets/spark.png'

export default function CustomerDashboard({ navigation }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.title}>Customer Dashboard</Text>
            <Text style={styles.dashimgWrap}>
                <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={styles.img} />
            </Text>
            <Text style={styles.playPara}>Upload Player Picture</Text>
            <Text style={styles.heading}>Cayson Smith</Text>
            <Text>Tennis Club: INDEPENDENT</Text>
            <Text>Favorite Pro Player: ROGER FEDERER</Text>
            <Text>Handed: LEFT</Text>
            <Text>Favorite Drill: SELF RALLIES</Text>
            <View>
                <Text style={styles.label}>Class Photos</Text>
                <Button
                    title="ENTER"
                    color="#000"
                    onPress={() => navigation.navigate("CustomerPhotos")}
                />
            </View>
            <View>
                <Text style={styles.label}>Current Award:</Text>
                <Image source={spark} style={{ width: 40, height: 40 }} />
            </View>
            <View>
                <Text style={styles.label}>Message School Coach</Text>
                <Button
                    title="MESSAGE"
                    color="#000"
                    onPress={() => navigation.navigate("CustomerMessages")}
                />
            </View>
        </SafeAreaView>
    )
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
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: '#000',
        paddingBottom: 20
    },
    wrapper: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    playPara: {
        textAlign: 'center',
        color: '#000'
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        padding: 20
    },
    dashimgWrap: {
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10
    },
});
