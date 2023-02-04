import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import rightArrow from '../assets/right-arrow.png';
import message from '../assets/message.png';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GetMessagesBySenderId } from '../services/CustomerService';
import moment from 'moment';

export default function SuperAdminMessages({ navigation }) {
    const state = useSelector((state) => state);
    const [senderMessages, setSenderMessages] = useState([]);

    useEffect(() => {
        const getMessagesBySenderId = async () => {
            const result = await GetMessagesBySenderId(state.authPage.id);
            if (result) {
                setSenderMessages(result);
            }
        };
        getMessagesBySenderId();
    }, []);

    return (
        <SafeAreaView>
            {senderMessages.map(item => {
                return (
                    <TouchableOpacity key={item._id} onPress={() => navigation.navigate("SuperAdmin Particular Message", { messages: item })}>
                        {item.sender_role === "coach" ?
                            <View key={item._id} style={styles.messagewrap}>
                                <Image source={{ uri: item.sender_profile_url }} style={{ width: 30, height: 30 }} />
                                <Text style={styles.msgName}>{item.last_messanger}</Text>
                                <Text style={styles.msgWrap}>{item.last_message}</Text>
                                <Text style={styles.rightsec}>
                                    <Text style={styles.msgDay}>{moment(item.time).format('dddd')}</Text>
                                    <Image source={rightArrow} style={{ width: 15, height: 15 }} />
                                </Text>
                            </View>
                            :
                            <View key={item._id} style={styles.messagewrap}>
                                <Image source={{ uri: item.receiver_profile_url }} style={{ width: 30, height: 30 }} />
                                <Text style={styles.msgName}>{item.receiver_name}</Text>
                                <Text style={styles.msgWrap}>{item.last_message}</Text>
                                <Text style={styles.rightsec}>
                                    <Text style={styles.msgDay}>{moment(item.time).format('dddd')}</Text>
                                    <Image source={rightArrow} style={{ width: 15, height: 15 }} />
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity onPress={() => navigation.navigate("SuperAdmin Message Creation")}>
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