import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { useSelector } from "react-redux";
import { SignUpService } from '../services/UserAuthService';

export default function CustomerCreation({ navigation }) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const state = useSelector((state) => state);

    useEffect(() => {
        const result = state.authPage.auth_data.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
        setData(result);
    }, []);

    const [customerData, setCustomerData] = useState({
        email: "",
        password: "",
        parent_name: "",
        player_name: "",
        player_age: "",
        wristband_level: "",
        handed: "",
        num_buddy_books_read: "",
        jersey_size: "",
        class_photos: "",
        current_award: "",
        message: ""
    });

    const handleSignUp = async () => {
        try {
            const data = {
                email: customerData.email,
                password: customerData.password,
                roles: ['customer'],
                parent_name: customerData.parent_name,
                player_name: customerData.player_name,
                player_age: customerData.player_age,
                wristband_level: customerData.wristband_level,
                school: selected,
                coach: state.authPage.auth_data.coach_name,
                handed: customerData.handed,
                num_buddy_books_read: customerData.num_buddy_books_read,
                jersey_size: customerData.jersey_size,
                class_photos: customerData.class_photos,
                current_award: customerData.current_award,
                message: customerData.message
            };
            const result = await SignUpService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Customer Added Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("Coach Dashboard")
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Email is already in use!"
            );
        }
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, email: e })}
                    value={customerData.email}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, password: e })}
                    value={customerData.password}
                />
                <Text style={styles.label}>Parent Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, parent_name: e })}
                    value={customerData.parent_name}
                />
                <Text style={styles.label}>Player Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, player_name: e })}
                    value={customerData.player_name}
                />
                <Text style={styles.label}>Player Age</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, player_age: e })}
                    value={customerData.player_age}
                />
                <Text style={styles.label}>WristBand Level</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, wristband_level: e })}
                    value={customerData.wristband_level}
                />
                <Text style={styles.label}>Schools</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    onSelect={() => alert(selected)}
                    label="Selected Schools"
                />
                <Text style={styles.label}>Handed</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, handed: e })}
                    value={customerData.handed}
                />
                <Text style={styles.label}>Number of Buddy Books Read</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, num_buddy_books_read: e })}
                    value={customerData.num_buddy_books_read}
                />
                <Text style={styles.label}>Jersey Size</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, jersey_size: e })}
                    value={customerData.jersey_size}
                />
                <Text style={styles.label}>Class Photos</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, class_photos: e })}
                    value={customerData.class_photos}
                />
                <Text style={styles.label}>Current Award</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, current_award: e })}
                    value={customerData.current_award}
                />
                <Text style={styles.label}>Messages</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setCustomerData({ ...customerData, message: e })}
                    value={customerData.message}
                />
                <Button
                    title="Submit"
                    color="#000"
                    style={{ marginTop: 40, marginBottom: 40 }}
                    onPress={handleSignUp}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
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
    labeLink: {
        fontSize: 14,
        textAlign: 'center',
        color: "#000",
        padding: 10,
        cursor: 'pointer'
    }
});
