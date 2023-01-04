import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { SchoolCreationService } from '../services/SchoolService';

export default function SuperAdminSchoolCreation({ navigation }) {
    const [schoolData, setSchoolData] = useState({
        school_name: "",
        territory: "",
        assigned_day: ""
    });

    const handleAddSchool = async () => {
        try {
            const data = {
                school_name: schoolData.school_name,
                territory: schoolData.territory,
                assigned_day: schoolData.assigned_day,
            };
            const result = await SchoolCreationService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "School Added Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => setSchoolData()
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Can't add School!"
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
                    onPress={handleAddSchool}
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
