import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


export default function SuperAdminSettings() {
    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
         <SafeAreaView style={styles.wrapper}>
        <View>
            {/* <Text>SuperAdminSettings</Text> */}
        </View>
        <TouchableOpacity>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
        </SafeAreaView>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    wrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end'
    },
    backbtn: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        position: 'absolute',
        display: 'flex',
        right: 0,
        width: 100,
        justifyContent: 'flex-end',
        bottom: 0,
        marginBottom: 10
    },
});