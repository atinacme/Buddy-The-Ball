import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import smiley from '../assets/smiley.png';
import message from '../assets/message.png';
import heart from '../assets/red-heart.png';
import clapping from '../assets/clappingHand.png';
import profile from '../assets/profile.png';
import send_button from '../assets/send_button.png';
import moment from 'moment';
import { useSelector } from "react-redux";
import { GetCustomerParticularPhotoService, UpdateCustomerPhotosOnMessage } from '../services/CustomerService';
import EmojiSelector from 'react-native-emoji-selector';
import EmojiPicker from 'react-native-emoji-picker';
import EmojiModal from 'react-native-emoji-modal';

export default function CustomerParticularPhoto({ navigation, route }) {
    const state = useSelector((state) => state);
    const [message, setMessage] = useState("");
    const [onLoadMessages, setOnloadMessages] = useState([]);
    const [msgResult, setMsgResult] = useState();
    const messanger = state.authPage.auth_data.coach_name;
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getCustomers = async () => {
            const result = await GetCustomerParticularPhotoService(route.params.photo._id);
            if (result) {
                setOnloadMessages(result.messages);
            }
        };
        getCustomers();
    }, [msgResult]);

    const [selectedEmoji, setSelectedEmoji] = useState("");

    const onClick = emoji => {
        console.log(emoji);
        setSelectedEmoji(emoji);
    };

    const handleSendMessage = async () => {
        try {
            const data = {
                messanger_id: route.params.photo.user_id,
                message: message,
                messanger_name: messanger
            };
            const result = await UpdateCustomerPhotosOnMessage(route.params.photo._id, data);
            if (result) {
                setMsgResult(result);
                setMessage();
            }
        } catch (e) { }
    };
    return (
        <View style={styles.imgWrap}>
            <Image source={{ uri: route.params.photo.url }} style={{ width: 400, height: '100%' }} />
            <View style={styles.imgDes}>
                {onLoadMessages.length > 0 && onLoadMessages.map(item => {
                    return (
                        <Text key={item._id} style={styles.DateName}>
                            <Image source={profile} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                            <Text style={styles.icontxt}>{item.messanger_name}</Text>
                            <Text style={styles.date}>{moment(item.time).format('MMMM D YY, h:mm a')}</Text>
                            <Text style={styles.date}>{item.message}</Text>
                            {/* <Image source={clapping} style={{ width: 40, height: 40 }} /> */}
                        </Text>
                    );
                })}
                <View style={styles.message_view}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setMessage(e)}
                        value={message}
                        placeholder="Add a comment..."
                    />
                    <TouchableOpacity onPress={handleSendMessage} >
                        <Image source={send_button} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text>
                    Your selected Emoji is:
                    {selectedEmoji ? (
                        selectedEmoji
                    ) : null}
                </Text>
                <EmojiModal onEmojiSelected={(emoji) => { setSelectedEmoji(emoji); }} />
                {/* <EmojiPicker
                    style={{ width: 'auto', maxHeight: 250 }}
                    onEmojiSelected={(emoji) => setSelectedEmoji(emoji)} /> */}
                <View style={styles.iconWrapper}>
                    <View style={styles.iconWrap}>
                        {/* <Image source={smiley} style={{ width: 40, height: 40 }} /> */}
                        <Text style={styles.icontxt}>+</Text>
                    </View>
                    <View style={styles.iconWrap}>
                        <Image source={heart} style={{ width: 40, height: 40 }} />
                        <Text style={styles.icontxt}>1</Text>
                    </View>
                    <View style={styles.iconWrap}>
                        <Image source={message} style={{ width: 40, height: 40 }} />
                        <Text style={styles.icontxt}>1</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        position: 'relative'
    },
    // scrollView: {
    //     marginHorizontal: 20,
    // },
    DateName: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    imgDes: {
        position: 'absolute',
        bottom: 0,
        left: 30
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
        display: 'flex'
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
        fontFamily: 'LemonJuice'
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
    }
});