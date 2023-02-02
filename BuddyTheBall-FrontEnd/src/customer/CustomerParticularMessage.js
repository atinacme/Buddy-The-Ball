import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import send_button from '../assets/send_button.png';
import profile from '../assets/profile.png';
import { SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { CreateAndUpdateMessage, GetMessagesBySenderIdReceiverId } from '../services/CustomerService';
import { CalendarContext } from 'react-native-calendars';

export default function SuperAdminParticularMessage({ route }) {
    const state = useSelector((state) => state);
    const [senderMessages, setSenderMessages] = useState([]);
    const [message, setMessage] = useState();
    const [msgResult, setMsgResult] = useState();

    useEffect(() => {
        const getMessagesBySenderIdReceiverId = async () => {
            console.log("fghbtgf---->", route.params.messages.sender_role, state.authPage.auth_data._id, route.params.messages.sender_id);
            var result;
            if (route.params.messages.sender_role === 'customer') {
                result = await GetMessagesBySenderIdReceiverId(state.authPage.auth_data._id, route.params.messages.receiver_id);
            } else {
                result = await GetMessagesBySenderIdReceiverId(state.authPage.auth_data._id, route.params.messages.sender_id);
            }
            if (result) {
                console.log("log---->", result);
                setSenderMessages(result[0]);
            }
        };
        getMessagesBySenderIdReceiverId();
    }, [msgResult]);

    const handleSendMessage = async () => {
        try {
            const data = {
                message_id: route.params.messages._id,
                messanger_id: state.authPage.auth_data._id,
                role: 'customer',
                receiver_id: route.params.messages.receiver_id,
                receiver_role: senderMessages.receiver_role,
                url: state.authPage.auth_data.profile_data.url,
                message: message,
                messanger_name: state.authPage.auth_data.coach_name
            };
            const result = await CreateAndUpdateMessage(data);
            if (result) {
                setMsgResult(result);
                setMessage();
            }
        } catch (e) { }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {senderMessages?.messages?.map(item => {
                    return (
                        <View key={item._id} style={styles.DateName}>
                            {item.url ?
                                <View style={styles.pro_img}>
                                    <Image resizeMode={"contain"} source={{ uri: item.url }} style={{ width: 40, height: 40 }} />
                                </View>
                                :
                                <View style={styles.pro_img}>
                                    <Image source={profile} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                                </View>
                            }
                            <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;{item.message}</Text>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.commentwrap}>
                <TextInput
                    placeholderTextColor="#000"
                    style={styles.input}
                    onChangeText={(e) => { setMessage(e); }}
                    value={message}
                    placeholder="Add a comment..."
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.photoimg} >
                    <Image source={send_button} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    imgWrap: {
        position: 'relative'
    },
    pro_img: {
        width: 40,
        height: 40,
        aspectRatio: 1 / 1,
        borderColor: '#000',
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 1,
        position: 'relative'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    DateName: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingBottom: 10,
        paddingLeft: 10,
    },
    imgDes: {
        position: 'absolute',
        bottom: 0,
        left: 5,
    },
    input: {
        width: 300,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 10,
        color: '#fff',
        backgroundColor: '#302f35',
        fontFamily: 'LemonJuice',
        position: 'relative',
        left: '2px',
        right: '2px',
    },
    message_view: {
        width: 300,
        display: 'flex',
        // bottom: 0
    },
    iconWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#302f35',
        marginBottom: 10,
        width: 90,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'space-between',
        borderRadius: 20,
    },
    icontxt: {
        color: '#fff',
        fontFamily: 'LemonJuice',
        paddingVertical: 200,
        paddingHorizontal: 200,
    },
    iconWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    date: {
        color: '#000',
        textAlign: 'right',
        float: 'right',
        fontFamily: 'LemonJuice'
    },
    input: {
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 20,
        placeholderTextColor: "#fff",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 20,
        marginTop: 20
    },
    commentwrap: {
        width: 320,
        display: 'flex',
        position: 'absolute',
        left: 20,
        right: 10,
        bottom: 0
    },
    photoimg: {
        position: 'absolute',
        top: 30,
        right: 10,
    }
});