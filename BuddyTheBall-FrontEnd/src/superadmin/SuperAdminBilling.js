import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
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
                    <DataTable.Title>Child #</DataTable.Title>
                    <DataTable.Title>Child Name</DataTable.Title>
                    <DataTable.Title>School #</DataTable.Title>
                    <DataTable.Title>Class Date</DataTable.Title>
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
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
});