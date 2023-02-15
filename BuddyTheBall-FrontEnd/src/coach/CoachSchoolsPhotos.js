import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import kids from '../assets/kids.jpg';
import galley from '../assets/galley.png';
import profile from '../assets/profile.png';
import { useSelector } from "react-redux";

export default function CoachSchoolsPhotos({ navigation }) {
    const state = useSelector((state) => state);
    const [schoolData, setSchoolData] = useState([]);

    useEffect(() => {
        setSchoolData(state.authPage.auth_data?.assigned_schools);
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                {schoolData.map(item => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => item.territory.indexOf(state.authPage.auth_data?.assigned_territory) > -1 ?
                            navigation.navigate("Coach Particular School Photos", { schoolItem: item })
                            : Alert.alert(
                                "Alert",
                                "You are not assigned to this School!",
                                [
                                    {
                                        text: "OK"
                                    }
                                ]
                            )} style={styles.cachpicWrap}
                        >
                            <View style={StyleSheet.imgWrapper}>
                                <Image source={kids} style={{ width: 340, height: 300 }} />
                                <Text style={styles.kidimg}>
                                    <Image source={galley} style={{ width: 40, height: 50 }} />
                                </Text>
                                <View style={styles.imgWrap}>
                                    <Text style={styles.imgDes}>
                                        <Text style={styles.day}>Yesterday</Text>
                                        <Text style={styles.title}>{item.school_name}</Text>
                                        <Text style={styles.tmgWrap}>
                                            <Image source={galley} style={{ width: 40, height: 50 }} />
                                            <Text style={styles.num}>100</Text>
                                        </Text>
                                        <Text style={styles.tmgWrap}>
                                            <Image source={profile} style={{ width: 40, height: 50 }} />
                                            <Text style={styles.num}>2</Text>
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        color: '#fff'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    imgWrapper: {
        position: 'relative',
        margin: 10
    },
    imgDes: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    day: {
        color: '#fff',
        fontFamily: 'LemonJuice'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'LemonJuice'
    },
    num: {
        color: '#fff',
        fontFamily: 'LemonJuice'
    },
    tmgWrap: {
        marginBottom: 40
    },
    cachpicWrap: {
        margin: 10
    },
    kidimg: {
        position: 'absolute',
        top: 0,
        left: 15
    },
    wrapper: {
        overflow: 'scroll'
    }
});