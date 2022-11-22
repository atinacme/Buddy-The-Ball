import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native'

export default function SuperAdminStudents() {
    return (
        <SafeAreaView>
             <ScrollView>
            <View style={styles.stdWrapper}>
                <Text style={styles.title}>Springstone Montessori Trails</Text>
                <View style={styles.stddesc}>
                <Text style={styles.content}>Ayan A Asan </Text>
                <Text style={styles.content}>Joselene Longoria-Vargas</Text>
                <Text style={styles.content}>Desmond Reyes</Text>
                <Text style={styles.content}>Jaden Apruebo</Text>
                </View>
            </View>
            <View  style={styles.stdWrapper}>
                <Text style={styles.title}>Coronado Prep</Text>
                <View style={styles.stddesc}>
                <Text style={styles.content}>Ayan A Asan </Text>
                <Text style={styles.content}>Joselene Longoria-Vargas</Text>
                <Text style={styles.content}>Desmond Reyes</Text>
                <Text style={styles.content}>Jaden Apruebo</Text>
                </View>
            </View>
            <View  style={styles.stdWrapper}>
                <Text style={styles.title}>La Petite Pecos</Text>
                <View style={styles.stddesc}>
                <Text style={styles.content}>Ayan A Asan </Text>
                <Text style={styles.content}>Joselene Longoria-Vargas</Text>
                <Text style={styles.content}>Desmond Reyes</Text>
                <Text style={styles.content}>Jaden Apruebo</Text>
                </View>
            </View>
            <View  style={styles.stdWrapper}>
                <Text style={styles.title}>Coronado Prep</Text>
                <View style={styles.stddesc}>
                <Text style={styles.content}>Ayan A Asan </Text>
                <Text style={styles.content}>Joselene Longoria-Vargas</Text>
                <Text style={styles.content}>Desmond Reyes</Text>
                <Text style={styles.content}>Jaden Apruebo</Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    stdWrapper: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: 'LemonJuice',
       paddingBottom: 20
    },

    content: {
        fontSize: 14,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
    }
})