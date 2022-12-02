import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper';

export default function SuperAdminCoaches() {
    const billingList = [
        {
            id: 1,
            coach: 'Tanner',
            territory: 'Las Vegas',
            no_students: 99,
            school_qty: 11
        },
        {
            id: 2,
            coach: 'Vincent',
            territory: 'Phoenix',
            no_students: 99,
            school_qty: 11
        },
        {
            id: 3,
            coach: 'Kenny',
            territory: 'Denver',
            no_students: 99,
            school_qty: 11
        },
        {
            id: 4,
            coach: 'Manny',
            territory: 'Las Vegas ',
            no_students: 99,
            school_qty: 11
        },
    ]
    return (
        <SafeAreaView>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>COACH</DataTable.Title>
                    <DataTable.Title>TERRITORY</DataTable.Title>
                    <DataTable.Title># of STUDENTS</DataTable.Title>
                    <DataTable.Title>SCHOOL QTY</DataTable.Title>
                </DataTable.Header>
                {billingList.map(item => {
                    return (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{item.coach}</DataTable.Cell>
                            <DataTable.Cell>{item.territory}</DataTable.Cell>
                            <DataTable.Cell>{item.no_students}</DataTable.Cell>
                            <DataTable.Cell>{item.school_qty}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
            </DataTable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderColor: '#000',
        borderWidth: 1,
        overflow: 'scroll',
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'LemonJuice',
        fontSize: 12
    },
    tableHeader: {
        backgroundColor: '#f3d8c6',
        textAlign: 'center',
        fontFamily: 'LemonJuice',
        color: '#fff'
    },
    
});