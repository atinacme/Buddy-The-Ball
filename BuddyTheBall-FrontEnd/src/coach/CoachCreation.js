import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert } from "react-native";
import buddy from '../assets/buddy.png';
import { SignUpService } from '../services/UserAuthService';

export default function CoachCreation({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignUp = async () => {
        try {
            const data = {
                email: email,
                password: password,
                roles: ['coach']
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
                onChangeText={(e) => setEmail(e)}
                value={email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={(e) => setPassword(e)}
                value={password}
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
