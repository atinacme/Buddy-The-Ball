import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { GetAllCoachesService } from '../services/CoachService';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperAdminCoaches({ navigation }) {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        try {
            const getCoaches = async () => {
                const result = await GetAllCoachesService();
                if (result) {
                    setCoaches(result);
                }
            };
            getCoaches();
        } catch (e) { }
    }, []);

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView horizontal style={styles.border}>
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
                </ScrollView>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => navigation.navigate("Coach Creation")}>
                        <Text style={styles.coach_cta}>Coaches</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.backbtn}>Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    // scrollView: {
    //     backgroundColor: 'pink',
    //     marginHorizontal: 20,
    // },
    wrapper: {
        flex: 1,
        padding: 15,
    },
   btn: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        width: '100%',
        left: 15,
        right: 0,
    },
    databorder: {
        borderRightWidth: '2',
        borderRightColor: '#000'
    },
    backbtn: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        width: 100,
        color: '#fff'
    },
    coach_cta: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#5b9bd5",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        width: 100,
        justifyContent: 'flex-start',
        color: '#fff'
    },
    linearGradient: {
        flex: 1,
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
        marginTop: 60,
        marginBottom: 50
    },
    tableHeader: {
        backgroundColor: '#fff',
        textAlign: 'center',
        fontFamily: 'LemonJuice',
        color: '#fff'
    }
});