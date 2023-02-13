import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, View, Image } from 'react-native';
import search from '../assets/search.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';

export default function CoachParticularSchoolStudents() {
    const schools = [
        {
            id: 1,
            day: 'Wednesday',
            school: 'Lucknow Public School'
        },
        {
            id: 2,
            day: 'Yesterday',
            school: 'Melinium'
        },
        {
            id: 3,
            day: 'Monday',
            school: 'Chirst Church'
        }
    ];

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Student Attendance"
                    placeholderTextColor="#fff"
                    underlineColorAndroid="transparent"
                />
                <Icon style={styles.searchIcon} name="search" size={20} color="#fff" />
            </View>
            <View style={styles.calendarSection}>
                <Text>wdfwew</Text>
                <View style={styles.verticleLine}></View>
                <Text>degdfe</Text>
            </View>
            {/* <Text>Lucknow Public School</Text>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>AT-</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>Week 1</DataTable.Title>
                    <DataTable.Title>Week 2</DataTable.Title>
                    <DataTable.Title>Week 3</DataTable.Title>
                    <DataTable.Title>Week 4</DataTable.Title>
                    <DataTable.Title>Week 5</DataTable.Title>
                    <DataTable.Title>Week 6</DataTable.Title>
                    <DataTable.Title>Week 7</DataTable.Title>
                    <DataTable.Title>Week 8</DataTable.Title>
                </DataTable.Header>
                {schools.map(item => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate("Coach Particular School Students")}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.day}</DataTable.Cell>
                                <DataTable.Cell>{item.school}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    );
                })}
            </DataTable> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    calendarSection: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'blue',
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    verticleLine: {
        height: 30,
        width: 1,
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 13.3,
        backgroundColor: 'blue',
        color: '#fff',
        borderTopRightRadius: 10
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: 'blue',
        color: '#fff',
        borderTopLeftRadius: 10
    },
});