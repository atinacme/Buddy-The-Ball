import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import send_button from '../assets/send_button.png';
import { SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { CreateAndUpdateMessage } from '../services/CustomerService';
import CoachMessageCreation from '../coach/CoachMessageCreation';
import { GetAllCoachesService } from '../services/CoachService';

export default function SuperAdminMessageCreation() {
    const state = useSelector((state) => state);
    const [coaches, setCoaches] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const getCoaches = async () => {
            const result = await GetAllCoachesService();
            console.log(result);
            if (result) {
                setCoaches(result.map(v => Object.assign(v, { key: v._id, value: v.coach_name })));
            }
        };
        getCoaches();
    }, []);

    const handleSendMessage = async () => {
        try {
            const data = {
                sender_id: state.authPage.id,
                sender_name: 'Super Admin',
                sender_role: 'superadmin',
                sender_profile_url: null,
                receiver_id: receiverId,
                receiver_role: 'coach',
                message: message
            };
            const result = await CreateAndUpdateMessage(data);
            if (result) {
                setMessage();
            }
        } catch (e) { }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.label}>Message To</Text>
            <SelectList
                setSelected={(val) => setReceiverId(val)}
                data={coaches}
                save="key"
            />
            <Text style={styles.label}>Message</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 0
    },
    commentwrap: {
        width: 320
    },
    photoimg: {
        position: 'absolute',
        top: 15,
        right: 10,
    }
});