import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, View, ScrollView
} from 'react-native';
import { useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { GetCoachesOfParticularRegionalManager } from '../services/RegionalManagerService';
import Config from '../../Config';
import { GetAllCoachesService } from '../services/CoachService';

export default function SuperAdminCalendar({ navigation }) {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        try {
            const getCoaches = async () => {
                const result = await GetAllCoachesService();
                if (result.length > 0) {
                    setCoaches(result);
                }
            };
            getCoaches();
        } catch (e) { }
    }, []);

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView>
                    {coaches.map((coach, index) => {
                        return (
                            <View key={index}>
                                <View key={index} style={styles.stdWrapper}>
                                    <Text style={styles.title}>Coach {coach.coach_name}</Text>
                                    {coach.schedules.map((v => {
                                        return (
                                            <Text key={v._id} style={styles.title}>{v.date}:{v.start_time} {v.end_time}</Text>
                                        );
                                    }))}
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("Super Admin Dashboard")}>
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
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10
    },
    // stdWrapper: {
    //     padding: 10,
    //     backgroundColor: '#fff'
    // },
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
    },
});