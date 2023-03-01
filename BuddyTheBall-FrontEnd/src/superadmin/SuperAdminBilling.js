import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperAdminBilling({ navigation }) {
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
    ];
    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.bottom}>
                <ScrollView horizontal style={styles.border}>
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
                            );
                        })}
                    </DataTable>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdmin Dashboard")}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        position: 'relative',
        marginBottom: 56,
        marginTop: 60
    },
    backbtn: {
        borderColor: "#ffc000",
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
    scrollView: {
        marginHorizontal: 5,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    container: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'LemonJuice',
        fontSize: 12,
        overflow: 'scroll',
        borderWidth: 2,
        borderColor: '#ffc000',
        backgroundColor: '#fff',
        margin: 10
    },
    tableHeader: {
        textAlign: 'center',
        fontFamily: 'LemonJuice',
        color: '#fff'
    },
    title: {
        fontSize: 10,
    }
});