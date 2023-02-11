import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, Modal, View, Pressable, TextInput, ScrollView
} from 'react-native';
import { useSelector } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list';
import { Agenda, Calendar } from 'react-native-calendars';
import moment from 'moment';
import { CreateAgendaService, GetAgendaByDateService, UpdateAgendaService } from '../services/CalendarService';

export default function CoachAssignPeriod() {
    const [markedDates, setMarkedDates] = useState({});
    const [isStartDatePicked, setIsStartDatePicked] = useState(false);
    const [startDate, setStartDate] = useState('');

    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            let dateNew = moment(new Date(currentDate)).format('YYYY-MM-DD');
            dateArray.push(dateNew);
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        dateArray.shift();
        return dateArray;
    }

    const onDayPress = (day) => {
        if (isStartDatePicked == false) {
            let markedDates = {};
            markedDates[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
            setMarkedDates(markedDates);
            setIsStartDatePicked(true);
            setStartDate(day.dateString);
        } else {
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');
            let allRange = dateRange(startDate, endDate);
            let currentDate = new Date(endDate);
            let utcEndDate = currentDate.setUTCDate(currentDate.getUTCDate());
            let newDate = moment(new Date(utcEndDate)).format('YYYY-MM-DD');
            allRange.push(newDate);
            if (range > 0) {
                for (let i = 0; i <= allRange.length - 1; i++) {
                    markedDates[allRange[i]] = { color: '#50cebb', textColor: '#FFFFFF' };
                }
                markedDates[Object.keys(markedDates)[Object.keys(markedDates).length - 1]] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
                setMarkedDates(markedDates);
                setIsStartDatePicked(false);
                setStartDate('');
            } else {
                alert('Select an upcomming date!');
            }
        }
    };

    console.log("marked dates--->", markedDates);
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                minDate={Date()}
                monthFormat={"MMMM yyyy"}
                markedDates={markedDates}
                markingType="period"
                hideExtraDays={true}
                hideDayNames={true}
                onDayPress={onDayPress}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    scrollView: {
        marginHorizontal: 20,
        marginVertical: 20,
        maxHeight: 190
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 180
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    agendaButton: {
        borderRadius: 50,
        elevation: 2,
        // marginLeft: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    agendaCrossBtn: {
        fontSize: 15,
    },
    buttonOpen: {
        backgroundColor: '#2196F3'
    },
    plusButton: {
        borderRadius: 50,
        elevation: 2,
        width: 30,
        height: 30,
        alignItems: 'center'
    },
    mainText: {
        marginRight: 40
    },
    textPlus: {
        fontSize: 20,
    },
    buttonClose: {
        backgroundColor: 'red'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        flexDirection: 'row'
    },
    schoolList: {
        width: 225,
        marginTop: 10,
        marginBottom: 10
    },
    itemTextFirst: {
        color: 'black'
    }
});