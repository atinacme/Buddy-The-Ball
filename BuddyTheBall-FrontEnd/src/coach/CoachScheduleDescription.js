import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, Alert, View, Button, Pressable, TextInput, ScrollView, Platform
} from 'react-native';
import { useSelector } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateAgendaService, GetAgendaByDateAndCoachService, GetAgendaByDateService, UpdateAgendaService } from '../services/CalendarService';
import { CreateScheduleService, UpdateScheduleService } from '../services/ScheduleService';

export default function CoachScheduleDescription({ navigation, route }) {
    const state = useSelector((state) => state);
    const time = { start: route.params.scheduleData.start_time, end: route.params.scheduleData.end_time };
    const date = route.params.scheduleData.date;
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showType, setShowType] = useState({
        date: false,
        startTime: false,
        endTime: false
    });
    const [scheduleData, setScheduleData] = useState({
        date: new Date(),
        start: new Date(),
        end: new Date()
    });
    const [initialScheduleData, setInitialScheduleData] = useState({
        date: false,
        start: false,
        end: false
    });
    const [topic, setTopic] = useState(route.params.scheduleData.topic);
    console.log("shsh---->", route.params.scheduleData, scheduleData, date, time);

    const onChange = (event, selectedDate) => {
        console.log("onchange--->", selectedDate.toLocaleString());
        const currentDate = selectedDate;
        setShow(false);
        if (showType.date) {
            setInitialScheduleData({ ...initialScheduleData, date: true });
            setScheduleData({ ...scheduleData, date: currentDate });
        } else if (showType.startTime) {
            setInitialScheduleData({ ...initialScheduleData, start: true });
            setScheduleData({ ...scheduleData, start: currentDate });
        } else {
            setInitialScheduleData({ ...initialScheduleData, end: true });
            setScheduleData({ ...scheduleData, end: currentDate });
        }
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setShow(true);
        setShowType({ ...show, date: true });
    };

    const showStartTimepicker = () => {
        showMode('time');
        setShow(true);
        setShowType({ ...show, startTime: true });
    };

    const showEndTimepicker = () => {
        showMode('time');
        setShow(true);
        setShowType({ ...show, endTime: true });
    };

    const handleUpdateSchedule = async () => {
        const data = {
            coach_id: state.authPage.auth_data?._id,
            user_id: state.authPage.auth_data?.user_id,
            date: initialScheduleData.date ? moment(scheduleData.date).format("YYYY-MM-DD") : date,
            start_time: initialScheduleData.start ? moment(scheduleData.start).format('H:mm A') : time.start,
            end_time: initialScheduleData.end ? moment(scheduleData.end).format('H:mm A') : time.end,
            // school: school,
            topic: topic
        };
        const result = await UpdateScheduleService(route.params.scheduleData._id, data);
        if (result) {
            Alert.alert(
                "Alert",
                "Schedule Updated Successfully",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Coach Dashboard")
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Button onPress={showDatepicker} title="Update Date" />
            <Button onPress={showStartTimepicker} title="Update Start Time" />
            <Button onPress={showEndTimepicker} title="Update End Time" />
            <Text style={styles.label}>Date : {initialScheduleData.date ? moment(scheduleData.date).format("YYYY-MM-DD") : date}</Text>
            <Text style={styles.label}>Start Time : {initialScheduleData.start ? moment(scheduleData.start).format('H:mm A') : time.start}</Text>
            <Text style={styles.label}>End Time :{initialScheduleData.end ? moment(scheduleData.end).format('H:mm A') : time.end}</Text>
            <Text style={styles.label}>School : {route.params.scheduleData.school.school_name}</Text>
            <View>
                <Text style={styles.label}>Topic :</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setTopic(val)}
                    value={topic}
                />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={scheduleData.date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            <Button onPress={handleUpdateSchedule} title="Update Schedule" />
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