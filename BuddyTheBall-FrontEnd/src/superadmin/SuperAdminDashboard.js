import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

export default function SuperAdminDashboard({ navigation }) {
    return (
        <SafeAreaView>
            <Text>SuperAdminDashboard</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                <Text>BILLING/INVOICING</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminCoaches")}>
                <Text>COACHES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminPhotos")}>
                <Text>PHOTOS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminStudents")}>
                <Text>STUDENTS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminSettings")}>
                <Text>SETTINGS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                <Text>SCHOOLS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                <Text>MESSAGING</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdminBilling")}>
                <Text>CALENDAR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
