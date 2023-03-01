import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';


export default function CoachSchoolList({ navigation }) {
    const state = useSelector((state) => state);
    const allSchoolData = state.authPage.auth_data?.assigned_schools;
    const [allDates, setAllDates] = useState([]);

    const mergeByProperty = (target, source) => {
        source.forEach(sourceElement => {
            let targetElement = target.find(targetElement => {
                return sourceElement.school === targetElement.school_name;
            });
            targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
        });
    };

    useEffect(() => {
        const result = state.authPage.auth_data?.assigned_schools.filter(v => { return (v.territory == state.authPage.auth_data?.assigned_territory); });
        const assign_school = result[0].school_name;
        state.authPage.auth_data?.assign_slot.filter(element => {
            if (element.school === assign_school) {
                let timeStartStamp = moment(element.startDate);
                let timeEndStamp = moment(element.endDate);
                setAllDates([timeStartStamp, timeEndStamp]);
            }
        });
        mergeByProperty(allSchoolData, state.authPage.auth_data?.assign_slot);
    }, []);

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView style={styles.scrollView}>
                    <Text>CURRENT TERRITORY: {state.authPage.auth_data?.assigned_territory}</Text>
                    <Text>CURRENT SEASON: FALL - {allDates.length > 0 && <>{moment(allDates[0]).format("MMM D")} - {moment(allDates[1]).format("MMM D")}</>}</Text>
                    <DataTable style={styles.container}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title>DAY</DataTable.Title>
                            <DataTable.Title>SCHOOL</DataTable.Title>
                        </DataTable.Header>
                        {allSchoolData.length > 0 && allSchoolData.map(item => {
                            return (
                                <TouchableOpacity key={item._id} onPress={() => item.territory.indexOf(state.authPage.auth_data?.assigned_territory) > -1 ?
                                    navigation.navigate("Coach Particular School Students", { schoolItem: item })
                                    : Alert.alert(
                                        "Alert",
                                        "You are not assigned to this School!",
                                        [
                                            {
                                                text: "OK"
                                            }
                                        ]
                                    )} style={styles.cachpicWrap}
                                >
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.assigned_day}</DataTable.Cell>
                                        <DataTable.Cell>{item.school_name}</DataTable.Cell>
                                    </DataTable.Row>
                                </TouchableOpacity>
                            );
                        })}
                    </DataTable>
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