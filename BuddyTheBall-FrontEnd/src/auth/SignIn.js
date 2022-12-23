import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image } from "react-native";
import buddy from '../assets/buddy.png';
import { SignInService } from '../services/UserAuthService';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSignIn = async () => {
        try {
            const data = {
                email: email,
                password: password
            };
            console.log('login', data);
            const result = await SignInService(data);
            console.log("result--->", result);
            if (result.roles[0] === "ROLE_CUSTOMER") {
                navigation.navigate("Customer Dashboard");
            } else if (result.roles[0] === "ROLE_COACH") {
                navigation.navigate("Coach Dashboard");
            } else {
                navigation.navigate("SuperAdmin Dashboard");
            }
        } catch (e) { console.log(e.message); }
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
                title="Login"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={handleSignIn}
            />
            {/* <Text style={styles.labeLink}>Forgot Password?</Text> */}
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