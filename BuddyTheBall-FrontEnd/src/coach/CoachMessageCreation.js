import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import send_button from '../assets/send_button.png';
import { SafeAreaView, Text, TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { GetCustomersOfParticularCoachService } from '../services/CoachService';
import { RadioButton } from 'react-native-paper';

export default function CoachMessageCreation() {
    const state = useSelector((state) => state);
    const [role, setRole] = useState('customer');
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const getCustomersOfCoach = async () => {
            const result = await GetCustomersOfParticularCoachService(state.authPage.auth_data._id);
            if (result) {
                setCustomers(result.map(v => Object.assign(v, { key: v._id, value: v.player_name })));
            }
        };
        getCustomersOfCoach();
    }, []);

    const handleSendMessage = async () => {
        try {
            const data = {
                role: role,
                messanger_id: state.authPage.auth_data._id,
                message: message,
                message_to_id: customerId,
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
        <SafeAreaView style={styles.wrapper}>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <RadioButton.Group onValueChange={newValue => setRole(newValue)} value={role}>
                    <View>
                        <Text>Customer</Text>
                        <RadioButton value="customer" />
                    </View>
                    <View>
                        <Text>Super Admin</Text>
                        <RadioButton value="super_admin" />
                    </View>
                </RadioButton.Group>
            </View>
            <Text style={styles.label}>Message To</Text>
            {role === 'customer' ?
                <SelectList
                    setSelected={(val) => setCustomerId(val)}
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