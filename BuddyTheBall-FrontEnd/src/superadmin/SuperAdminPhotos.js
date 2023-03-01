import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import kids from '../assets/kids.jpg';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperAdminPhotos({ navigation }) {
    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <Text style={styles.label}>Kiddie Academy Anderson</Text>
                <ScrollView>
                    <ScrollView showsVerticalScrollIndicator style={styles.border}>
                        <View style={styles.imgWrap}>
                            {/* {customerData.map((item) => {
                        return ( */}
                            <TouchableOpacity>
                                <Image source={kids} style={{ height: 300, width: 350, marginBottom: 10 }} />
                            </TouchableOpacity>
                            {/* );
                    })} */}
                        </View>
                    </ScrollView>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("SuperAdmin Dashboard")}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        // marginHorizontal: 5,
    },
    label: {
        fontSize: 19,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontFamily: 'LemonJuice'
    },
    imgWrap: {
        paddingBottom: 40,
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    linearGradient: {
        flex: 1,

    },
    wrapper: {
        marginTop: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
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
        marginTop: 25,
        display: 'flex',
        right: 0,
        width: 150,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 10
    }
});