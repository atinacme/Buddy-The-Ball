import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { SignUpService } from '../services/UserAuthService';

export default function CoachCreation({ navigation }) {
    const [selected, setSelected] = React.useState([]);

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ];
    const [coachData, setCoachData] = useState({
        email: "",
        password: "",
        coach_name: "",
        alloted_schools: [],
        tennis_club: "",
        favorite_pro_player: "",
        handed: "",
        favorite_drill: "",
        class_photos: "", calendar_slot: "",
        message: ""
    });

    const handleSignUp = async () => {
        try {
            const data = {
                email: coachData.email,
                password: coachData.password,
                roles: ['coach'],
                coach_name: coachData.coach_name,
                alloted_schools: coachData.alloted_schools,
                tennis_club: coachData.tennis_club,
                favorite_pro_player: coachData.favorite_pro_player,
                handed: coachData.handed,
                favorite_drill: coachData.favorite_drill,
                class_photos: coachData.class_photos,
                calendar_slot: coachData.calendar_slot,
                message: coachData.message
            };
            const result = await SignUpService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Coach Added Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("SuperAdmin Coaches")
                        }
                    ]
                );
            }
            console.log("result--->", result);
        } catch (e) { }
    };
    return (
        <SafeAreaView style={styles.wrapper}>
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
            <Text style={styles.label}>Alloted Schools</Text>
            <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                onSelect={() => alert(selected)}
                label="Categories"
            />
            <Button
                title="Submit"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={handleSignUp}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
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
