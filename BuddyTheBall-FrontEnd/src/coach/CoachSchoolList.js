import React from 'react'
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';

export default function CoachSchoolList({ navigation }) {
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
    ]
    return (
        <SafeAreaView>
            <Text>TERRITORY: LAS VEGAS</Text>
            <Text>CURRENT SEASON: FALL 1 - Aug 15 - Oct 17</Text>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>DAY</DataTable.Title>
                    <DataTable.Title>SCHOOL</DataTable.Title>
                </DataTable.Header>
                {schools.map(item => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate("CoachParticularSchoolStudents")}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.day}</DataTable.Cell>
                                <DataTable.Cell>{item.school}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )
                })}
            </DataTable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
});