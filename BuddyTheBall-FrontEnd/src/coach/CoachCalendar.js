import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
    Button,
} from 'react-native';
// import { Agenda } from 'react-native-calendars';
import ApiCalendar from 'react-google-calendar-api';

const config = {
    "clientId": "102419677833205658481",
    "apiKey": "AIzaSyD-TcDcUYtfFKABjO-VlbtI2HoOsXqFKX8",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
};

const apiCalendar = new ApiCalendar(config);

export default function CoachCalendar() {

    function handleItemClick(e, name) {
        if (name === 'sign-in') {
            apiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            apiCalendar.handleSignoutClick();
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <Agenda
                selected="2022-12-01"
                items={{
                    '2022-12-01': [{ name: 'Cycling' }, { name: 'Walking' }, { name: 'Running' }],
                    '2022-12-02': [{ name: 'Writing' }]
                }}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            /> */}
            <Button
                title="Sign In"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={(e) => handleItemClick(e, 'sign-in')}
            />
            <Button
                title="Sign Out"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={(e) => handleItemClick(e, 'sign-out')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    }
});