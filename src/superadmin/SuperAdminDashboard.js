import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native'
export default function SuperAdminDashboard({ navigation }) {
    return (
        <SafeAreaView>
            <Text style={styles.adminWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                    <Text style={styles.adminContainer}>BILLING / INVOICING</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminCoaches")}>
                    <Text style={styles.adminContainer}>COACHES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminPhotos")}>
                    <Text style={styles.adminContainer}>PHOTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminStudents")}>
                    <Text style={styles.adminContainer}>STUDENTS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminSettings")}>
                    <Text style={styles.adminContainer}>SETTINGS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                    <Text style={styles.adminContainer}>SCHOOLS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                    <Text style={styles.adminContainer}>MESSAGING</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                    <Text style={styles.adminContainer}>CALENDAR</Text>
                </TouchableOpacity>
            </Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    adminWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    adminContainer: {
        width: 150,
        backgroundColor: '#f3d8c6',
        margin: 10,
        padding: 30,
        color: '#000',
        fontSize: 12,
        height: 100,
        borderRadius: 10,
        textAlign: 'center',
        lineHeight: 18,
        borderWidth: 2,
        borderColor: '#e5bb9f',
        fontWeight: '600',
        fontFamily: 'LemonJuice'
    },
})
