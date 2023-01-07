import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView } from "react-native";
import buddy from '../assets/buddy.png';
import { GetParticularSchoolService, SchoolUpdationService } from '../services/SchoolService';

export default function SuperAdminSchoolDescription({ navigation, route }) {
    const [schoolData, setSchoolData] = useState({
        school_id: "",
        school_name: "",
        territory: "",
        assigned_day: ""
    });

    useEffect(() => {
        const getParticularCoach = async () => {
            const result = await GetParticularSchoolService(route.params.school._id);
            if (result) {
                setSchoolData({
                    school_id: result._id,
                    school_name: result.school_name,
                    territory: result.territory,
                    assigned_day: result.assigned_day
                });
            }
        };
        getParticularCoach();
    }, []);

    const handleUpdateSchool = async () => {
        try {
            const data = {
                school_name: schoolData.school_name,
                territory: schoolData.territory,
                assigned_day: schoolData.assigned_day,
            };
            const result = await SchoolUpdationService(schoolData.school_id, data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "School Updated Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("SuperAdmin Dashboard")
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Can't update School!"
            );
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                <Text style={styles.label}>School Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setSchoolData({ ...schoolData, school_name: e })}
                    value={schoolData.school_name}
                />
                <Text style={styles.label}>Territory</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setSchoolData({ ...schoolData, territory: e })}
                    value={schoolData.territory}
                />
                <Text style={styles.label}>Assigned Day</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setSchoolData({ ...schoolData, assigned_day: e })}
                    value={schoolData.assigned_day}
                />
                <Button
                    title="Submit"
                    color="#000"
                    style={{ marginTop: 40, marginBottom: 40 }}
                    onPress={handleUpdateSchool}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 0
    },
    labeLink: {
        fontSize: 14,
        textAlign: 'center',
        color: "#000",
        padding: 10,
        cursor: 'pointer'
    }
});
