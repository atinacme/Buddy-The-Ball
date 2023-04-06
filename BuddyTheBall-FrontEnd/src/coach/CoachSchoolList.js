import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, View } from 'react-native';
import { useSelector } from "react-redux";
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { GetScheduleByDateAndCoachService } from '../services/ScheduleService';

export default function CoachSchoolList({ navigation }) {
    const state = useSelector((state) => state);
    const allSchoolData = state.authPage.auth_data?.assigned_schools;
    const [allDates, setAllDates] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const mergeByProperty = (target, source) => {
        source.forEach(sourceElement => {
            let targetElement = target.find(targetElement => {
                return sourceElement.school === targetElement.school_name;
            });
            targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
        });
    };
    const date = Date.parse(moment().format());
    const unixTimeZero = Date.parse('2023-04-03T12:50');


    useEffect(() => {
        try {
            const getSchedules = async () => {
                const data = { date: moment().format('YYYY-MM-DD'), user_id: state.authPage.auth_data?.user_id };
                const result = await GetScheduleByDateAndCoachService(data);
                if (result) {
                    result.forEach(v => {
                        var timeStart = v.start_time.replace(/ /g, '');
                        var timeStartString = timeStart.includes('AM') ? timeStart.replace('AM', '') : timeStart.replace('PM', '');
                        var dateTimeStartString = v.date + 'T' + timeStartString;
                        var timeEnd = v.end_time.replace(/ /g, '');
                        var timeEndString = timeEnd.includes('AM') ? timeEnd.replace('AM', '') : timeEnd.replace('PM', '');
                        var dateTimeEndString = v.date + 'T' + timeEndString;
                        var currentDateTimeString = Date.parse(moment().format());
                        if (currentDateTimeString >= Date.parse(dateTimeStartString) && currentDateTimeString <= Date.parse(dateTimeEndString)) {
                            Object.assign(v, { session: 'current' });
                            setSchedules([v]);
                        } else if (currentDateTimeString <= Date.parse(dateTimeStartString)) {
                            Object.assign(v, { session: 'upcoming' });
                            setSchedules(prevState => [...prevState, v]);
                        } else {
                            Object.assign(v, { session: 'completed' });
                            setSchedules(prevState => [...prevState, v]);
                        }
                    });
                    console.log("tym--->", schedules);
                }
            };
            getSchedules();
        }
        catch (e) { }
        // const result = state.authPage.auth_data?.assigned_schools.filter(v => { return (v.region == state.authPage.auth_data?.assigned_region); });
        // const assign_school = result[0].school_name;
        // state.authPage.auth_data?.assign_slot.filter(element => {
        //     if (element.school === assign_school) {
        //         let timeStartStamp = moment(element.startDate);
        //         let timeEndStamp = moment(element.endDate);
        //         setAllDates([timeStartStamp, timeEndStamp]);
        //     }
        // });
        // mergeByProperty(allSchoolData, state.authPage.auth_data?.assign_slot);
    }, []);
    console.log('date--->', schedules);

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView style={styles.scrollView}>
                    <Text>CURRENT REGION: {state.authPage.auth_data?.assigned_region}</Text>
                    {schedules.length > 0 && schedules.map(item => {
                        return (
                            <View key={item._id}>
                                {item.session === 'upcoming' ?
                                    <Text>UPCOMING SEASON: FALL - {item.date} - {item.start_time} {item.end_time}</Text>
                                    : item.session === 'current' ?
                                        <Text>CURRENT SEASON: FALL - {item.date} - {item.start_time} {item.end_time}</Text>
                                        :
                                        <Text>COMPLETED SEASON: FALL - {item.date} - {item.start_time} {item.end_time}</Text>
                                }
                                <DataTable style={styles.container}>
                                    <DataTable.Header style={styles.tableHeader}>
                                        <DataTable.Title>DAY</DataTable.Title>
                                        <DataTable.Title>SCHOOL</DataTable.Title>
                                    </DataTable.Header>
                                    <TouchableOpacity key={item._id} onPress={() => item.session === 'current' ?
                                        navigation.navigate("Coach Particular School Students", { sessionItem: item })
                                        : item.session === 'upcoming' ? Alert.alert(
                                            "Alert",
                                            "You can Enter as the Session Starts!",
                                            [
                                                {
                                                    text: "OK"
                                                }
                                            ]
                                        ) : Alert.alert(
                                            "Alert",
                                            "You can't Enter as the Session is Completed!",
                                            [
                                                {
                                                    text: "OK"
                                                }
                                            ]
                                        )
                                    } style={styles.cachpicWrap}
                                    >
                                        <DataTable.Row>
                                            <DataTable.Cell>{item.school.assigned_day}</DataTable.Cell>
                                            <DataTable.Cell>{item.school.school_name}</DataTable.Cell>
                                        </DataTable.Row>
                                    </TouchableOpacity>
                                </DataTable>
                            </View>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("Coach Dashboard")}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 30
    },
    tableHeader: {
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 2,
        paddingLeft: 15,
        paddingRight: 15,
        position: 'relative',
        marginBottom: 56,
        marginTop: 60
    },
    backbtn: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        position: 'absolute',
        display: 'flex',
        right: 0,
        width: 100,
        justifyContent: 'flex-end'
    },
    linearGradient: {
        flex: 1,
    },
});