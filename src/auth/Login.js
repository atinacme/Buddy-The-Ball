import React from 'react'
import { Text, SafeAreaView, TextInput, StyleSheet, Button } from "react-native";

export default function Login({ navigation }) {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.label}>Login</Text>
            
            <TextInput
                style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            />
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
                style={{color: 'red', marginTop: 10, padding: '40'}}
                onPress={() => navigation.navigate("CustomerDashboard")}
            />
            <Text style={styles.labeLink}>Forgot Password?</Text>
            <Text style={styles.labeLink}>Create Account?</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 30
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    label: {
     fontSize: 18,
     color: '#000',
     paddingTop: 10,
     paddingBottom: 10  
    },
    labeLink: {
        fontSize: 14,
        textAlign: 'center',
        color: "#000",
       padding: 10,
       cursor: 'pointer'
    },
   
});