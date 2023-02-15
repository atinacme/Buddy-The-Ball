import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { GetAllCoachesService } from '../services/CoachService';

export default function SuperAdminCoaches({ navigation }) {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        const getCoaches = async () => {
            const result = await GetAllCoachesService();
            if (result) {
                setCoaches(result);
            }
        };
        getCoaches();
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Button
                    title="Coach Creation"
                    color="#000"
                    onPress={() => navigation.navigate("Coach Creation")}
                />
            </View>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>COACH</DataTable.Title>
                    <DataTable.Title>TERRITORY</DataTable.Title>
                    {/* <DataTable.Title># of STUDENTS</DataTable.Title> */}
                    <DataTable.Title>SCHOOL QTY</DataTable.Title>
                </DataTable.Header>
                {coaches.map(item => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => navigation.navigate("SuperAdmin Coach Description", { coach: item })}>
                            <DataTable.Row>
                                <DataTable.Cell>{item.coach_name}</DataTable.Cell>
                                <DataTable.Cell>{item.assigned_territory}</DataTable.Cell>
                                {/* <DataTable.Cell>{item.no_students}</DataTable.Cell> */}
                                <DataTable.Cell>{item.assigned_schools.length}</DataTable.Cell>
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
    }
});