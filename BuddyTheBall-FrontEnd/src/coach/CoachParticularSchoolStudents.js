import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <SafeAreaView>
            <Text>Lucknow Public School</Text>
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