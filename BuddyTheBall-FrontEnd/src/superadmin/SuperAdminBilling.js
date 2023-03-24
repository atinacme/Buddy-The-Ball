import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
import { GetCustomersOfParticularCoachOfParticularSchool } from '../services/CoachService';
import { GetSchoolsService } from '../services/SchoolService';

export default function SuperAdminBilling({ navigation }) {
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
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView>
                    {schools.map((school, index) => {
                        return (
                            <View key={index} style={styles.stdWrapper}>
                                <Text style={styles.title}>{school.school_name}</Text>
                                {school.coaches.length > 0 ?
                                    <>
                                        {school.coaches.map((v, indexNew) => {
                                            return (
                                                <TouchableOpacity key={indexNew} onPress={() => navigation.navigate("SuperAdmin Billing Coach School", { coach: v, school: school })}>
                                                    <View key={indexNew} style={styles.stddesc}>
                                                        <Text style={styles.content}>{v.coach_name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </>
                                    :
                                    <View style={styles.stddesc}>
                                        <Text style={styles.content}>No Coach!!</Text>
                                    </View>
                                }
                            </View>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdmin Dashboard")}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        justifyContent: 'flex-end'
    },
    stdWrapper: {
        flex: 1,
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
        marginTop: 25,
        display: 'flex',
        right: 0,
        width: 150,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10
    },
    title: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: 'LemonJuice',
        paddingBottom: 20
    },
    content: {
        fontSize: 14,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    linearGradient: {
        flex: 1,
    }
});