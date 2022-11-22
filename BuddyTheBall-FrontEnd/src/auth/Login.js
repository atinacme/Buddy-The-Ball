import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image } from "react-native";
import buddy from '../assets/buddy.png';
import { SignInService } from '../services/UserAuthService';

export default function Login({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSignIn = async () => {
        try {
            const data = {
                email: email,
                password: password
            }
            const result = await SignInService(data);
            console.log("result--->", result)
            if (result.roles[0] === "ROLE_CUSTOMER") {
                navigation.navigate("CustomerDashboard")
            }
        } catch (e) { }
    }
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
<<<<<<< HEAD:src/auth/Login.js
                style={{ marginTop: 40, marginBottom: 40, fontFamily: 'LemonJuice' }} 
                onPress={() => navigation.navigate("SuperAdminDashboard") }
=======
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={handleSignIn}
>>>>>>> 058ee82128b30dfcb57497e7452a93c5996f57f7:BuddyTheBall-FrontEnd/src/auth/Login.js
            />
            <Text style={styles.labeLink}>Forgot Password?</Text>
            <Text style={styles.labeLink}>Create Account?</Text>
        </SafeAreaView>
    )
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
        marginBottom: 10,
        fontFamily: 'LemonJuice'
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
<<<<<<< HEAD:src/auth/Login.js
        paddingBottom: 0 ,
        fontFamily: 'LemonJuice'
=======
        paddingBottom: 0
>>>>>>> 058ee82128b30dfcb57497e7452a93c5996f57f7:BuddyTheBall-FrontEnd/src/auth/Login.js
    },

    labeLink: {
        fontSize: 14,
        textAlign: 'center',
        color: "#000",
<<<<<<< HEAD:src/auth/Login.js
       padding: 10,
       cursor: 'pointer',
       fontFamily: 'LemonJuice'
=======
        padding: 10,
        cursor: 'pointer'
>>>>>>> 058ee82128b30dfcb57497e7452a93c5996f57f7:BuddyTheBall-FrontEnd/src/auth/Login.js
    }
});