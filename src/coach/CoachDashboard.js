import React from 'react'
import { Text, Image, SafeAreaView, View, StyleSheet, StatusBar, Button } from 'react-native'

export default function CoachDashboard({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Coaches Dashboard</Text>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Text>Upload Coach Picture</Text>
            <Text>Coach Tanner Townsend</Text>
            <Text>Tennis Club: INDEPENDENT</Text>
            <Text>Favorite Pro Player: ROGER FEDERER</Text>
            <Text>Handed: LEFT</Text>
            <Text>Favorite Drill: SELF RALLIES</Text>
            <View>
                <Button
                    title="PHOTOS"
                    color="#f194ff"
                    onPress={() => navigation.navigate("CoachSchoolList")}
                />
                <Button
                    title="CALENDAR"
                    color="#f194ff"
                    onPress={() => navigation.navigate("CoachCalendar")}
                />
            </View>
            <View>
                <Button
                    title="MESSAGES"
                    color="#f194ff"
                // onPress={() => navigation.navigate("CustomerDashboard")}
                />
                <Button
                    title="SCHOOLS"
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
