import React from 'react'
import { Text, SafeAreaView, TextInput, StyleSheet, Button } from "react-native";

export default function Login({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Login</Text>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            />
            <Button
                title="Login"
                color="#f194ff"
                onPress={() => navigation.navigate("CustomerDashboard")}
            />
            <Text>Forgot Password?</Text>
            <Text>Create an Account?</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});