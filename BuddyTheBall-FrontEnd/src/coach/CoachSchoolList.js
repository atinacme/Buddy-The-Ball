import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { DataTable } from 'react-native-paper';

export default function CoachSchoolList({ navigation }) {
    const state = useSelector((state) => state);
    const [schoolData, setSchoolData] = useState([]);
    useEffect(() => {
        const result = state.authPage.auth_data.alloted_schools.filter(v => { return (v.territory == state.authPage.auth_data.alloted_territory); });
        setSchoolData(result);
    }, []);
    return (
        <SafeAreaView>
            <Text>TERRITORY: LAS VEGAS</Text>
            <Text>CURRENT SEASON: FALL 1 - Aug 15 - Oct 17</Text>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>DAY</DataTable.Title>
                    <DataTable.Title>SCHOOL</DataTable.Title>
                </DataTable.Header>
                {schoolData.map(item => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => navigation.navigate("Coach Particular School Students")}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.alloted_day}</DataTable.Cell>
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