import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { GetSchoolsService } from '../services/SchoolService';

export default function SuperAdminStudents() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        try {
            const getCustomers = async () => {
                const result = await GetSchoolsService();
                if (result) {
                    setCustomers(result);
                }
            };
            getCustomers();
        } catch (e) { }
    });
    return (
        <SafeAreaView>
            <ScrollView>
                {customers.map(customer => {
                    return (
                        <View style={styles.stdWrapper}>
                            <Text style={styles.title}>{customer.school_name}</Text>
                            {customer.customers.length > 0 ?
                                <>
                                    {customer.customers.map(v => {
                                        return (
                                            <View style={styles.stddesc}>
                                                <Text style={styles.content}>{v.player_name}</Text>
                                            </View>
                                        );
                                    })}
                                </>
                                :
                                <View style={styles.stddesc}>
                                    <Text style={styles.content}>No Students!!</Text>
                                </View>
                            }
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
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
});