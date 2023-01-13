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
// import EmojiModal from 'react-native-emoji-modal';
import { Picker } from 'emoji-mart-native';

export default function CustomerParticularPhoto({ navigation, route }) {
    const state = useSelector((state) => state);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [message, setMessage] = useState("");
    const [messageAll, setMessageAll] = useState(`${message}${selectedEmoji}`);
    const [onLoadMessages, setOnloadMessages] = useState([]);
    const [msgResult, setMsgResult] = useState();
    const [msgBottom, setMsgBottom] = useState(0);
    const [emojiBox, setEmojiBox] = useState(false);
    var array = [];
    var messageEmpty = "";
    const messanger = state.authPage.roles[0] === "ROLE_CUSTOMER" ? state.authPage.auth_data.player_name : state.authPage.auth_data.coach_name;

    useEffect(() => {
        const getCustomers = async () => {
            const result = await GetCustomerParticularPhotoService(route.params.photo._id);
            if (result) {
                setOnloadMessages(result.messages);
            }
        };
        getCustomers();
    }, [navigation, msgResult]);

    const handleSendMessage = async () => {
        try {
            const data = {
                messanger_id: route.params.photo.user_id,
                message: message,
                messanger_name: messanger,
                url: state.authPage.auth_data.profile_data.url
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
                            {item.url ?
                                <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                                :
                                <Image source={profile} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                            }
                            <Text style={styles.icontxt}>&nbsp;&nbsp;{item.messanger_name}</Text>
                            <Text style={styles.date}>&nbsp;&nbsp;{moment(item.time).format('MMMM D YY, h:mm a')}</Text>
                            <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;{item.message}</Text>
                            {/* <Image source={clapping} style={{ width: 40, height: 40 }} /> */}
                        </Text>
                    );
                })}
                <View style={styles.commentwrap}>
                    <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        onChangeText={(e) => {
                            setMessage(e);
                            // setMessage((prevState) => [...prevState, e]);
                            // array.push(e);
                            // setMessage(array.join(""));
                            // console.log("in--->", array, array.join(""));
                        }}
                        value={message}
                        placeholder="Add a comment..."
                    />
                    <TouchableOpacity onPress={handleSendMessage} style={styles.photoimg} >
                        <Image source={send_button} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                {/* <Text>
                    Your selected Emoji is:
                    {selectedEmoji ? (
                        selectedEmoji
                    ) : null}
                </Text> */}
                {/* {emojiBox ?
                    <Picker set='apple'
                        showCloseButton={true}
                        onPressClose={() => {
                            setEmojiBox(false);
                            setMsgBottom(0);
                        }}
                        style={{ position: 'absolute', bottom: 20, right: -10 }}
                        onSelect={(emoji) => {
                            let prev = '';
                            array.map(el => { el = prev + el; prev = el + emoji.native; return el; });
                            // array.push(...array, emoji.native);
                            console.log("emoji--->", array, array.join(""));
                        }}
                    />
                    : null} */}
                {/* <View style={styles.iconWrapper}>
                    <View style={styles.iconWrap}>
                        <TouchableOpacity onPress={() => {
                            setEmojiBox(true);
                            setMsgBottom(250);
                        }}
                        >
                            <Image source={smiley} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
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
                </View> */}
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
        alignItems: 'center',
        // justifyContent: 'space-between',
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