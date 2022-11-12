import React from 'react'
import { Text, Image, SafeAreaView, View, SectionList, StyleSheet, StatusBar, Button } from 'react-native'

const DATA = [
    {
        title: "Parent Name:",
        data: ["LESLIE SMITH"]
    },
    {
        title: "Player Age:",
        data: ["7"]
    },
    {
        title: "Wristband Level:",
        data: ["BLUE"]
    },
    {
        title: "Handed:",
        data: ["RIGHT"]
    },
    {
        title: "Number of Buddy Books Read:",
        data: ["5"]
    },
    {
        title: "Jersey Size:",
        data: ["Medium"]
    },
    {
        title: "School Name:",
        data: ["KIDDIE ACADEMY"]
    },
    {
        title: "School Coach:",
        data: ["TANNER TOWNSEND"]
    }
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function CustomerDashboard({ navigation }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.title}>Customer Dashboard</Text>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={styles.img} />
            <Text style={styles.playPara}>Upload Player Picture</Text>
            <Text style={styles.heading}>Cayson Smith</Text>
            {/* <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            /> */}
            <Text>Tennis Club: INDEPENDENT</Text>
            <Text>Favorite Pro Player: ROGER FEDERER</Text>
            <Text>Handed: LEFT</Text>
            <Text>Favorite Drill: SELF RALLIES</Text>
            <Text style={styles.buttonWrap}>
                <View style={styles.buttons}>
                    <Text style={styles.label}>Class Photos</Text>
                    <Button
                        title="ENTER"
                        color="#000"
                        onPress={() => navigation.navigate("CustomerPhotos")}
                    />
                </View>
                <View style={styles.buttons}>
                    <Text style={styles.label}>Current Award:</Text>
                    <Button
                        title="Enter"
                        color="#000"
                    // onPress={() => navigation.navigate("CustomerDashboard")}
                    />
                </View>
            </Text>

            <View>
                <Text style={styles.label}>Message School Coach</Text>
                <Button
                    title="MESSAGE"
                    color="#000"
                // onPress={() => navigation.navigate("CustomerDashboard")}
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
    img: {
        width: 140,
        height: 140,
        borderRadius: 100,
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
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttons: {
        width: 10
    }
});
