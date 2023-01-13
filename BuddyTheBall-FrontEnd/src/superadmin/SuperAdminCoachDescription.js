import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView, View, TouchableOpacity } from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import cross from '../assets/cross.jpg';
import { CoachUpdateService, GetParticularCoachService } from '../services/CoachService';
import { GetSchoolsService } from '../services/SchoolService';

export default function SuperAdminCoachDescription({ navigation, route }) {
    const [coachData, setCoachData] = useState({
        coach_id: "",
        user_id: "",
        email: "",
        password: "",
        coach_name: "",
        assigned_territory: "",
        tennis_club: "",
        favorite_pro_player: "",
        handed: "",
        favorite_drill: ""
    });
    const [data, setData] = useState([]);
    const [coachSchools, setCoachSchools] = useState([]);
    const [assignedSchools, setAssignedSchools] = useState([]);
    const [selected, setSelected] = useState([]);

    const territoryList = [
        {
            key: "Kanpur",
            value: "Kanpur"
        },
        {
            key: "Lucknow",
            value: "Lucknow"
        },
        {
            key: "Allahabad",
            value: "Allahabad"
        },
        {
            key: "Banaras",
            value: "Banaras"
        }
    ];

    useEffect(() => {
        const getParticularCoach = async () => {
            const result = await GetParticularCoachService(route.params.coach._id);
            if (result) {
                setCoachData({
                    coach_id: result._id,
                    user_id: result.user_id,
                    email: result.email,
                    password: result.password,
                    coach_name: result.coach_name,
                    assigned_territory: result.assigned_territory,
                    tennis_club: result.tennis_club,
                    favorite_pro_player: result.favorite_pro_player,
                    handed: result.handed,
                    favorite_drill: result.favorite_drill
                });
                setCoachSchools(result.assigned_schools.map(v => v.school_name));
                setAssignedSchools(result.assigned_schools.map(v => { return { key: v._id, value: v.school_name }; }));
            }
        };
        getParticularCoach();
    }, []);

    useEffect(() => {
        const getAllSchools = async () => {
            const result = await GetSchoolsService();
            result.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
            var res = result.filter(function (item) {
                return !assignedSchools.find(function (school) {
                    return item.key === school.key;
                });
            });
            setData(res);
        };
        getAllSchools();
    }, [assignedSchools]);

    console.log("djchd--->", coachData);

    const handleCoachUpdate = async () => {
        try {
            const data = {
                email: coachData.email,
                password: coachData.password,
                coach_name: coachData.coach_name,
                tennis_club: coachData.tennis_club,
                assigned_territory: coachData.assigned_territory,
                assigned_schools: coachSchools.concat(selected),
                favorite_pro_player: coachData.favorite_pro_player,
                handed: coachData.handed,
                favorite_drill: coachData.favorite_drill
            };
            console.log("data--->", data);
            const result = await CoachUpdateService(coachData.user_id, coachData.coach_id, data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Coach Updated Successfully",
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
                "Failed! Can't Update Coach!"
            );
        }
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, email: e })}
                    value={coachData.email}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, password: e })}
                    value={coachData.password}
                />
                <Text style={styles.label}>Coach Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, coach_name: e })}
                    value={coachData.coach_name}
                />
                <Text style={styles.label}>Assigned Territory</Text>
                <SelectList
                    setSelected={(val) => setCoachData({ ...coachData, assigned_territory: val })}
                    data={territoryList}
                    save="key"
                    defaultOption={{ key: coachData.assigned_territory, value: coachData.assigned_territory }}
                />
                <Text style={styles.label}>Assigned Schools</Text>
                <Text>
                    {assignedSchools.map((item) => {
                        return (
                            <View key={item.key} style={{ justifyContent: 'space-between' }}>
                                <Text>{item.value}</Text>
                                <TouchableOpacity key={item.key} onPress={() => {
                                    setAssignedSchools(assignedSchools.filter((school) => school.key !== item.key));
                                    setCoachSchools(coachSchools.filter((school) => school !== item.value));
                                }}>
                                    <Image source={cross} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    onSelect={() => alert(selected)}
                    label="Selected Schools"
                />
                <Text style={styles.label}>Tennis Club</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, tennis_club: e })}
                    value={coachData.tennis_club}
                />
                <Text style={styles.label}>Favourite Pro Player</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, favorite_pro_player: e })}
                    value={coachData.favorite_pro_player}
                />
                <Text style={styles.label}>Handed</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, handed: e })}
                    value={coachData.handed}
                />
                <Text style={styles.label}>Favourite Drill</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, favorite_drill: e })}
                    value={coachData.favorite_drill}
                />
                <Button
                    title="Submit"
                    color="#000"
                    style={{ marginTop: 40, marginBottom: 40 }}
                    onPress={handleCoachUpdate}
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