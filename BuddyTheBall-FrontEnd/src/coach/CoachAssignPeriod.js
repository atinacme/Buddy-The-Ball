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
    const state = useSelector((state) => state);
    // const [schoolData, setSchoolData] = useState(state.authPage.auth_data.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name })));
    const [modalVisible, setModalVisible] = useState(false);
    const [newDay, setNewDay] = useState();
    const [agendaData, setAgendaData] = useState([]);
    const [updateAgenda, setUpdateAgenda] = useState(false);
    const [items, setItems] = useState({});
    const today = moment().format("YYYY-MM-DD");
    const [loadResult, setLoadResult] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [isStartDatePicked, setIsStartDatePicked] = useState(false);
    const [isEndDatePicked, setIsEndDatePicked] = useState(false);
    const [startDate, setStartDate] = useState('');

    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            // dateArray.push(new Date(currentDate));
            let dateNew = moment(new Date(currentDate)).format('YYYY-MM-DD');
            dateArray.push(dateNew);
            console.log("date---->", dateNew, dateArray);
            // Use UTC date to prevent problems with time zones and DST
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        dateArray.shift();
        return dateArray;
    }

    const onDayPress = (day) => {
        if (isStartDatePicked == false) {
            let markedDates = {};
            markedDates[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
            // this.setState({
            //     markedDates: markedDates,
            //     isStartDatePicked: true,
            //     isEndDatePicked: false,
            //     startDate: day.dateString,
            // });
            setMarkedDates(markedDates);
            setIsStartDatePicked(true);
            setIsEndDatePicked(false);
            setStartDate(day.dateString);
        } else {
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');
            let allRange = dateRange(startDate, endDate);
            let currentDate = new Date(endDate);
            let utcEndDate = currentDate.setUTCDate(currentDate.getUTCDate());
            let newDate = moment(new Date(utcEndDate)).format('YYYY-MM-DD');
            allRange.push(newDate);
            console.log("gsxdh--->", allRange);
            if (range > 0) {
                // markedDates[allRange[0]] = { color: '#00B0BF', textColor: '#FFFFFF' };
                // if (allRange.findIndex(1)) {
                //     markedDates[allRange[0]] = { color: '#00B0BF', textColor: '#FFFFFF' };
                // } else if () {
                // allRange.forEach(element => {
                //     if (element[0]) {
                //         markedDates[element] = { color: '#00B0BF', textColor: '#FFFFFF' };
                //     } else {
                //         markedDates[element] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
                //     }
                // })

                for (let i = 0; i <= allRange.length - 1; i++) {
                    markedDates[allRange[i]] = { color: '#00B0BF', textColor: '#FFFFFF' };
                }
                console.log("i less--->", Object.keys(markedDates).length, markedDates[2]);
                // this.setState({
                //     markedDates: markedDates,
                //     isStartDatePicked: false,
                //     isEndDatePicked: true,
                //     startDate: ''
                // });
                setMarkedDates(markedDates);
                setIsStartDatePicked(false);
                setIsEndDatePicked(true);
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