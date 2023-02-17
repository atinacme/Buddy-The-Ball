import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import send_button from '../assets/send_button.png';
import { SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { GetCustomersOfParticularCoachService } from '../services/CoachService';
import { RadioButton } from 'react-native-paper';
import { CreateAndUpdateMessageService } from '../services/CustomerService';

export default function CoachMessageCreation({ navigation, route }) {
    const state = useSelector((state) => state);
    const [receiverRole, setReceiverRole] = useState('customer');
    const [customers, setCustomers] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        try {
            const getCustomersOfCoach = async () => {
                const result = await GetCustomersOfParticularCoachService(state.authPage.auth_data?._id);
                if (result) {
                    setCustomers(result.map(v => Object.assign(v, { key: v._id, value: v.player_name })));
                }
            };
            getCustomersOfCoach();
        } catch (e) { }
    }, []);

    const handleSendMessage = async () => {
        try {
            const data = {
                sender_id: state.authPage.auth_data?._id,
                sender_name: state.authPage.auth_data?.coach_name,
                sender_role: 'coach',
                sender_profile_url: state.authPage.auth_data?.profile_data.url,
                receiver_id: receiverId,
                receiver_role: receiverRole,
                message: message
            };
            const result = await CreateAndUpdateMessageService(data);
            if (result) {
                setMessage();
                navigation.navigate("Coach Dashboard");
            }
        } catch (e) { }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <RadioButton.Group onValueChange={newValue => setReceiverRole(newValue)} value={receiverRole}>
                    <View>
                        <Text>Customer</Text>
                        <RadioButton value="customer" />
                    </View>
                    <View>
                        <Text>Super Admin</Text>
                        <RadioButton value="superadmin" />
                    </View>
                </RadioButton.Group>
            </View>
            <Text style={styles.label}>Message To</Text>
            {receiverRole === 'customer' ?
                <SelectList
                    setSelected={(val) => setReceiverId(val)}
                    data={customers}
                    save="key"
                />
                :
                <TextInput
                    placeholderTextColor="#000"
                    style={styles.input}
                    value="Super Admin"
                    aria-disabled
                />
            }
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
        </SafeAreaView >
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