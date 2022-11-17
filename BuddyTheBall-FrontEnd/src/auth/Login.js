import React from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image } from "react-native";
import buddy from '../assets/buddy.png';

export default function Login({ navigation }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            />
            <Button
                title="Login"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={() => navigation.navigate("CustomerDashboard")}
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