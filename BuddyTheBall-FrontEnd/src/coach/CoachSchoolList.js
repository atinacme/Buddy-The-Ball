import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from "react-redux";
import { DataTable } from 'react-native-paper';
import moment from 'moment';

export default function CoachSchoolList({ navigation }) {
    const state = useSelector((state) => state);
    const allSchoolData = state.authPage.auth_data.assigned_schools;
    const [allDates, setAllDates] = useState([]);

    useEffect(() => {
        const result = state.authPage.auth_data.assigned_schools.filter(v => { return (v.territory == state.authPage.auth_data.assigned_territory); });
        const assign_school = result[0].school_name;
        state.authPage.auth_data.assign_slot.filter(element => {
            if (element.school === assign_school) {
                let timeStartStamp = moment(element.startDate);
                let timeEndStamp = moment(element.endDate);
                setAllDates([timeStartStamp, timeEndStamp]);
            }
        });
    }, []);

    return (
        <SafeAreaView>
            <Text>CURRENT TERRITORY: {state.authPage.auth_data.assigned_territory}</Text>
            <Text>CURRENT SEASON: FALL - {moment(allDates[0]).format("MMM D")} - {moment(allDates[1]).format("MMM D")}</Text>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>DAY</DataTable.Title>
                    <DataTable.Title>SCHOOL</DataTable.Title>
                </DataTable.Header>
                {allSchoolData.map(item => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => item.territory.indexOf(state.authPage.auth_data.assigned_territory) > -1 ?
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
});