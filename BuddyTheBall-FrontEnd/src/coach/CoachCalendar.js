import React from 'react'
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function CoachCalendar() {
    return (
        <SafeAreaView style={styles.container}>
            <Agenda
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
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
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