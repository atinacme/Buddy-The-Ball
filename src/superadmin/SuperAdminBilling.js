import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { DataTable } from 'react-native-paper';

export default function SuperAdminBilling() {
    const billingList = [
        {
            child_id: 565490,
            child_name: 'Rebecca',
            school: '7306',
            class_date: 'Aug/September'
        },
        {
            child_id: 671762,
            child_name: 'Mariah Stew',
            school: '7306',
            class_date: 'Aug/September'
        },
        {
            child_id: 733983,
            child_name: ' Layla Smith',
            school: '7306',
            class_date: 'Aug/September'
        },
        {
            child_id: 881522,
            child_name: ' Natalie Erkens',
            school: '7306',
            class_date: 'Aug/September'
        },
    ]
    return (
        <SafeAreaView>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title style={styles.title}>Child #</DataTable.Title>
                    <DataTable.Title style={styles.title}>Child Name</DataTable.Title>
                    <DataTable.Title style={styles.title}>School #</DataTable.Title>
                    <DataTable.Title style={styles.title}>Class Date</DataTable.Title>
                </DataTable.Header>
                {billingList.map(item => {
                    return (
                        <DataTable.Row key={item.child_id}>
                         <DataTable.Cell>{item.child_id}</DataTable.Cell>
                            <DataTable.Cell>{item.child_name}</DataTable.Cell>
                            <DataTable.Cell>{item.school}</DataTable.Cell>
                            <DataTable.Cell>{item.class_date}</DataTable.Cell>
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
        borderColor: '#e5bb9f',
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
    title: {
        fontSize: 10,
    }
});