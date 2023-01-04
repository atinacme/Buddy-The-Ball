import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { GetParticularCoachService } from '../services/CoachService';

export default function SuperAdminCoachDescription({ route }) {
    const [coachData, setCoachData] = useState();
    useEffect(() => {
        const getParticularCoach = async () => {
            const result = await GetParticularCoachService(route.params.coachId);
            if (result) {
                setCoachData(result);
            }
        };
        getParticularCoach();
    }, []);
    return (
        <SafeAreaView>
            {coachData && (
                <>
                    <Text>Coach Name : {coachData.coach_name}</Text>
                    <Text>Tennis Club : {coachData.tennis_club}</Text>
                    <Text>Assigned Territory : {coachData.assigned_territory}</Text>
                    <Text>Assigned Schools : {coachData.coach_name}</Text>
                    <Text>Favorite Pro Player : {coachData.favorite_pro_player}</Text>
                    <Text>Handed : {coachData.handed}</Text>
                    <Text>Favorite Drill : {coachData.favorite_drill}</Text>
                </>
            )}
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