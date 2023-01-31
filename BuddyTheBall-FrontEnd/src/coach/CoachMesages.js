import React, { useEffect, useState } from 'react';
import user from '../assets/user.png';
import { useSelector } from "react-redux";
import rightArrow from '../assets/right-arrow.png';
import message from '../assets/message.png';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GetMessagesBySenderId } from '../services/CustomerService';
import _ from "lodash";

export default function CoachMesages({ navigation }) {
    const messages = [
        {
            id: 1,
            name: 'Atin Gupta',
            day: 'Wednesday',
            message: 'Today is wednesday'
        },
        {
            id: 2,
            name: 'Sugam Mahendaru',
            day: 'Yesterday',
            message: 'Yesterday is tuesday'
        },
        {
            id: 3,
            name: 'Bhupendra Singh',
            day: 'Monday',
            message: 'Monday is the first day'
        }
    ];
    const state = useSelector((state) => state);
    const [senderMessages, setSenderMessages] = useState([]);

    // function areEquals(a, b) {
    //     var keys1 = Object.keys(a);
    //     var keys2 = Object.keys(b);
    //     if (keys1.length !== keys2.length) {
    //         return false;
    //     }
    //     for (key in a) {
    //         if (a[key] !== b[key]) return false;
    //     }
    //     return true;
    // }

    // function checkArray(arr) {
    //     for (var i = 1; i < arr.length + 1; i++) {
    //         console.log("nswdfcj--->", arr.length, arr[i]);
    //         if (!areEquals(arr[0], arr[i])) return false;
    //     }
    //     return true;
    // }
    // console.log("result---->", checkArray(senderMessages));
    const combinedItems = (arr = []) => {
        const res = arr.reduce((acc, obj) => {
            let found = false;
            for (let i = 0; i < acc.length; i++) {
                if (acc[i].receiver_id === obj.receiver_id) {
                    found = true;
                    obj.all_messages = obj.message;
                    console.log("msg---->", obj);
                    acc[i].push(obj);
                    // acc[i].count++;
                };
            }
            if (!found) {
                obj.count = 1;
                acc.push(obj);
            }
            return acc;
        }, []);
        return res;
    };

    useEffect(() => {
        const getMessagesBySenderId = async () => {
            const result = await GetMessagesBySenderId(state.authPage.auth_data._id);
            if (result) {
                console.log("combinedItems", combinedItems(result));
                // result.forEach(obj => {
                //     if (!_.isEqual(result[0].receiver_id, obj.receiver_id)) {
                //         console.log("not equal----->", obj);
                //     } else {
                //         console.log("equal----->", obj);
                //     }
                // });
            }
        };
        getMessagesBySenderId();
    }, []);

    return (
        <SafeAreaView>
            {messages.map(item => {
                return (
                    <View key={item.id} style={styles.messagewrap}>
                        <Image source={user} style={{ width: 30, height: 30 }} />
                        {/* <Text style={styles.nameDay}> */}
                        <Text style={styles.msgName}>{item.name}</Text>
                        <Text style={styles.msgWrap}>{item.message}</Text>
                        <Text style={styles.rightsec}>
                            <Text style={styles.msgDay}>{item.day}</Text>
                            <Image source={rightArrow} style={{ width: 15, height: 15 }} />
                        </Text>

                        {/* </Text> */}

                    </View>
                );
            })}
            <TouchableOpacity onPress={() => navigation.navigate("Coach Message Creation")}>
                <View style={styles.messageImageHolder}>
                    <Image resizeMode={"contain"} source={message} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    messagewrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    msgWrap: {
        paddingTop: 0,
        marginTop: 0,
        fontFamily: 'LemonJuice'
    },
    msgName: {
        textAlign: 'left',
        color: '#000',
        fontFamily: 'LemonJuice'
    },
    msgDay: {
        textAlign: 'right',
        color: '#000',
        marginRight: 10,
        fontFamily: 'LemonJuice'
    },
    messageImageHolder: {
        left: '70%',
        top: '400%',
        width: 80,
        height: 80,
        aspectRatio: 1 / 1,
        backgroundColor: '#d8d8d8',
        padding: 20,
        borderColor: '#d8d8d8',
        borderRadius: 50,
        overflow: 'hidden'
    }
});