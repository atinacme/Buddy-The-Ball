import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, View, Image, FlatList, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';
import moment from 'moment';

export default function CoachParticularSchoolStudents({ route }) {
    const [allDates, setAllDates] = useState({ key: '', value: '' });
    const [selectedDate, setSelectedDate] = useState();

    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            let dateNew = moment(new Date(currentDate)).format('YYYY-MM-DD');
            dateArray.push(dateNew);
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        return dateArray;
    }

    useEffect(() => {
        let range = dateRange(route.params.schoolItem.startDate, route.params.schoolItem.endDate);
        setAllDates({ key: range, value: range });
        console.log('route--->', range, allDates);
    }, []);

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
                <View style={styles.calendarSectionLeft}>
                    <Icon style={styles.searchIcon} name="calendar" size={20} color="#fff" />
                    <SelectList
                        setSelected={(val) => { setSelectedDate(val); }}
                        data={allDates?.value}
                        save="value"
                        search={false}
                        boxStyles={{ borderWidth: 0 }}
                    // style={styles.dateList}
                    />
                </View>
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
        flex: 1,
        padding: 22,
    },
    scrollView: {
        marginHorizontal: 20,
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
    calendarSectionLeft: {
        flexDirection: 'row'
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    dateList: {
        width: 20
    }
});