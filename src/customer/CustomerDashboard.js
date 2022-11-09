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
        <SafeAreaView>
            <Text>CustomerDashboard</Text>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Text>Upload Player Picture</Text>
            <Text>Cayson Smith</Text>
            {/* <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            /> */}
            <View>
                <Text>Class Photos</Text>
                <Button
                    title="ENTER"
                    color="#f194ff"
                    onPress={() => navigation.navigate("CustomerPhotos")}
                />
            </View>
            <View>
                <Text>Current Award:</Text>
                <Button
                    title="Enter"
                    color="#f194ff"
                // onPress={() => navigation.navigate("CustomerDashboard")}
                />
            </View>
            <View>
                <Text>Message School Coach</Text>
                <Button
                    title="MESSAGE"
                    color="#f194ff"
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
        fontSize: 24
    }
});
