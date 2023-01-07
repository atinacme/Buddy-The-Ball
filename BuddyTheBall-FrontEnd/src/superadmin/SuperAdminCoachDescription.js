import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { GetParticularCoachService } from '../services/CoachService';
import { GetSchoolsService } from '../services/SchoolService';

export default function SuperAdminCoachDescription({ route }) {
    const [coachData, setCoachData] = useState({
        coach_id: "",
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
    const [assignedSchools, setAssignedSchools] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const getParticularCoach = async () => {
            console.log(route.params.coach._id);
            const result = await GetParticularCoachService(route.params.coach._id);
            if (result) {
                setCoachData({
                    coach_id: result._id,
                    email: result.email,
                    password: result.password,
                    coach_name: result.coach_name,
                    assigned_territory: result.assigned_territory,
                    tennis_club: result.tennis_club,
                    favorite_pro_player: result.favorite_pro_player,
                    handed: result.handed,
                    favorite_drill: result.favorite_drill
                });
                setAssignedSchools(result.assigned_schools.map(v => { return { key: v._id, value: v.school_name }; }));
            }
        };
        getParticularCoach();
        const getAllSchools = async () => {
            const result = await GetSchoolsService();
            result.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
            setData(result);
        };
        getAllSchools();
    }, []);
    console.log("cc---->", assignedSchools);

    const handleSignUp = async () => {
        try {
            const data = {
                email: coachData.email,
                password: coachData.password,
                roles: ['coach'],
                coach_name: coachData.coach_name,
                assigned_territory: coachData.assigned_territory,
                assigned_schools: selected,
                tennis_club: coachData.tennis_club,
                favorite_pro_player: coachData.favorite_pro_player,
                handed: coachData.handed,
                favorite_drill: coachData.favorite_drill
            };
            const result = await SignUpService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Coach Added Successfully",
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
                "Failed! Email is already in use!"
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
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCoachData({ ...coachData, assigned_territory: e })}
                    value={coachData.assigned_territory}
                />
                <Text style={styles.label}>Assigned Schools</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    onSelect={() => alert(selected)}
                    label="Selected Schools"
                    defaultOption={{ key: assignedSchools.map(item => item.key), value: assignedSchools.map(item => item.value) }}
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
                    onPress={handleSignUp}
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