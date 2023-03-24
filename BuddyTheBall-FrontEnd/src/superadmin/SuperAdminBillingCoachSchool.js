import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableHighlight, TouchableOpacity, ScrollView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { GetSchoolsService } from '../services/SchoolService';
import LinearGradient from 'react-native-linear-gradient';
import { GetCustomersOfParticularCoachOfParticularSchool } from '../services/CoachService';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';

export default function SuperAdminBillingCoachSchool({ navigation, route }) {
    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
        try {
            const handleCustomers = async () => {
                const result = await GetCustomersOfParticularCoachOfParticularSchool(route.params.coach._id, route.params.school._id);
                if (result) {
                    setCustomerData(result);
                }
            };
            handleCustomers();
        } catch (e) { }
    });
    const htmltable = () => {
        let t = '';
        for (let i in customerData) {
            const item = customerData[i];
            t = t +
                `<tr>
                <td>${item.player_name}</td>
                <td>${item._id}</td>
                <td>${item.total_present}</td>
                <td>${item.total_absent}</td>
            </tr>`;
        }
        return t;
    };
    async function createPDF() {
        let options = {
            html: `<h2>HTML Table</h2>
            <table border='1'>
                <tr>
                    <th>Child Name</th>
                    <th>Child ID</th>
                    <th>Attended</th>
                    <th>Absent</th>
                </tr>
                ${htmltable()}
            </table>`,
            fileName: 'test',
            directory: 'Documents',
        };

        let file = await RNHTMLtoPDF.convert(options);
        // console.log(file.filePath);
        alert(file.filePath);
    }
    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.bottom}>
                <View>
                    <TouchableHighlight onPress={createPDF}>
                        <Text>Create PDF</Text>
                    </TouchableHighlight>
                </View>
                <DataTable style={styles.container}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title style={styles.title}>School # {route.params.school._id}</DataTable.Title>
                        <DataTable.Title style={styles.title}>Date MM/DD/YY: {moment(route.params.coach.startDate).format("MM/DD/YY")}-{moment(route.params.coach.endDate).format("MM/DD/YY")}</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>Vendor: Buddy the Ball</DataTable.Cell>
                        <DataTable.Cell>Vendor Coach/Instructor: {route.params.coach.coach_name}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                <ScrollView horizontal style={styles.border}>
                    <DataTable style={styles.container}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title style={styles.title}>Child Name</DataTable.Title>
                            <DataTable.Title style={styles.title}>Child ID</DataTable.Title>
                            <DataTable.Title style={styles.title}>Attended</DataTable.Title>
                            <DataTable.Title style={styles.title}>Absent</DataTable.Title>
                        </DataTable.Header>
                        {customerData.map(item => {
                            return (
                                <DataTable.Row key={item._id}>
                                    <DataTable.Cell>{item.player_name}</DataTable.Cell>
                                    <DataTable.Cell>{item._id}</DataTable.Cell>
                                    <DataTable.Cell>{item.total_present}</DataTable.Cell>
                                    <DataTable.Cell>{item.total_absent}</DataTable.Cell>
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