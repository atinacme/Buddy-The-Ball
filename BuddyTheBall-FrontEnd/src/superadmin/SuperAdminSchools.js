import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { GetSchoolsService } from '../services/SchoolService';

export default function SuperAdminSchools({ navigation }) {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        try {
            const getSchools = async () => {
                const result = await GetSchoolsService();
                if (result) {
                    setSchools(result);
                }
            };
            getSchools();
        } catch (e) { }
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Button
                    title="School Creation"
                    color="#000"
                    onPress={() => navigation.navigate("SuperAdmin School Creation")}
                />
            </View>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>SCHOOL</DataTable.Title>
                    <DataTable.Title>TERRITORY</DataTable.Title>
                    <DataTable.Title>ASSIGNED DAY</DataTable.Title>
                </DataTable.Header>
                {schools.map(item => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => navigation.navigate("SuperAdmin School Description", { school: item })}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.school_name}</DataTable.Cell>
                                <DataTable.Cell>{item.territory}</DataTable.Cell>
                                <DataTable.Cell>{item.assigned_day}</DataTable.Cell>
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