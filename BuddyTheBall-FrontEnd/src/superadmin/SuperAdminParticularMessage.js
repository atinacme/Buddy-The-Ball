import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import send_button from '../assets/send_button.png';
import profile from '../assets/profile.png';
import { SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { CreateAndUpdateMessage, GetMessagesBySenderIdReceiverId } from '../services/CustomerService';

export default function SuperAdminParticularMessage({ route }) {
    const state = useSelector((state) => state);
    const [senderMessages, setSenderMessages] = useState([]);
    const [message, setMessage] = useState();
    const [msgResult, setMsgResult] = useState();

    useEffect(() => {
        const getMessagesBySenderIdReceiverId = async () => {
            var result;
            if (route.params.messages.sender_role === 'superadmin') {
                result = await GetMessagesBySenderIdReceiverId(state.authPage.id, route.params.messages.receiver_id);
            } else {
                result = await GetMessagesBySenderIdReceiverId(state.authPage.id, route.params.messages.sender_id);
            }
            if (result) {
                setSenderMessages(result[0]);
            }
        };
        getMessagesBySenderIdReceiverId();
    }, [msgResult]);

    const handleSendMessage = async () => {
        try {
            const data = {
                message_id: route.params.messages._id,
                messanger_id: state.authPage.id,
                role: 'superadmin',
                receiver_id: route.params.messages.receiver_id,
                receiver_role: senderMessages.receiver_role,
                url: null,
                message: message,
                messanger_name: 'Super Admin'
            };
            const result = await CreateAndUpdateMessage(data);
            if (result) {
                setMsgResult(result);
                setMessage();
            }
        } catch (e) { }
    };

    return (
        <SafeAreaView>
            <View>
                {senderMessages?.messages?.map(item => {
                    return (
                        <Text key={item._id} style={styles.DateName}>
                            {item.url ?
                                <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                                :
                                <Image source={profile} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                            }
                            <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;{item.message}</Text>
                        </Text>
                    );
                })}
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
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        position: 'relative'
    },
    DateName: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 10,
    },
    imgDes: {
        position: 'absolute',
        bottom: 0,
        left: 5,
    },
    input: {
        width: 250,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 10,
        color: '#fff',
        padding: 10,
        backgroundColor: '#302f35',
        fontFamily: 'LemonJuice'
    },
    message_view: {
        width: 300,
        display: 'flex',
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
        color: '#fff',
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
        position: 'relative',
        left: 10,
        right: 10,
    },
    photoimg: {
        position: 'absolute',
        top: 30,
        right: 10,
    }
});